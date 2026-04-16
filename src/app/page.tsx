"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FallbackImage from "@/components/ui/FallbackImage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createBrowserClient } from "@supabase/ssr";

// --- INTERFACES PARA TIPADO ---
interface Stats {
  proyectos: number;
  eventos: number;
  aniosActivos: number;
}

interface ActividadDestacada {
  id: string;
  titulo: string;
  descripcion: string;
  enlace: string;
  imagen_url: string | null;
  fecha_inicio: string;
}

interface Patrocinador {
  id: string;
  nombre: string;
  logo_url: string | null;
  enlace: string;
  nivel: string;
}

export default function HomePage() {
  const [stats, setStats] = useState<Stats>({
    proyectos: 0,
    eventos: 0,
    aniosActivos: 0,
  });
  const [destacada, setDestacada] = useState<ActividadDestacada | null>(null);
  const [patrocinadores, setPatrocinadores] = useState<Patrocinador[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estado del motor de animación para la esfera del Hero
  const [heroOrb, setHeroOrb] = useState({
    x: 85, // Posición inicial X (%)
    y: 25, // Posición inicial Y (%)
    scale: 1, // Tamaño
    opacity: 0, // Inicia invisible para el primer Fade In
    isTransitioning: true, // Controla si CSS debe animar o aplicar instantáneamente
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  useEffect(() => {
    // 1. Motor de Animación de la Esfera
    // Entrada inicial
    const initialTimer = setTimeout(() => {
      setHeroOrb((prev) => ({ ...prev, opacity: 0.35 }));
    }, 500);

    const orbInterval = setInterval(() => {
      // Fase A: Iniciar desvanecimiento (Fade Out)
      setHeroOrb((prev) => ({ ...prev, opacity: 0 }));

      // Fase B: Esperar a que termine el desvanecimiento para reubicar (2.5s)
      setTimeout(() => {
        const newX = Math.floor(Math.random() * 80) + 10; // Rango: 10% a 90%
        const newY = Math.floor(Math.random() * 80) + 10; // Rango: 10% a 90%
        const newScale = Math.random() * 0.8 + 0.6; // Rango: 0.6 a 1.4

        // Reubicación instantánea invisible
        setHeroOrb({
          x: newX,
          y: newY,
          scale: newScale,
          opacity: 0,
          isTransitioning: false,
        });

        // Fase C: Reactivar transición y hacer Fade In
        setTimeout(() => {
          setHeroOrb({
            x: newX,
            y: newY,
            scale: newScale,
            opacity: 0.35,
            isTransitioning: true,
          });
        }, 100);
      }, 2500);
    }, 9000); // Ciclo completo cada 9 segundos

    // 2. Extracción de Datos
    const fetchHomeData = async () => {
      setIsLoading(true);
      const currentYear = new Date().getFullYear();

      // Cálculo dinámico de años desde la fundación oficial (2024)
      const aniosCalculados = Math.max(1, currentYear - 2024);

      const [resProyectos, resEventos] = await Promise.all([
        supabase
          .from("proyectos")
          .select("id", { count: "exact", head: true })
          .eq("oculto", false),
        supabase
          .from("actividades")
          .select("id", { count: "exact", head: true })
          .eq("oculto", false)
          .gte("fecha_inicio", `${currentYear}-01-01T00:00:00Z`),
      ]);

      setStats({
        proyectos: resProyectos.count || 0,
        eventos: resEventos.count || 0,
        aniosActivos: aniosCalculados,
      });

      const resDestacada = await supabase
        .from("actividades")
        .select("id, titulo, descripcion, enlace, imagen_url, fecha_inicio")
        .eq("destacada", true)
        .eq("oculto", false)
        .limit(1)
        .single();

      if (resDestacada.data) setDestacada(resDestacada.data);

      const resPats = await supabase
        .from("patrocinadores")
        .select("*")
        .eq("activo", true)
        .order("creado_en", { ascending: false });

      if (resPats.data) setPatrocinadores(resPats.data);

      setIsLoading(false);
    };

    fetchHomeData();

    // Limpieza de intervalos al desmontar
    return () => {
      clearTimeout(initialTimer);
      clearInterval(orbInterval);
    };
  }, [supabase]);

  // UMBRAL DE ESTADÍSTICAS
  const showStats = stats.proyectos >= 2 || stats.eventos >= 5;

  // CLONACIÓN INTELIGENTE PARA EL BUCLE DEL CARRUSEL
  const arrayPatrocinadores =
    patrocinadores.length > 0
      ? Array.from({
          length: Math.max(10, Math.ceil(20 / patrocinadores.length)),
        }).flatMap(() => patrocinadores)
      : [];

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-br from-[#98002e] to-[#5f2167] pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden shadow-sm shadow-neutral-900/20">
        {/* Capa 1: Oscurecimiento base */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay z-0"></div>

        {/* Capa 2: ESFERA DE NODOS ANIMADA */}
        <div
          className="absolute pointer-events-none z-0"
          style={{
            left: `${heroOrb.x}%`,
            top: `${heroOrb.y}%`,
            width: "800px",
            height: "800px",
            transform: `translate(-50%, -50%) scale(${heroOrb.scale})`,
            opacity: heroOrb.opacity,
            transition: heroOrb.isTransitioning
              ? "opacity 2.5s ease-in-out"
              : "none",
          }}
        >
          <div className="w-full h-full animate-spin-slow">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.8">
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  strokeDasharray="2 4"
                  strokeWidth="0.8"
                />
                <ellipse cx="100" cy="100" rx="90" ry="30" />
                <ellipse cx="100" cy="100" rx="90" ry="60" />
                <ellipse cx="100" cy="100" rx="30" ry="90" />
                <ellipse cx="100" cy="100" rx="60" ry="90" />
                <circle cx="100" cy="10" r="3" fill="#ffffff" />
                <circle cx="100" cy="190" r="3" fill="#ffffff" />
                <circle cx="10" cy="100" r="3" fill="#ffffff" />
                <circle cx="190" cy="100" r="3" fill="#ffffff" />
                <circle cx="70" cy="40" r="2.5" fill="#ffffff" />
                <circle cx="130" cy="160" r="2.5" fill="#ffffff" />
                <circle cx="160" cy="70" r="2.5" fill="#ffffff" />
                <circle cx="40" cy="130" r="2.5" fill="#ffffff" />
                <circle cx="140" cy="40" r="2" fill="#ffffff" />
                <circle cx="60" cy="160" r="2" fill="#ffffff" />
              </g>
            </svg>
          </div>
        </div>

        {/* Capa 3: Filtro Glassmorphism (Cristal Esmerilado) */}
        <div className="absolute inset-0 backdrop-blur-[4px] bg-white/5 z-0 pointer-events-none"></div>

        {/* Capa 4: Contenido Frontal */}
        <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8 text-center text-white">
          <h3 className="text-sm md:text-base font-bold tracking-widest uppercase text-white/80 mb-4 drop-shadow-sm">
            Instituto de Ingenieros Eléctricos y Electrónicos
          </h3>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 drop-shadow-md">
            Sociedad de Robótica <br className="hidden md:block" /> y
            Automatización
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-light max-w-3xl mx-auto mb-10 drop-shadow-sm">
            Capítulo Estudiantil en la Facultad de Ingeniería - UADY
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/actividades"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-white px-8 text-sm font-medium text-[#5f2167] shadow-sm transition-all duration-300 hover:bg-neutral-100 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
            >
              Explorar Actividades
            </Link>
            <Link
              href="/nosotros"
              className="w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-black/20 backdrop-blur-sm px-8 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:bg-white/20 hover:border-white/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white cursor-pointer"
            >
              Conocer al Capítulo
            </Link>
          </div>
        </div>
      </section>

      {/* ESTADÍSTICAS RÁPIDAS (Condicionadas al umbral) */}
      {!isLoading && showStats && (
        <section className="border-b border-neutral-100 bg-white py-12">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center divide-x divide-neutral-200">
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-neutral-900">
                  {stats.aniosActivos}
                </span>
                <span className="text-sm text-neutral-500 mt-1">
                  {stats.aniosActivos === 1 ? "Año Activo" : "Años Activos"}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-neutral-900">
                  {stats.proyectos}
                </span>
                <span className="text-sm text-neutral-500 mt-1">
                  Proyectos Públicos
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-neutral-900">
                  {stats.eventos}
                </span>
                <span className="text-sm text-neutral-500 mt-1">
                  Eventos en {new Date().getFullYear()}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-neutral-900">
                  1
                </span>
                <span className="text-sm text-neutral-500 mt-1">Misión</span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN EDUCATIVA: ¿QUÉ ES IEEE Y RAS? (ONBOARDING) */}
      <section className="bg-slate-50 py-20 border-b border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
              El Ecosistema Tecnológico
            </h2>
            <p className="mt-4 text-lg text-neutral-600">
              ¿Nuevo en la facultad? Descubre qué es IEEE, cómo funciona nuestra
              sociedad técnica y por qué unirte es el mejor impulso para tu
              carrera en ingeniería.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tarjeta 1: IEEE */}
            <Card className="group card-brand ring-0 flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 group-hover:bg-gradient-to-r group-hover:from-[#5f2167]/10 group-hover:to-[#98002e]/10 text-neutral-400 flex items-center justify-center mb-4 border border-neutral-200 transition-colors duration-300">
                  <i className="icon-Info text-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5f2167] group-hover:to-[#98002e] transition-all duration-300"></i>
                </div>
                <CardTitle className="text-xl font-bold text-fluid-gradient">
                  ¿Qué es IEEE?
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Es la{" "}
                  <strong>
                    organización profesional técnica más grande del mundo
                  </strong>{" "}
                  (Institute of Electrical and Electronics Engineers). Su misión
                  es fomentar la innovación tecnológica en beneficio de la
                  humanidad. Establecen estándares globales (como el Wi-Fi) y
                  publican la mayor parte de la literatura técnica del mundo.
                </p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="https://www.ieee.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex w-full h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                  <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                    Sitio Oficial IEEE
                  </span>
                </Link>
              </div>
            </Card>

            {/* Tarjeta 2: RAS */}
            <Card className="group card-brand ring-0 flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 group-hover:bg-gradient-to-r group-hover:from-[#5f2167]/10 group-hover:to-[#98002e]/10 text-neutral-400 flex items-center justify-center mb-4 border border-neutral-200 transition-colors duration-300">
                  <i className="icon-CodLaptop text-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5f2167] group-hover:to-[#98002e] transition-all duration-300"></i>
                </div>
                <CardTitle className="text-xl font-bold text-fluid-gradient">
                  ¿Qué es RAS?
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  El IEEE está dividido en múltiples &quot;Sociedades&quot;
                  especializadas. <strong>RAS</strong> (Robotics and Automation
                  Society) es la rama enfocada exclusivamente en la teoría y
                  práctica de la robótica, sistemas de control, IA aplicada y
                  automatización industrial.
                </p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="https://www.ieee-ras.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex w-full h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                  <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                    Sitio Oficial RAS
                  </span>
                </Link>
              </div>
            </Card>

            {/* Tarjeta 3: Capítulo Estudiantil */}
            <Card className="group card-brand ring-0 flex flex-col h-full bg-white transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-neutral-100 group-hover:bg-gradient-to-r group-hover:from-[#5f2167]/10 group-hover:to-[#98002e]/10 text-neutral-400 flex items-center justify-center mb-4 border border-neutral-200 transition-colors duration-300">
                  <i className="icon-Casa text-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#5f2167] group-hover:to-[#98002e] transition-all duration-300"></i>
                </div>
                <CardTitle className="text-xl font-bold text-fluid-gradient">
                  El Capítulo en UADY
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Un <strong>Capítulo Estudiantil</strong> es la representación
                  oficial de una Sociedad de IEEE dentro de una universidad.
                  Nosotros somos el puente que conecta a los estudiantes de la
                  FIUADY con los recursos, competencias y el respaldo
                  internacional de IEEE RAS.
                </p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="https://linktr.ee/RAS.UADY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex w-full h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                  <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                    Nuestras Redes
                  </span>
                </Link>
              </div>
            </Card>
          </div>

          {/* PREGUNTAS FRECUENTES (FAQ Accordion) */}
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold tracking-tight text-neutral-900">
                Preguntas Frecuentes
              </h3>
              <p className="text-sm text-neutral-500 mt-2">
                Todo lo que necesitas saber antes de dar el siguiente paso.
              </p>
            </div>

            <div className="space-y-4 text-left">
              {/* FAQ 1 */}
              <details className="group border border-neutral-200 bg-white rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-neutral-800 hover:bg-slate-50 transition-colors">
                  <span>¿Por qué debería unirme al capítulo?</span>
                  <span className="transition duration-300 group-open:-rotate-180 text-[#98002e]">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="p-5 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2 bg-slate-50/50">
                  Unirte te da acceso a una red de contactos invaluable,
                  recursos técnicos exclusivos, talleres prácticos y la
                  oportunidad de desarrollar habilidades blandas y de liderazgo.
                  Es el diferenciador perfecto en tu currículum al graduarte
                  frente a otros ingenieros.
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group border border-neutral-200 bg-white rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-neutral-800 hover:bg-slate-50 transition-colors">
                  <span>¿Cuáles son mis responsabilidades como miembro?</span>
                  <span className="transition duration-300 group-open:-rotate-180 text-[#98002e]">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="p-5 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2 bg-slate-50/50">
                  Tu nivel de involucramiento lo decides tú. Como{" "}
                  <strong>miembro casual</strong>, solo recibes información de
                  nuestros eventos. Como <strong>miembro formal o staff</strong>
                  , te comprometes a apoyar en la logística de eventos, aportar
                  ideas para proyectos técnicos y asistir a las asambleas cuando
                  tu horario de clases te lo permita.
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group border border-neutral-200 bg-white rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-neutral-800 hover:bg-slate-50 transition-colors">
                  <span>
                    ¿Necesito saber de robótica o programación para entrar?
                  </span>
                  <span className="transition duration-300 group-open:-rotate-180 text-[#98002e]">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="p-5 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2 bg-slate-50/50">
                  ¡Para nada! El capítulo es un espacio de{" "}
                  <strong>aprendizaje</strong>. Aceptamos estudiantes de todas
                  las ingenierías (Mecatrónica, Software, Energías, Civil, etc.)
                  desde su primer semestre. Si tienes las ganas de aprender,
                  nosotros te proporcionamos los espacios, talleres y compañeros
                  para hacerlo.
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group border border-neutral-200 bg-white rounded-xl overflow-hidden [&_summary::-webkit-details-marker]:hidden shadow-sm">
                <summary className="flex items-center justify-between cursor-pointer p-5 font-bold text-neutral-800 hover:bg-slate-50 transition-colors">
                  <span>¿Tiene algún costo pertenecer al capítulo?</span>
                  <span className="transition duration-300 group-open:-rotate-180 text-[#98002e]">
                    <svg
                      fill="none"
                      height="24"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                    >
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="p-5 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 mt-2 bg-slate-50/50">
                  Participar a nivel local (dentro de la UADY) como oyente,
                  staff o en talleres introductorios suele ser{" "}
                  <strong>completamente gratuito</strong>. Sin embargo, si
                  deseas obtener la certificación internacional, acceder a
                  becas, credencial oficial, correos @ieee.org y participar en
                  competencias globales, deberás adquirir la{" "}
                  <strong>Membresía Anual IEEE Estudiantil</strong>, la cual se
                  paga directamente a la plataforma global de IEEE.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* ACTIVIDAD DESTACADA */}
      {!isLoading && destacada && (
        <section className="bg-white py-20 border-b border-neutral-100">
          <div className="container mx-auto max-w-7xl px-4 md:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12 bg-slate-50 border border-neutral-200 rounded-3xl p-8 lg:p-12 shadow-sm relative overflow-hidden">
              {/* Badge visual oficial con degradado */}
              <div className="absolute top-0 right-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] text-white text-xs font-bold px-4 py-2 rounded-bl-xl tracking-widest uppercase shadow-sm">
                ★ Destacado
              </div>

              <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10 mt-4 lg:mt-0">
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 mb-4 leading-tight">
                  {destacada.titulo}
                </h2>
                <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-6">
                  {new Date(destacada.fecha_inicio).toLocaleDateString(
                    "es-MX",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
                <p className="text-neutral-600 leading-relaxed mb-8 line-clamp-4">
                  {destacada.descripcion}
                </p>
                <Link
                  href={destacada.enlace}
                  target="_blank"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-[#5f2167] to-[#98002e] px-8 text-sm font-bold text-white shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90 hover:-translate-y-1 cursor-pointer"
                >
                  Conocer más detalles
                </Link>
              </div>
              <div className="w-full lg:w-1/2 relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg border border-neutral-200">
                <FallbackImage
                  src={destacada.imagen_url || "/IMG/EVENTS/Default.jpg"}
                  alt={destacada.titulo}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECCIÓN: LO QUE HACEMOS */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                Lo que hacemos
              </h2>
              <p className="mt-4 text-neutral-600 max-w-2xl">
                Impulsamos el desarrollo tecnológico mediante espacios de
                aprendizaje, competencia y conexión con la industria real.
              </p>
            </div>
            <Link
              href="/actividades"
              className="group relative inline-flex h-10 w-full md:w-auto items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover:text-white">
                Ver calendario completo
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full bg-neutral-100 rounded-t-xl overflow-hidden">
                <FallbackImage
                  src="/IMG/EVENTS/TallerWebDesign2025.jpg"
                  alt="Taller de Desarrollo Web"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-fluid-gradient">
                  Talleres
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-neutral-600">
                  Damos talleres para que la comunidad estudiantil adquiera
                  nuevas habilidades técnicas y prácticas.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full bg-neutral-100 rounded-t-xl overflow-hidden">
                <FallbackImage
                  src="/IMG/EVENTS/VisitaSOMEY2025.jpg"
                  alt="Visita Técnica"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-fluid-gradient">
                  Visitas Técnicas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-neutral-600">
                  Organizamos visitas a empresas relevantes en ingeniería para
                  conocer la industria en un entorno real.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full bg-neutral-100 rounded-t-xl overflow-hidden">
                <FallbackImage
                  src="/IMG/EVENTS/EnlazandoCiencias2025.jpg"
                  alt="Divulgación Científica"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-fluid-gradient">
                  Divulgación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-neutral-600">
                  Nos presentamos en eventos que dan a conocer la tecnología a
                  la comunidad de Mérida, Yucatán.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group card-brand ring-0 transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-48 w-full bg-neutral-100 rounded-t-xl overflow-hidden">
                <FallbackImage
                  src="/IMG/EVENTS/SeguidorANAHUAC2025.jpg"
                  alt="Competencias de Robótica"
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-fluid-gradient">
                  Competencias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-neutral-600">
                  Participamos en competencias y concursos que demuestran el
                  talento y la dedicación de nuestros miembros.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* DIRECTORIO DE PATROCINADORES Y ALIADOS (Marquee Perfecto y Cuadrados) */}
      {!isLoading && patrocinadores.length > 0 && (
        <section className="bg-white py-16 border-y border-neutral-100 relative overflow-hidden">
          <div className="container mx-auto max-w-7xl px-4 md:px-8 mb-8 text-center">
            <h3 className="text-sm font-bold tracking-widest uppercase text-neutral-400">
              Con el respaldo de
            </h3>
          </div>

          <div className="flex w-full relative flex-nowrap overflow-hidden">
            <div className="flex animate-marquee shrink-0 min-w-full justify-around items-center">
              {arrayPatrocinadores.map((pat, idx) => (
                <div
                  key={`pat1-${pat.id}-${idx}`}
                  className="mx-4 md:mx-6 flex-shrink-0"
                >
                  {pat.enlace ? (
                    <a
                      href={pat.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 aspect-square rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 cursor-pointer grayscale opacity-70 hover:grayscale-0 hover:opacity-100 flex items-center justify-center">
                        {pat.logo_url ? (
                          <img
                            src={pat.logo_url}
                            alt={`Logo de ${pat.nombre}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs md:text-sm font-bold text-neutral-800 text-wrap text-center leading-tight p-2">
                            {pat.nombre}
                          </span>
                        )}
                      </div>
                    </a>
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 aspect-square rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm transition-all duration-300 grayscale opacity-70 flex items-center justify-center">
                      {pat.logo_url ? (
                        <img
                          src={pat.logo_url}
                          alt={`Logo de ${pat.nombre}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs md:text-sm font-bold text-neutral-800 text-wrap text-center leading-tight p-2">
                          {pat.nombre}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div
              className="flex animate-marquee shrink-0 min-w-full justify-around items-center"
              aria-hidden="true"
            >
              {arrayPatrocinadores.map((pat, idx) => (
                <div
                  key={`pat2-${pat.id}-${idx}`}
                  className="mx-4 md:mx-6 flex-shrink-0"
                >
                  {pat.enlace ? (
                    <a
                      href={pat.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 aspect-square rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 flex items-center justify-center">
                        {pat.logo_url ? (
                          <img
                            src={pat.logo_url}
                            alt={`Logo de ${pat.nombre}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-xs md:text-sm font-bold text-neutral-800 text-wrap text-center leading-tight p-2">
                            {pat.nombre}
                          </span>
                        )}
                      </div>
                    </a>
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 aspect-square rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-sm transition-all duration-300 grayscale opacity-70 flex items-center justify-center">
                      {pat.logo_url ? (
                        <img
                          src={pat.logo_url}
                          alt={`Logo de ${pat.nombre}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs md:text-sm font-bold text-neutral-800 text-wrap text-center leading-tight p-2">
                          {pat.nombre}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        </section>
      )}

      {/* SECCIÓN: ÚNETE AL CAPÍTULO */}
      <section className="bg-white py-20 border-t border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
              Únete al capítulo IEEE - RAS
            </h2>
            <p className="mt-4 text-neutral-600">
              Hay varias formas de participar en las actividades RAS: desde
              asistir como oyente o público, hasta involucrarte como voluntario
              o staff. Explora las oportunidades y aprovecha la que mejor se
              adapte a ti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="group card-brand ring-0 flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl text-fluid-gradient">
                  Miembro Casual
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm text-neutral-600">
                  Forma parte de nuestros canales de difusión. Recibirás
                  invitaciones a eventos y oportunidades para participar en su
                  organización y ejecución.
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="https://chat.whatsapp.com/IHxdv3anQp46EeUKX2WuW1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full h-10 items-center justify-center rounded-md bg-gradient-to-r from-[#5f2167] to-[#98002e] px-6 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90 hover:-translate-y-[2px] cursor-pointer"
                >
                  Unirme a la comunidad
                </Link>
              </div>
            </Card>

            <Card className="group card-brand ring-0 flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl text-fluid-gradient">
                  Miembro Formal
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm text-neutral-600">
                  Regístrate si te interesa estar en la primera línea de las
                  actividades. Serás de los primeros en ser considerado como
                  staff cuando se requiera.
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeTNdu4XW6zMsYH5QNHUW7Iwf5jtVzBBgGNqLzheyNjqEr6CA/viewform?usp=header"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn relative inline-flex w-full h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                  <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                    Registrarme
                  </span>
                </Link>
              </div>
            </Card>

            <Card className="group card-brand ring-0 flex flex-col h-full transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl text-fluid-gradient">
                  Con Membresía
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm text-neutral-600">
                  Obtén tu membresía oficial IEEE-RAS y accede a beneficios
                  internacionales. Aprovecha sus recursos técnicos, competencias
                  globales y descuentos.
                </CardDescription>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link
                  href="/membresia"
                  className="group/btn relative inline-flex w-full h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                  <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                    Conocer más
                  </span>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
