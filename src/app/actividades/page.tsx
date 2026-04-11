"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FallbackImage from "@/components/ui/FallbackImage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase"; // Importación fundamental

// --- TIPOS DE DATOS ---
interface Actividad {
  id: string;
  titulo: string;
  descripcion: string;
  fechaInicio: string;
  enlace: string;
  imagenUrl: string | null;
  esInterna: boolean;
}

// --- MENSAJES ALEATORIOS ---
const leyendasVacias = [
  "No hay actividades programadas por el momento. ¡Vuelve pronto para ver las novedades!",
  "Actualmente no tenemos eventos, pero anunciaremos nuevos muy pronto. ¡Mantente al tanto!",
  "No hay eventos en el calendario por ahora. ¡Estamos preparando las siguientes actividades!",
  "De momento no hay eventos programados. ¡Revisa esta sección próximamente!",
  "Aún no hay actividades agendadas. ¡Pronto publicaremos las siguientes!",
  "¡Calma! Aún no hay eventos, pero ya estamos trabajando en ello. ¡No te desconectes!",
  'Por ahora no hay nada agendado. ¡Estamos "cocinando" lo que sigue!',
  "¡Ahorita no hay eventos, pero espéralos! Pronto tendremos novedades.",
  "Aún no publicamos nuevas actividades. ¡Paciencia, que ya vienen!",
  "¡Tranquilo! Pronto llenaremos esta agenda. ¡Mantente atento!",
  "¡Estamos afinando motores para lo que viene! Mantente al pendiente de nuevos eventos.",
  "¡Pronto tendremos más acción! Estamos planeando las siguientes actividades.",
  "¡Nuevos retos y eventos se aproximan! Revisa esta sección pronto.",
  "¡La próxima gran actividad está en camino! No dejes de revisar.",
  "¡Estamos preparando todo para nuestros próximos eventos! Mantente al tanto.",
];

export default function ActividadesPage() {
  // Estados Reales de React
  const [leyendaVacia, setLeyendaVacia] = useState("");
  const [proximosEventos, setProximosEventos] = useState<Actividad[]>([]);
  const [eventosAnteriores, setEventosAnteriores] = useState<Actividad[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Efecto principal: Carga inicial de datos
  useEffect(() => {
    // 1. Asignar leyenda aleatoria en el cliente
    setLeyendaVacia(
      leyendasVacias[Math.floor(Math.random() * leyendasVacias.length)],
    );

    // 2. Consumir Supabase
    const cargarActividades = async () => {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("actividades")
        .select("*")
        .eq("es_interna", false) // Filtro maestro de seguridad
        .order("fecha_inicio", { ascending: false });

      if (!error && data) {
        // Mapeamos los datos de la base de datos a nuestra interfaz de TypeScript
        const mapeados: Actividad[] = data.map((item) => ({
          id: item.id,
          titulo: item.titulo,
          descripcion: item.descripcion || "",
          fechaInicio: item.fecha_inicio,
          enlace: item.enlace,
          imagenUrl: item.imagen_url,
          esInterna: item.es_interna,
        }));

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        // Separar y ordenar
        const futuros = mapeados
          .filter((act) => new Date(act.fechaInicio) >= hoy)
          .sort(
            (a, b) =>
              new Date(a.fechaInicio).getTime() -
              new Date(b.fechaInicio).getTime(),
          );

        const pasados = mapeados.filter(
          (act) => new Date(act.fechaInicio) < hoy,
        );

        setProximosEventos(futuros);
        setEventosAnteriores(pasados);
      } else {
        console.error("Error al cargar actividades:", error);
      }

      setIsLoading(false);
    };

    cargarActividades();
  }, []);

  // --- LÓGICA DE FECHAS ---
  const formatearFecha = (isoString: string) => {
    const fecha = new Date(isoString);
    return fecha.toLocaleDateString("es-MX", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "America/Mexico_City",
    });
  };

  const revisarHoy = (isoString: string) => {
    const fechaEvento = new Date(isoString).toLocaleDateString("es-MX", {
      timeZone: "America/Mexico_City",
    });
    const hoy = new Date().toLocaleDateString("es-MX", {
      timeZone: "America/Mexico_City",
    });
    return fechaEvento === hoy;
  };

  return (
    <div className="flex flex-col w-full">
      {/* HEADER DE SECCIÓN */}
      <section className="bg-white pt-32 pb-12 md:pt-40 md:pb-16 border-b border-neutral-100">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-6">
            Nuestras Actividades
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Disfruta de las diferentes actividades que traemos para la comunidad
            estudiantil del Campus de Ciencias Exactas e Ingenierías. Conoce
            aquí los próximos eventos o explora los que ya realizamos.
          </p>
        </div>
      </section>

      {/* PRÓXIMOS EVENTOS */}
      <section className="bg-slate-50 py-16 md:py-24 border-b border-neutral-100 min-h-[400px]">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
              Próximos Eventos
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-[#5f2167] to-[#98002e] mx-auto mt-4 rounded-full"></div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <span className="text-neutral-500 font-medium flex items-center">
                <span className="animate-spin text-2xl mr-3">⚙</span> Cargando
                agenda...
              </span>
            </div>
          ) : proximosEventos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proximosEventos.map((actividad) => (
                <Card
                  key={actividad.id}
                  className="group card-brand ring-0 flex flex-col h-full transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full bg-neutral-100 rounded-t-xl overflow-hidden">
                    <FallbackImage
                      src={actividad.imagenUrl || "/IMG/EVENTS/Default.jpg"}
                      alt={actividad.titulo}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {revisarHoy(actividad.fechaInicio) && (
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-[#5f2167] to-[#98002e] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse">
                        ¡Es hoy!
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-fluid-gradient">
                      {actividad.titulo}
                    </CardTitle>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-widest mt-1">
                      {formatearFecha(actividad.fechaInicio)}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-sm text-neutral-600 mb-6 flex-1 line-clamp-3">
                      {actividad.descripcion}
                    </CardDescription>
                    <Link
                      href={actividad.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex w-full h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md mt-auto cursor-pointer"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                      <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                        Ver detalles en vTools
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="max-w-2xl mx-auto text-center bg-white border border-neutral-200 rounded-2xl p-10 shadow-sm">
              <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="icon-calendar text-2xl text-neutral-400"></i>
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Agenda vacía, ¡por ahora!
              </h3>
              <p className="text-neutral-600 mb-8">{leyendaVacia}</p>
              <Link
                href="https://linktr.ee/RAS.UADY"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative inline-flex h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                <span className="relative z-10 px-8 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                  ¡Síguenos en redes!
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* EVENTOS ANTERIORES */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
              Eventos Anteriores
            </h2>
            <div className="h-1 w-16 bg-gradient-to-r from-[#5f2167] to-[#98002e] mx-auto mt-4 rounded-full"></div>
          </div>

          {!isLoading && eventosAnteriores.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {eventosAnteriores.map((actividad) => (
                <a
                  href={actividad.enlace}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={actividad.id}
                  className="block"
                >
                  <Card className="group card-brand ring-0 h-full transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                    <div className="relative h-48 w-full bg-neutral-100 rounded-t-xl overflow-hidden">
                      <FallbackImage
                        src={actividad.imagenUrl || "/IMG/EVENTS/Default.jpg"}
                        alt={actividad.titulo}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10"></div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-lg text-fluid-gradient leading-tight">
                        {actividad.titulo}
                      </CardTitle>
                      <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-2">
                        {formatearFecha(actividad.fechaInicio)}
                      </p>
                    </CardHeader>
                  </Card>
                </a>
              ))}
            </div>
          )}

          {!isLoading && eventosAnteriores.length === 0 && (
            <p className="text-center text-neutral-500">
              No hay registro de eventos anteriores por el momento.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
