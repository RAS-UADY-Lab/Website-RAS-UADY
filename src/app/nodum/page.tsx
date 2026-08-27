"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Reveal from "@/components/ui/Reveal";

export default function EstudiantesPage() {
  return (
    <main className="flex flex-col w-full min-h-screen bg-slate-50 text-neutral-900 overflow-x-hidden">
      {/* Sección Hero */}
      <section className="relative w-full overflow-hidden shadow-sm shadow-neutral-900/20">
        {/* Hero móvil */}
        <div className="md:hidden relative bg-gradient-to-br from-[#98002e] to-[#5f2167] pt-32 pb-12 px-5">
          <div className="absolute -top-16 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-16 w-64 h-64 rounded-full bg-black/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center text-white">
            <Reveal delay={0}>
              <h1 className="text-3xl font-extrabold tracking-tight leading-[1.15] mb-4 drop-shadow-md">
                El Campus Digital Que Estabas Esperando
              </h1>
            </Reveal>

            <Reveal delay={0}>
              <p className="text-[15px] text-white/90 font-light leading-relaxed max-w-sm mb-7">
                Nodum centraliza la vida en el campus en una sola plataforma,
                desarrollada por RAS UADY para la comunidad de Mérida.
                Próximamente en la Facultad de Ingeniería.
              </p>
            </Reveal>

            <Reveal delay={0}>
              <Link
                href="#caracteristicas"
                className="inline-flex h-12 w-full items-center justify-center rounded-md bg-white px-8 text-sm font-bold text-[#5f2167] shadow-sm transition-all duration-300 active:scale-95"
              >
                Conoce más
              </Link>
            </Reveal>

            <Reveal delay={0}>
              <div className="grid grid-cols-3 gap-2 w-full mt-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md p-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    <i className="icon-map-location-dot text-lg"></i>
                  </div>
                  <span className="text-[11px] font-semibold leading-tight">
                    Navegación
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    <i className="icon-store-solid-full text-lg"></i>
                  </div>
                  <span className="text-[11px] font-semibold leading-tight">
                    Comercio
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center">
                    <i className="icon-directory text-lg"></i>
                  </div>
                  <span className="text-[11px] font-semibold leading-tight">
                    Directorio
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Hero escritorio */}
        <div className="hidden md:block relative bg-gradient-to-br from-[#98002e] to-[#5f2167] pt-36 pb-32">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-0"></div>
          <div className="absolute inset-0 backdrop-blur-[4px] bg-white/5 z-0 pointer-events-none"></div>

          <div className="container relative z-10 mx-auto max-w-7xl px-8 flex flex-row items-center gap-12">
            <div className="w-1/2 flex flex-col items-start text-left text-white">
              <Reveal delay={0}>
                <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1] drop-shadow-md">
                  El Campus Digital <br />
                  Que Estabas Esperando
                </h1>
              </Reveal>

              <Reveal delay={0}>
                <p className="text-xl text-white/90 font-light max-w-lg mb-8 leading-relaxed drop-shadow-sm">
                  Nodum centraliza la vida en el campus en una sola plataforma.
                  Desarrollada por el capítulo estudiantil RAS UADY para la
                  comunidad estudiantil de Mérida, Yucatán.
                </p>
              </Reveal>

              <Reveal delay={0}>
                <p className="text-xl text-white/90 font-light max-w-lg mb-8 leading-relaxed drop-shadow-sm">
                  ¡Espérala primero para la Facultad de Ingeniería de la
                  Universidad Autónoma de Yucatán!
                </p>
              </Reveal>

              <Reveal delay={0}>
                <div className="flex flex-row gap-4 w-auto">
                  <Link
                    href="#caracteristicas"
                    className="group relative inline-flex h-12 w-auto items-center justify-center rounded-md bg-white px-8 text-sm font-bold text-[#5f2167] shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105 cursor-pointer"
                  >
                    Conoce Más
                  </Link>
                </div>
              </Reveal>
            </div>

            <div className="w-1/2 relative h-[500px] flex items-center justify-center">
              <div className="absolute z-20 w-64 bg-white rounded-2xl border border-neutral-200 shadow-xl p-5 flex flex-col gap-4 transform transition-transform duration-700 hover:scale-105 text-neutral-900">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#5f2167]/10 to-[#98002e]/10 text-[#98002e] flex items-center justify-center mb-2">
                  <i className="icon-map-location-dot text-2xl"></i>
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 text-lg leading-tight">
                    Navegación Exacta
                  </h3>
                  <p className="text-xs text-neutral-500 mt-1 font-medium">
                    Localiza laboratorios y aulas al instante.
                  </p>
                </div>
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="w-3/4 h-full bg-gradient-to-r from-[#5f2167] to-[#98002e]"></div>
                </div>
              </div>

              <Reveal delay={0}>
                <div className="absolute z-10 right-8 top-12 w-56 bg-white rounded-2xl border border-neutral-200 shadow-lg p-4 flex flex-col gap-3 transform rotate-6 opacity-95 backdrop-blur-sm transition-transform duration-700 hover:rotate-0 hover:z-30 text-neutral-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-slate-100 text-neutral-600 flex items-center justify-center border border-neutral-200">
                      <i className="icon-store-solid-full text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-bold text-neutral-800 text-sm">
                        Comercio Local
                      </h4>
                      <span className="text-[10px] font-semibold text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full border border-neutral-200">
                        En Línea
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0}>
                <div className="absolute z-10 left-4 bottom-16 w-60 bg-white rounded-2xl border border-neutral-200 shadow-lg p-4 flex flex-col gap-3 transform -rotate-3 opacity-95 backdrop-blur-sm transition-transform duration-700 hover:rotate-0 hover:z-30 text-neutral-900">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-md bg-slate-100 text-neutral-600 flex items-center justify-center border border-neutral-200">
                      <i className="icon-directory text-xl"></i>
                    </div>
                    <div className="flex-1">
                      <div className="h-3 w-3/4 bg-neutral-200 rounded mb-1.5"></div>
                      <div className="h-2 w-1/2 bg-neutral-100 rounded"></div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Sección De Características Para Estudiantes */}
      <section
        id="caracteristicas"
        className="bg-slate-50 py-16 md:py-24 border-b border-neutral-100"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 m:mb-16 text-center max-w-3xl mx-auto">
            <Reveal delay={0}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-4">
                Todo Lo Que Necesitas, En Un Solo Lugar
              </h2>
            </Reveal>
            <Reveal delay={0}>
              <p className="text-base md:text-lg text-neutral-600 font-medium leading-relaxed">
                Despídete del caos al inicio del semestre. Reunimos las
                herramientas esenciales para que te enfoques únicamente en tu
                desarrollo académico.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
            {/* Tarjeta: Navegación */}
            <Reveal delay={0}>
              <Card className="group card-brand ring-0 flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 group-hover:bg-gradient-to-r group-hover:from-[#5f2167]/10 group-hover:to-[#98002e]/10 text-neutral-400 flex items-center justify-center mb-4 border border-neutral-200 transition-colors duration-300">
                    <i className="icon-map-location-dot text-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5f2167] group-hover:to-[#98002e] transition-all duration-300"></i>
                  </div>
                  <CardTitle className="text-xl font-bold text-fluid-gradient">
                    Directorio Espacial
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Un mapa interactivo con precisión milimétrica. Encuentra la
                    ubicación exacta de cualquier laboratorio, cubículo docente
                    o auditorio sin preguntar direcciones.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            {/* Tarjeta: Mercado */}
            <Reveal delay={0}>
              <Card className="group card-brand ring-0 flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 group-hover:bg-gradient-to-r group-hover:from-[#5f2167]/10 group-hover:to-[#98002e]/10 text-neutral-400 flex items-center justify-center mb-4 border border-neutral-200 transition-colors duration-300">
                    <i className="icon-store-solid-full text-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5f2167] group-hover:to-[#98002e] transition-all duration-300"></i>
                  </div>
                  <CardTitle className="text-xl font-bold text-fluid-gradient">
                    Mercado Estudiantil
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Potencia la economía circular. Compra, vende o intercambia
                    materiales, componentes electrónicos y servicios de
                    impresión 3D de forma segura con tus compañeros.
                  </p>
                </CardContent>
              </Card>
            </Reveal>

            {/* Tarjeta: Documentos */}
            <Reveal delay={0}>
              <Card className="group card-brand ring-0 flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-neutral-100 group-hover:bg-gradient-to-r group-hover:from-[#5f2167]/10 group-hover:to-[#98002e]/10 text-neutral-400 flex items-center justify-center mb-4 border border-neutral-200 transition-colors duration-300">
                    <i className="icon-directory text-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5f2167] group-hover:to-[#98002e] transition-all duration-300"></i>
                  </div>
                  <CardTitle className="text-xl font-bold text-fluid-gradient">
                    Acervo Oficial
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                    Acceso directo e inmutable a normativas, formatos de
                    justificación, protocolos de seguridad y accesos rápidos a
                    los portales oficiales de la universidad.
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Sección De Expectativa (Próximamente) */}
      <section
        id="proximamente"
        className="bg-white py-16 md:py-24 border-b border-neutral-100"
      >
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <Reveal delay={0}>
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-[#5f2167] to-[#98002e] text-white flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-lg shadow-[#98002e]/20">
              <i className="icon-hourglass-start text-2x1 md:text-3xl animate-pulse"></i>
            </div>
          </Reveal>

          <Reveal delay={0}>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-4 md:mb-6 leading-tight">
              Lanzamiento Oficial <br />
              <span className="bg-gradient-to-r from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                Próximamente
              </span>
            </h2>
          </Reveal>

          <Reveal delay={0}>
            <p className="text-base md:text-lg text-neutral-600 font-medium mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Estamos afinando los últimos detalles para empezar con el pie
              derecho. ¡Esperamos que este proyecto te sea útil en tu vida
              académica!
            </p>
          </Reveal>

          <Reveal delay={0}>
            <p className="text-sm text-neutral-400 font-bold tracking-wide">
              Mantente atento a los comunicados oficiales.
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
