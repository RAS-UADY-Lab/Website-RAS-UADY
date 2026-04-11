"use client";

import { useState, useEffect } from "react";
import FallbackImage from "@/components/ui/FallbackImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createBrowserClient } from "@supabase/ssr";

interface Directivo {
  id: string;
  nombre: string;
  puesto: string;
  descripcion: string;
  periodo: string;
  imagen_url: string | null;
  orden: number;
}

export default function NosotrosPage() {
  const [directivos, setDirectivos] = useState<Directivo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetchDirectivos = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("directivos")
        .select("*")
        .eq("activo", true)
        .order("orden", { ascending: true });

      if (!error && data) {
        setDirectivos(data);
      }
      setIsLoading(false);
    };

    fetchDirectivos();
  }, [supabase]);

  // Lógica para separar la generación actual del histórico
  const periodosUnicos = Array.from(new Set(directivos.map((d) => d.periodo)))
    .sort()
    .reverse();
  const periodoActual = periodosUnicos.length > 0 ? periodosUnicos[0] : "";
  const mesaActual = directivos.filter((d) => d.periodo === periodoActual);
  const mesasAnteriores = periodosUnicos.slice(1).map((periodo) => ({
    periodo,
    miembros: directivos.filter((d) => d.periodo === periodo),
  }));

  return (
    <div className="flex flex-col w-full">
      {/* HEADER DE SECCIÓN */}
      <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-24 border-b border-neutral-100">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-6">
            Conoce al capítulo estudiantil IEEE - RAS
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed">
            El capítulo está formado por estudiantes de la Facultad de
            Ingeniería de la Universidad Autónoma de Yucatán y sus actividades
            están destinadas a toda la comunidad estudiantil del Campus de
            Ciencias Exactas e Ingenierías.
          </p>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="bg-slate-50 py-20 border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1 bg-white p-2">
              <CardHeader>
                <CardTitle className="text-2xl text-fluid-gradient">
                  Misión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="pb-8 text-neutral-600 leading-relaxed">
                  Impulsar el desarrollo académico, técnico y humano de los
                  estudiantes de la Facultad de Ingeniería de la UADY, mediante
                  actividades formativas, colaborativas y de divulgación en el
                  área de robótica y automatización, fomentando el liderazgo, la
                  innovación y la vinculación con la comunidad global de IEEE -
                  RAS.
                </p>
              </CardContent>
            </Card>

            <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1 bg-white p-2">
              <CardHeader>
                <CardTitle className="text-2xl text-fluid-gradient">
                  Visión
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="pb-8 text-neutral-600 leading-relaxed">
                  Ser un capítulo estudiantil referente en México y
                  Latinoamérica por su compromiso con la excelencia, la
                  formación integral de sus miembros y la promoción de la
                  tecnología como motor de cambio, conectando a estudiantes con
                  oportunidades reales de impacto en el ámbito académico,
                  profesional y social.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* MESA DIRECTIVA ACTUAL */}
      <section className="bg-white py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
              Mesa Directiva {periodoActual ? `(${periodoActual})` : ""}
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#5f2167] to-[#98002e] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full py-20 text-center text-neutral-500 font-medium">
                Cargando mesa directiva...
              </div>
            ) : mesaActual.length === 0 ? (
              <div className="col-span-full py-20 text-center text-neutral-500">
                Aún no hay directivos registrados en el sistema.
              </div>
            ) : (
              mesaActual.map((dir) => (
                <Card
                  key={dir.id}
                  className="group card-brand ring-0 flex flex-col h-full transition-all duration-300 hover:shadow-md hover:shadow-neutral-900/10 hover:-translate-y-1 cursor-default"
                >
                  <div className="relative h-72 w-full bg-neutral-100 rounded-t-xl overflow-hidden">
                    <FallbackImage
                      src={dir.imagen_url || "/IMG/MesaDirectiva/Default.jpg"}
                      alt={`Fotografía de ${dir.nombre}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-fluid-gradient">
                      {dir.nombre}
                    </CardTitle>
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mt-1">
                      {dir.puesto}
                    </p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <CardDescription className="text-sm text-neutral-600 leading-relaxed">
                      {dir.descripcion ||
                        "Miembro activo de la mesa directiva del capítulo técnico."}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* HISTÓRICO DE GENERACIONES */}
      {!isLoading && mesasAnteriores.length > 0 && (
        <section className="bg-slate-50 py-20 border-t border-neutral-100">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <div className="mb-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-800">
                Histórico de Generaciones
              </h2>
              <p className="text-neutral-500 mt-2">
                El legado de quienes construyeron nuestro capítulo.
              </p>
            </div>

            <div className="space-y-12">
              {mesasAnteriores.map((generacion) => (
                <div
                  key={generacion.periodo}
                  className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-[#98002e] mb-6 border-b border-neutral-100 pb-4">
                    Generación {generacion.periodo}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {generacion.miembros.map((miembro) => (
                      <div key={miembro.id} className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-neutral-100 overflow-hidden flex-shrink-0 relative border border-neutral-200">
                          <FallbackImage
                            src={
                              miembro.imagen_url ||
                              "/IMG/MesaDirectiva/Default.jpg"
                            }
                            alt={miembro.nombre}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900 text-sm leading-tight">
                            {miembro.nombre}
                          </p>
                          <p className="text-xs text-neutral-500 mt-0.5">
                            {miembro.puesto}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
