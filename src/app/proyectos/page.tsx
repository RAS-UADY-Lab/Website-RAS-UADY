"use client";

import { useState, useEffect } from "react";
import FallbackImage from "@/components/ui/FallbackImage";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { createBrowserClient } from "@supabase/ssr";

interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  tecnologias: string;
  enlace: string;
  imagen_url: string | null;
}

export default function ProyectosPage() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    const fetchProyectos = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("proyectos")
        .select("*")
        .eq("oculto", false)
        .order("creado_en", { ascending: false });

      if (!error && data) {
        setProyectos(data);
      }
      setIsLoading(false);
    };

    fetchProyectos();
  }, [supabase]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* HEADER DE SECCIÓN */}
      <section className="bg-white pt-32 pb-12 md:pt-40 md:pb-16 border-b border-neutral-100">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-6">
            Portafolio de Proyectos
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Explora los desarrollos técnicos, investigaciones y prototipos
            creados por los miembros de nuestro capítulo. De la teoría a la
            automatización real.
          </p>
        </div>
      </section>

      {/* GALERÍA DE PROYECTOS */}
      <section className="bg-slate-50 py-16 md:py-24 flex-1">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          {isLoading ? (
            <div className="py-20 text-center text-neutral-500 font-medium">
              Cargando proyectos...
            </div>
          ) : proyectos.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center bg-white border border-neutral-200 rounded-2xl p-10 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Aún no hay proyectos públicos
              </h3>
              <p className="text-neutral-600">
                Nuestros miembros se encuentran trabajando en nuevos
                desarrollos. ¡Vuelve pronto!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {proyectos.map((proy) => (
                <Card
                  key={proy.id}
                  className="group card-brand ring-0 flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="relative h-64 w-full bg-neutral-100 rounded-t-xl overflow-hidden border-b border-neutral-100">
                    <FallbackImage
                      src={proy.imagen_url || "/IMG/EVENTS/Default.jpg"}
                      alt={`Imagen de ${proy.titulo}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl text-fluid-gradient mb-2">
                      {proy.titulo}
                    </CardTitle>
                    {proy.tecnologias && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {proy.tecnologias.split(",").map((tech, index) => (
                          <span
                            key={index}
                            className="inline-flex bg-neutral-100 border border-neutral-200 text-neutral-600 text-xs font-bold px-2.5 py-1 rounded-md"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="text-base text-neutral-600 mb-6 flex-1 leading-relaxed">
                      {proy.descripcion}
                    </CardDescription>

                    {proy.enlace && (
                      <a
                        href={proy.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn relative inline-flex w-full sm:w-auto h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer self-start"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                        <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white flex items-center gap-2">
                          Ver Detalles del Proyecto
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </span>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
