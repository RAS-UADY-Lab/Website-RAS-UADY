"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { createBrowserClient } from "@supabase/ssr";
import toast, { Toaster } from "react-hot-toast";

// --- INTERFACES ---
interface ActividadAdmin {
  id: string;
  titulo: string;
  descripcion: string;
  enlace: string;
  fecha_inicio: string;
  origen: "vtools" | "manual";
  es_interna: boolean;
  oculto: boolean;
  protegido: boolean;
  destacada: boolean;
}

interface DirectivoAdmin {
  id: string;
  nombre: string;
  puesto: string;
  descripcion: string;
  periodo: string;
  imagen_url: string | null;
  orden: number;
  activo: boolean;
}

interface ProyectoAdmin {
  id: string;
  titulo: string;
  descripcion: string;
  tecnologias: string;
  enlace: string;
  imagen_url: string | null;
  oculto: boolean;
}

interface PatrocinadorAdmin {
  id: string;
  nombre: string;
  nivel: string;
  enlace: string;
  logo_url: string | null;
  activo: boolean;
}

export default function AdminDashboard() {
  // --- ESTADOS GLOBALES ---
  const [mainTab, setMainTab] = useState<
    "actividades" | "directivos" | "proyectos" | "patrocinadores"
  >("actividades");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- ESTADOS DE DATOS ---
  const [actividades, setActividades] = useState<ActividadAdmin[]>([]);
  const [directivos, setDirectivos] = useState<DirectivoAdmin[]>([]);
  const [proyectos, setProyectos] = useState<ProyectoAdmin[]>([]);
  const [patrocinadores, setPatrocinadores] = useState<PatrocinadorAdmin[]>([]);

  const [isSyncing, setIsSyncing] = useState(false);
  const [actTabInfo, setActTabInfo] = useState<"activas" | "papelera">(
    "activas",
  );
  const [proyTabInfo, setProyTabInfo] = useState<"activos" | "papelera">(
    "activos",
  );

  // --- ESTADOS DE MODALES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<string>("crear_act");
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Formularios
  const [actFormData, setActFormData] = useState({
    titulo: "",
    fecha: "",
    enlace: "",
    descripcion: "",
  });
  const [dirFormData, setDirFormData] = useState({
    nombre: "",
    puesto: "",
    descripcion: "",
    periodo: "2025-2026",
    orden: 0,
    activo: true,
  });
  const [proyFormData, setProyFormData] = useState({
    titulo: "",
    descripcion: "",
    tecnologias: "",
    enlace: "",
  });
  const [patFormData, setPatFormData] = useState({
    nombre: "",
    nivel: "Aliado",
    enlace: "",
    activo: true,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  // --- CARGA DE DATOS ---
  const fetchData = async () => {
    setIsLoading(true);
    const [resActs, resDirs, resProys, resPats] = await Promise.all([
      supabase
        .from("actividades")
        .select("*")
        .order("fecha_inicio", { ascending: false }),
      supabase
        .from("directivos")
        .select("*")
        .order("orden", { ascending: true }),
      supabase
        .from("proyectos")
        .select("*")
        .order("creado_en", { ascending: false }),
      supabase
        .from("patrocinadores")
        .select("*")
        .order("creado_en", { ascending: false }),
    ]);

    if (resActs.error) toast.error("Error al cargar actividades.");
    else setActividades(resActs.data || []);
    if (resDirs.error) toast.error("Error al cargar directivos.");
    else setDirectivos(resDirs.data || []);
    if (resProys.error) toast.error("Error al cargar proyectos.");
    else setProyectos(resProys.data || []);
    if (resPats.error) toast.error("Error al cargar patrocinadores.");
    else setPatrocinadores(resPats.data || []);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  // --- LÓGICA DE UTILIDAD (Imágenes y Sincronización) ---
  const handleImageSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return setImageFile(null);
    if (!file.type.startsWith("image/")) {
      toast.error("Formato inválido. Selecciona una imagen (JPG, PNG, WebP).");
      e.target.value = "";
      return setImageFile(null);
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("La imagen es muy pesada. El límite es 2MB.");
      e.target.value = "";
      return setImageFile(null);
    }
    setImageFile(file);
  };

  const subirImagen = async (file: File) => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const { error } = await supabase.storage
      .from("imagenes")
      .upload(fileName, file);
    if (error) throw error;
    return supabase.storage.from("imagenes").getPublicUrl(fileName).data
      .publicUrl;
  };

  const handleSyncVTools = async () => {
    setIsSyncing(true);
    const syncPromise = fetch("/api/sync", { method: "POST" }).then(
      async (res) => {
        const data = await res.json();
        if (!res.ok || !data.exito)
          throw new Error(data.mensaje || "Error en el servidor");
        return data;
      },
    );
    toast.promise(syncPromise, {
      loading: "Descargando eventos...",
      success: (data) => {
        fetchData();
        return data.mensaje;
      },
      error: (err) => `Error: ${err.message}`,
    });
    syncPromise.finally(() => setIsSyncing(false));
  };

  // --- ACCIONES DIRECTAS EN TABLAS ---
  const toggleVisibility = async (
    tabla: string,
    id: string,
    ocultar: boolean,
  ) => {
    const { error } = await supabase
      .from(tabla)
      .update({ oculto: ocultar })
      .eq("id", id);
    if (error) toast.error(`Error al actualizar ${tabla}.`);
    else {
      toast.success(ocultar ? "Movido a la papelera" : "Restaurado con éxito");
      fetchData();
      setIsModalOpen(false);
    }
  };

  const toggleDestacada = async (id: string, estadoActual: boolean) => {
    const { error } = await supabase
      .from("actividades")
      .update({ destacada: !estadoActual })
      .eq("id", id);
    if (error) toast.error("Error al destacar evento.");
    else {
      toast.success(
        !estadoActual
          ? "Actividad marcada como destacada"
          : "Actividad ya no es destacada",
      );
      fetchData();
    }
  };

  const deleteRecord = async (tabla: string, id: string) => {
    setIsSubmitting(true);
    const { error } = await supabase.from(tabla).delete().eq("id", id);
    setIsSubmitting(false);
    if (error) toast.error(`Error al eliminar registro.`);
    else {
      toast.success("Registro eliminado permanentemente");
      fetchData();
      setIsModalOpen(false);
    }
  };

  // --- MANEJO DE MODALES Y FORMULARIOS ---
  const openModal = (mode: string, item: any = null) => {
    setModalMode(mode);
    setSelectedItem(item);
    setImageFile(null);
    if (mode.includes("_act"))
      setActFormData({
        titulo: item?.titulo || "",
        fecha: item ? item.fecha_inicio.substring(0, 16) : "",
        enlace: item?.enlace || "",
        descripcion: item?.descripcion || "",
      });
    if (mode.includes("_dir"))
      setDirFormData({
        nombre: item?.nombre || "",
        puesto: item?.puesto || "",
        descripcion: item?.descripcion || "",
        periodo: item?.periodo || "2025-2026",
        orden: item?.orden || 0,
        activo: item?.activo !== false,
      });
    if (mode.includes("_proy"))
      setProyFormData({
        titulo: item?.titulo || "",
        descripcion: item?.descripcion || "",
        tecnologias: item?.tecnologias || "",
        enlace: item?.enlace || "",
      });
    if (mode.includes("_pat"))
      setPatFormData({
        nombre: item?.nombre || "",
        nivel: item?.nivel || "Aliado",
        enlace: item?.enlace || "",
        activo: item?.activo !== false,
      });
    setIsModalOpen(true);
  };

  const handleDynamicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let imageUrl = undefined;
      if (imageFile) imageUrl = await subirImagen(imageFile);

      // ACTIVIDADES
      if (modalMode === "crear_act") {
        const { error } = await supabase.from("actividades").insert([
          {
            titulo: actFormData.titulo,
            descripcion: actFormData.descripcion,
            fecha_inicio: new Date(actFormData.fecha).toISOString(),
            enlace: actFormData.enlace,
            imagen_url: imageUrl,
            origen: "manual",
            es_interna: false,
          },
        ]);
        if (error) throw error;
        toast.success("Actividad creada");
      } else if (modalMode === "editar_act") {
        const updates: any = {
          titulo: actFormData.titulo,
          descripcion: actFormData.descripcion,
          fecha_inicio: new Date(actFormData.fecha).toISOString(),
          enlace: actFormData.enlace,
          protegido: true,
        };
        if (imageUrl) updates.imagen_url = imageUrl;
        const { error } = await supabase
          .from("actividades")
          .update(updates)
          .eq("id", selectedItem.id);
        if (error) throw error;
        toast.success("Actividad actualizada");
      }

      // DIRECTIVOS
      else if (modalMode === "crear_dir") {
        const { error } = await supabase.from("directivos").insert([
          {
            nombre: dirFormData.nombre,
            puesto: dirFormData.puesto,
            descripcion: dirFormData.descripcion,
            periodo: dirFormData.periodo,
            orden: dirFormData.orden,
            activo: dirFormData.activo,
            imagen_url: imageUrl,
          },
        ]);
        if (error) throw error;
        toast.success("Miembro añadido");
      } else if (modalMode === "editar_dir") {
        const updates: any = {
          nombre: dirFormData.nombre,
          puesto: dirFormData.puesto,
          descripcion: dirFormData.descripcion,
          periodo: dirFormData.periodo,
          orden: dirFormData.orden,
          activo: dirFormData.activo,
        };
        if (imageUrl) updates.imagen_url = imageUrl;
        const { error } = await supabase
          .from("directivos")
          .update(updates)
          .eq("id", selectedItem.id);
        if (error) throw error;
        toast.success("Miembro actualizado");
      }

      // PROYECTOS
      else if (modalMode === "crear_proy") {
        const { error } = await supabase.from("proyectos").insert([
          {
            titulo: proyFormData.titulo,
            descripcion: proyFormData.descripcion,
            tecnologias: proyFormData.tecnologias,
            enlace: proyFormData.enlace,
            imagen_url: imageUrl,
          },
        ]);
        if (error) throw error;
        toast.success("Proyecto añadido");
      } else if (modalMode === "editar_proy") {
        const updates: any = {
          titulo: proyFormData.titulo,
          descripcion: proyFormData.descripcion,
          tecnologias: proyFormData.tecnologias,
          enlace: proyFormData.enlace,
        };
        if (imageUrl) updates.imagen_url = imageUrl;
        const { error } = await supabase
          .from("proyectos")
          .update(updates)
          .eq("id", selectedItem.id);
        if (error) throw error;
        toast.success("Proyecto actualizado");
      }

      // PATROCINADORES
      else if (modalMode === "crear_pat") {
        const { error } = await supabase.from("patrocinadores").insert([
          {
            nombre: patFormData.nombre,
            nivel: patFormData.nivel,
            enlace: patFormData.enlace,
            activo: patFormData.activo,
            logo_url: imageUrl,
          },
        ]);
        if (error) throw error;
        toast.success("Patrocinador añadido");
      } else if (modalMode === "editar_pat") {
        const updates: any = {
          nombre: patFormData.nombre,
          nivel: patFormData.nivel,
          enlace: patFormData.enlace,
          activo: patFormData.activo,
        };
        if (imageUrl) updates.logo_url = imageUrl;
        const { error } = await supabase
          .from("patrocinadores")
          .update(updates)
          .eq("id", selectedItem.id);
        if (error) throw error;
        toast.success("Patrocinador actualizado");
      }

      fetchData();
      setIsModalOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-slate-50">
      <Toaster position="bottom-right" />

      {/* HEADER DE ADMINISTRADOR */}
      <section className="bg-white pt-24 pb-6 md:pt-40 md:pb-6 border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6 md:mb-8">
            <div className="flex items-center gap-4 md:gap-5">
              <div className="flex-shrink-0 bg-slate-50 p-2 rounded-xl border border-neutral-200 shadow-sm">
                <Image
                  src="/IMG/favicon.svg"
                  alt="Favicon RAS"
                  width={40}
                  height={40}
                  className="md:w-12 md:h-12"
                />
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  Panel de Control
                </h1>
                <p className="text-neutral-500 text-xs md:text-sm mt-1 font-medium">
                  Sistema de Gestión de Contenidos
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm font-bold text-red-600 hover:text-red-700 transition-colors flex items-center gap-2 cursor-pointer w-fit"
            >
              Cerrar Sesión
            </button>
          </div>

          {/* Navegación de Módulos (Scrollable en Móvil) */}
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] gap-2 border-b border-neutral-200 w-full">
            {[
              { id: "actividades", label: "Actividades" },
              { id: "directivos", label: "Directivos (Nosotros)" },
              { id: "proyectos", label: "Proyectos" },
              { id: "patrocinadores", label: "Patrocinadores" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setMainTab(tab.id as any)}
                className={`whitespace-nowrap px-4 py-3 md:px-5 md:py-2.5 text-sm font-bold transition-colors cursor-pointer border-b-2 ${
                  mainTab === tab.id
                    ? "border-[#98002e] text-[#98002e]"
                    : "border-transparent text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 py-6 md:py-8 container mx-auto max-w-7xl px-4 md:px-8">
        {/* --- MÓDULO: ACTIVIDADES --- */}
        {mainTab === "actividades" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
              {/* Sub-tabs móviles responsivas */}
              <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full lg:w-auto bg-white rounded-lg border border-neutral-200 p-1">
                <button
                  onClick={() => setActTabInfo("activas")}
                  className={`flex-1 min-w-max px-4 py-2 text-sm font-bold rounded-md transition-all cursor-pointer ${
                    actTabInfo === "activas"
                      ? "bg-slate-100 text-[#98002e] shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Eventos Activos
                </button>
                <button
                  onClick={() => setActTabInfo("papelera")}
                  className={`flex-1 min-w-max px-4 py-2 text-sm font-bold rounded-md transition-all cursor-pointer ${
                    actTabInfo === "papelera"
                      ? "bg-slate-100 text-[#98002e] shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Papelera
                </button>
              </div>

              {/* Botones de acción 100% ancho en móvil */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={() => openModal("crear_act")}
                  className="flex-1 sm:flex-none h-10 px-4 text-sm font-medium border rounded-md hover:shadow-md transition-all cursor-pointer bg-white"
                >
                  + Añadir Manual
                </button>
                <button
                  onClick={handleSyncVTools}
                  disabled={isSyncing}
                  className={`flex-1 sm:flex-none h-10 px-4 text-sm font-medium text-white shadow-md rounded-md transition-all cursor-pointer ${
                    isSyncing
                      ? "bg-neutral-400"
                      : "bg-gradient-to-r from-[#5f2167] to-[#98002e] hover:opacity-90"
                  }`}
                >
                  {isSyncing ? "Sincronizando..." : "Sincronizar vTools"}
                </button>
              </div>
            </div>

            <Card className="card-brand ring-0 border border-neutral-200 bg-white min-h-[400px]">
              <CardContent className="p-0">
                {/* Scroll horizontal forzado en móvil */}
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left text-neutral-600">
                    <thead className="text-xs text-neutral-500 uppercase bg-slate-50 border-b border-neutral-200">
                      <tr>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          Actividad
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          Fecha
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          Estado
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-right">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {isLoading ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-6 py-12 text-center text-neutral-400"
                          >
                            Cargando...
                          </td>
                        </tr>
                      ) : actividades.filter((a) =>
                          actTabInfo === "activas" ? !a.oculto : a.oculto,
                        ).length === 0 ? (
                        <tr>
                          <td
                            colSpan={4}
                            className="px-6 py-12 text-center text-neutral-400"
                          >
                            No hay eventos en esta sección.
                          </td>
                        </tr>
                      ) : (
                        actividades
                          .filter((a) =>
                            actTabInfo === "activas" ? !a.oculto : a.oculto,
                          )
                          .map((act) => (
                            <tr key={act.id} className="hover:bg-slate-50">
                              <td className="px-4 md:px-6 py-3 md:py-4 font-medium text-neutral-900 whitespace-nowrap">
                                {act.titulo.length > 35
                                  ? act.titulo.substring(0, 35) + "..."
                                  : act.titulo}
                                {act.destacada && (
                                  <span className="ml-2 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                                    ★ Destacada
                                  </span>
                                )}
                                {act.protegido && (
                                  <span className="ml-2 text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                    Protegido
                                  </span>
                                )}
                              </td>
                              <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                                {new Date(act.fecha_inicio).toLocaleDateString(
                                  "es-MX",
                                )}
                              </td>
                              <td className="px-4 md:px-6 py-3 md:py-4 uppercase text-[11px] font-bold whitespace-nowrap">
                                {act.origen}
                              </td>
                              <td className="px-4 md:px-6 py-3 md:py-4 text-right space-x-3 whitespace-nowrap">
                                {actTabInfo === "activas" ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        toggleDestacada(act.id, act.destacada)
                                      }
                                      className={`text-[11px] font-bold px-2 py-1 rounded cursor-pointer transition-colors ${
                                        act.destacada
                                          ? "bg-amber-100 text-amber-700"
                                          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                                      }`}
                                    >
                                      {act.destacada
                                        ? "Quitar Destacada"
                                        : "Destacar"}
                                    </button>
                                    <button
                                      onClick={() =>
                                        openModal("editar_act", act)
                                      }
                                      className="text-neutral-400 hover:text-[#98002e] font-medium cursor-pointer"
                                    >
                                      Editar
                                    </button>
                                    <button
                                      onClick={() =>
                                        openModal("eliminar_act", {
                                          ...act,
                                          tabla: "actividades",
                                        })
                                      }
                                      className="text-neutral-400 hover:text-red-600 font-medium cursor-pointer"
                                    >
                                      Ocultar
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() =>
                                      toggleVisibility(
                                        "actividades",
                                        act.id,
                                        false,
                                      )
                                    }
                                    className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                                  >
                                    Restaurar
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* --- MÓDULO: MESA DIRECTIVA --- */}
        {mainTab === "directivos" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-neutral-800">
                Miembros Registrados
              </h2>
              <button
                onClick={() => openModal("crear_dir")}
                className="w-full sm:w-auto h-10 px-4 bg-gradient-to-r from-[#5f2167] to-[#98002e] text-white text-sm font-medium rounded-md shadow-md hover:opacity-90 cursor-pointer"
              >
                + Añadir Miembro
              </button>
            </div>
            <Card className="card-brand ring-0 border border-neutral-200 bg-white min-h-[400px]">
              <CardContent className="p-0">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left text-neutral-600">
                    <thead className="text-xs text-neutral-500 uppercase bg-slate-50 border-b border-neutral-200">
                      <tr>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          Orden
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap min-w-[250px]">
                          Nombre y Puesto
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          Periodo
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          Estado
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-right">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {isLoading ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center">
                            Cargando directivos...
                          </td>
                        </tr>
                      ) : directivos.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="px-6 py-12 text-center">
                            No hay directivos.
                          </td>
                        </tr>
                      ) : (
                        directivos.map((dir) => (
                          <tr key={dir.id} className="hover:bg-slate-50">
                            <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-neutral-400 whitespace-nowrap">
                              {dir.orden}
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden flex-shrink-0">
                                  {dir.imagen_url ? (
                                    <img
                                      src={dir.imagen_url}
                                      alt={dir.nombre}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-neutral-400 font-bold">
                                      {dir.nombre.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className="font-bold text-neutral-900">
                                    {dir.nombre}
                                  </div>
                                  <div className="text-xs text-neutral-500">
                                    {dir.puesto}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 font-medium whitespace-nowrap">
                              {dir.periodo}
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                                  dir.activo
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-neutral-100 text-neutral-500"
                                }`}
                              >
                                {dir.activo ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 text-right space-x-3 whitespace-nowrap">
                              <button
                                onClick={() => openModal("editar_dir", dir)}
                                className="text-neutral-400 hover:text-[#98002e] font-medium cursor-pointer"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() =>
                                  openModal("eliminar_dir", {
                                    ...dir,
                                    tabla: "directivos",
                                  })
                                }
                                className="text-neutral-400 hover:text-red-600 font-medium cursor-pointer"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* --- MÓDULO: PROYECTOS --- */}
        {mainTab === "proyectos" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-6">
              <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full lg:w-auto bg-white rounded-lg border border-neutral-200 p-1">
                <button
                  onClick={() => setProyTabInfo("activos")}
                  className={`flex-1 min-w-max px-4 py-2 text-sm font-bold rounded-md transition-all cursor-pointer ${
                    proyTabInfo === "activos"
                      ? "bg-slate-100 text-[#98002e] shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Proyectos Activos
                </button>
                <button
                  onClick={() => setProyTabInfo("papelera")}
                  className={`flex-1 min-w-max px-4 py-2 text-sm font-bold rounded-md transition-all cursor-pointer ${
                    proyTabInfo === "papelera"
                      ? "bg-slate-100 text-[#98002e] shadow-sm"
                      : "text-neutral-500 hover:text-neutral-700"
                  }`}
                >
                  Papelera
                </button>
              </div>
              <button
                onClick={() => openModal("crear_proy")}
                className="w-full lg:w-auto h-10 px-4 bg-gradient-to-r from-[#5f2167] to-[#98002e] text-white text-sm font-medium rounded-md shadow-md cursor-pointer"
              >
                + Añadir Proyecto
              </button>
            </div>
            <Card className="card-brand ring-0 border border-neutral-200 bg-white min-h-[400px]">
              <CardContent className="p-0">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left text-neutral-600">
                    <thead className="text-xs text-neutral-500 uppercase bg-slate-50 border-b border-neutral-200">
                      <tr>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap min-w-[200px]">
                          Título del Proyecto
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap min-w-[200px]">
                          Tecnologías
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 text-right whitespace-nowrap">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {isLoading ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center">
                            Cargando proyectos...
                          </td>
                        </tr>
                      ) : proyectos.filter((p) =>
                          proyTabInfo === "activos" ? !p.oculto : p.oculto,
                        ).length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center">
                            No hay proyectos.
                          </td>
                        </tr>
                      ) : (
                        proyectos
                          .filter((p) =>
                            proyTabInfo === "activos" ? !p.oculto : p.oculto,
                          )
                          .map((proy) => (
                            <tr key={proy.id} className="hover:bg-slate-50">
                              <td className="px-4 md:px-6 py-3 md:py-4 font-medium text-neutral-900 whitespace-nowrap">
                                {proy.titulo}
                              </td>
                              <td className="px-4 md:px-6 py-3 md:py-4 text-xs text-neutral-500 whitespace-nowrap">
                                {proy.tecnologias}
                              </td>
                              <td className="px-4 md:px-6 py-3 md:py-4 text-right space-x-3 whitespace-nowrap">
                                {proyTabInfo === "activos" ? (
                                  <>
                                    <button
                                      onClick={() =>
                                        openModal("editar_proy", proy)
                                      }
                                      className="text-neutral-400 hover:text-[#98002e] font-medium cursor-pointer"
                                    >
                                      Editar
                                    </button>
                                    <button
                                      onClick={() =>
                                        openModal("eliminar_act", {
                                          ...proy,
                                          tabla: "proyectos",
                                        })
                                      }
                                      className="text-neutral-400 hover:text-red-600 font-medium cursor-pointer"
                                    >
                                      Ocultar
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={() =>
                                      toggleVisibility(
                                        "proyectos",
                                        proy.id,
                                        false,
                                      )
                                    }
                                    className="text-emerald-600 hover:text-emerald-700 font-medium cursor-pointer"
                                  >
                                    Restaurar
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* --- MÓDULO: PATROCINADORES --- */}
        {mainTab === "patrocinadores" && (
          <div className="animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-neutral-800">
                Aliados y Patrocinadores
              </h2>
              <button
                onClick={() => openModal("crear_pat")}
                className="w-full sm:w-auto h-10 px-4 bg-gradient-to-r from-[#5f2167] to-[#98002e] text-white text-sm font-medium rounded-md shadow-md cursor-pointer"
              >
                + Añadir Patrocinador
              </button>
            </div>
            <Card className="card-brand ring-0 border border-neutral-200 bg-white min-h-[400px]">
              <CardContent className="p-0">
                <div className="overflow-x-auto w-full">
                  <table className="w-full text-sm text-left text-neutral-600">
                    <thead className="text-xs text-neutral-500 uppercase bg-slate-50 border-b border-neutral-200">
                      <tr>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap min-w-[250px]">
                          Patrocinador
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          Nivel
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                          Estado
                        </th>
                        <th className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap text-right">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {isLoading ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            Cargando aliados...
                          </td>
                        </tr>
                      ) : patrocinadores.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="px-6 py-12 text-center">
                            No hay patrocinadores registrados.
                          </td>
                        </tr>
                      ) : (
                        patrocinadores.map((pat) => (
                          <tr key={pat.id} className="hover:bg-slate-50">
                            <td className="px-4 md:px-6 py-3 md:py-4 font-bold text-neutral-900 flex items-center gap-3 whitespace-nowrap">
                              {pat.logo_url && (
                                <img
                                  src={pat.logo_url}
                                  alt="logo"
                                  className="h-8 w-auto rounded object-contain bg-white border p-1"
                                />
                              )}
                              {pat.nombre}
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 font-medium whitespace-nowrap">
                              {pat.nivel}
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                                  pat.activo
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "bg-neutral-100 text-neutral-500"
                                }`}
                              >
                                {pat.activo ? "Activo" : "Inactivo"}
                              </span>
                            </td>
                            <td className="px-4 md:px-6 py-3 md:py-4 text-right space-x-3 whitespace-nowrap">
                              <button
                                onClick={() => openModal("editar_pat", pat)}
                                className="text-neutral-400 hover:text-[#98002e] font-medium cursor-pointer"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() =>
                                  openModal("eliminar_dir", {
                                    ...pat,
                                    tabla: "patrocinadores",
                                  })
                                }
                                className="text-neutral-400 hover:text-red-600 font-medium cursor-pointer"
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* --- SUPER MODAL DE GESTIÓN --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Soft Delete (Ocultar) - Reutilizado para Actividades y Proyectos */}
            {modalMode === "eliminar_act" && (
              <div className="text-center">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  ¿Ocultar elemento?
                </h3>
                <p className="text-sm text-neutral-500 mb-6">
                  Desaparecerá del sitio público, pero podrás restaurarlo desde
                  la papelera.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-md cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() =>
                      selectedItem &&
                      toggleVisibility(
                        selectedItem.tabla,
                        selectedItem.id,
                        true,
                      )
                    }
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md cursor-pointer"
                  >
                    Ocultar
                  </button>
                </div>
              </div>
            )}

            {/* Hard Delete (Eliminar) - Reutilizado para Directivos y Patrocinadores */}
            {modalMode === "eliminar_dir" && (
              <div className="text-center">
                <h3 className="text-xl font-bold text-neutral-900 mb-2">
                  ¿Eliminar permanentemente?
                </h3>
                <p className="text-sm text-neutral-500 mb-6">
                  Esta acción no se puede deshacer. Considera marcarlo como
                  inactivo en su lugar.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-md cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() =>
                      selectedItem &&
                      deleteRecord(selectedItem.tabla, selectedItem.id)
                    }
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            )}

            {/* Formulario Maestro */}
            {(modalMode.includes("crear_") ||
              modalMode.includes("editar_")) && (
              <form onSubmit={handleDynamicSubmit} className="space-y-4">
                <h3 className="text-xl font-bold bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  {modalMode.includes("crear_")
                    ? "Añadir Nuevo"
                    : "Editar Registro"}
                </h3>

                {/* Campos Actividades */}
                {modalMode.includes("_act") && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Título
                      </label>
                      <input
                        required
                        type="text"
                        value={actFormData.titulo}
                        onChange={(e) =>
                          setActFormData({
                            ...actFormData,
                            titulo: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Fecha y Hora
                      </label>
                      <input
                        required
                        type="datetime-local"
                        value={actFormData.fecha}
                        onChange={(e) =>
                          setActFormData({
                            ...actFormData,
                            fecha: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Enlace
                      </label>
                      <input
                        required
                        type="url"
                        value={actFormData.enlace}
                        onChange={(e) =>
                          setActFormData({
                            ...actFormData,
                            enlace: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Descripción Breve
                      </label>
                      <textarea
                        required
                        value={actFormData.descripcion}
                        onChange={(e) =>
                          setActFormData({
                            ...actFormData,
                            descripcion: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-md h-20 resize-none text-sm"
                      />
                    </div>
                  </>
                )}

                {/* Campos Directivos */}
                {modalMode.includes("_dir") && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Nombre Completo
                      </label>
                      <input
                        required
                        type="text"
                        value={dirFormData.nombre}
                        onChange={(e) =>
                          setDirFormData({
                            ...dirFormData,
                            nombre: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Puesto
                        </label>
                        <input
                          required
                          type="text"
                          value={dirFormData.puesto}
                          onChange={(e) =>
                            setDirFormData({
                              ...dirFormData,
                              puesto: e.target.value,
                            })
                          }
                          className="w-full h-10 px-3 border rounded-md text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Generación / Periodo
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="Ej. 2025-2026"
                          value={dirFormData.periodo}
                          onChange={(e) =>
                            setDirFormData({
                              ...dirFormData,
                              periodo: e.target.value,
                            })
                          }
                          className="w-full h-10 px-3 border rounded-md text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Descripción / Biografía
                      </label>
                      <textarea
                        required
                        value={dirFormData.descripcion}
                        onChange={(e) =>
                          setDirFormData({
                            ...dirFormData,
                            descripcion: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-md h-20 resize-none text-sm"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Orden (1, 2, 3...)
                        </label>
                        <input
                          required
                          type="number"
                          value={dirFormData.orden}
                          onChange={(e) =>
                            setDirFormData({
                              ...dirFormData,
                              orden: parseInt(e.target.value),
                            })
                          }
                          className="w-full h-10 px-3 border rounded-md text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Estado
                        </label>
                        <select
                          value={dirFormData.activo ? "true" : "false"}
                          onChange={(e) =>
                            setDirFormData({
                              ...dirFormData,
                              activo: e.target.value === "true",
                            })
                          }
                          className="w-full h-10 px-3 border rounded-md text-sm"
                        >
                          <option value="true">Activo</option>
                          <option value="false">Inactivo</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Campos Proyectos */}
                {modalMode.includes("_proy") && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Título del Proyecto
                      </label>
                      <input
                        required
                        type="text"
                        value={proyFormData.titulo}
                        onChange={(e) =>
                          setProyFormData({
                            ...proyFormData,
                            titulo: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Tecnologías (Ej: React, ESP32, Python)
                      </label>
                      <input
                        type="text"
                        value={proyFormData.tecnologias}
                        onChange={(e) =>
                          setProyFormData({
                            ...proyFormData,
                            tecnologias: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Enlace (GitHub, Web o Drive)
                      </label>
                      <input
                        type="url"
                        value={proyFormData.enlace}
                        onChange={(e) =>
                          setProyFormData({
                            ...proyFormData,
                            enlace: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Descripción Técnica
                      </label>
                      <textarea
                        required
                        value={proyFormData.descripcion}
                        onChange={(e) =>
                          setProyFormData({
                            ...proyFormData,
                            descripcion: e.target.value,
                          })
                        }
                        className="w-full p-3 border rounded-md h-20 resize-none text-sm"
                      />
                    </div>
                  </>
                )}

                {/* Campos Patrocinadores */}
                {modalMode.includes("_pat") && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Nombre de la Entidad / Patrocinador
                      </label>
                      <input
                        required
                        type="text"
                        value={patFormData.nombre}
                        onChange={(e) =>
                          setPatFormData({
                            ...patFormData,
                            nombre: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">
                        Enlace a su sitio web
                      </label>
                      <input
                        type="url"
                        value={patFormData.enlace}
                        onChange={(e) =>
                          setPatFormData({
                            ...patFormData,
                            enlace: e.target.value,
                          })
                        }
                        className="w-full h-10 px-3 border rounded-md text-sm"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Nivel de Alianza
                        </label>
                        <select
                          value={patFormData.nivel}
                          onChange={(e) =>
                            setPatFormData({
                              ...patFormData,
                              nivel: e.target.value,
                            })
                          }
                          className="w-full h-10 px-3 border rounded-md text-sm"
                        >
                          <option value="Oro">Patrocinador Oro</option>
                          <option value="Plata">Patrocinador Plata</option>
                          <option value="Bronce">Patrocinador Bronce</option>
                          <option value="Aliado">
                            Aliado Académico / Institucional
                          </option>
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs font-bold text-neutral-700 mb-1">
                          Visibilidad
                        </label>
                        <select
                          value={patFormData.activo ? "true" : "false"}
                          onChange={(e) =>
                            setPatFormData({
                              ...patFormData,
                              activo: e.target.value === "true",
                            })
                          }
                          className="w-full h-10 px-3 border rounded-md text-sm"
                        >
                          <option value="true">Activo</option>
                          <option value="false">Oculto</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}

                {/* Upload Universal */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    {modalMode.includes("pat") ? "Logo" : "Imagen"}{" "}
                    {modalMode.includes("editar_") && "(Opcional)"}
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleImageSelection}
                    className="w-full text-xs"
                  />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-neutral-600 bg-neutral-100 rounded-md cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-[#5f2167] to-[#98002e] rounded-md cursor-pointer"
                  >
                    {isSubmitting ? "Guardando..." : "Guardar"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
