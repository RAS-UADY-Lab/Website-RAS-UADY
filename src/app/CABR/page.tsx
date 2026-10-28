//src/app/CABR/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Reveal from "@/components/ui/Reveal";
import FallbackImage from "@/components/ui/FallbackImage";

/** URL del formulario oficial de registro. */
const REGISTRO_URL = "https://forms.cloud.microsoft/r/GUZwxg3fAv";
/** Rutas públicas de las convocatorias en PDF. */
const PDF_MINISUMO =
  "https://drive.google.com/file/d/1ENh325vA2ocjAtOjT5u1xbCzbgplOxFn/view?usp=sharing";
const PDF_CAMINANTES =
  "https://drive.google.com/file/d/1IFtPmQad7gEvNmHzYxmOzs5vTgD3ty1Y/view?usp=drive_link";
const WHATSAPP_URL = "https://wa.me/529932522062";
const INSTAGRAM_URL = "https://www.instagram.com/ras.uady";

/** Inicio del evento: miércoles 25 de noviembre de 2026, 9:00 (UTC-6). */
const EVENT_START = new Date("2026-11-25T09:00:00-06:00").getTime();

type IconName = "calendar" | "clock" | "pin" | "ticket" | "trophy" | "bolt";

const ICON_PATHS: Record<IconName, string> = {
  calendar:
    "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z",
  clock: "M12 6v6l4 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z",
  pin: "M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12zM12 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  ticket:
    "M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a3 3 0 0 0 0 6v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a3 3 0 0 0 0-6zM13 5v14",
  trophy:
    "M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 6H4a3 3 0 0 0 3 4M17 6h3a3 3 0 0 1-3 4",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
};

function Icon({
  name,
  className = "h-6 w-6",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d={ICON_PATHS[name]} />
    </svg>
  );
}

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

/**
 * Cuenta regresiva hacia el inicio del evento.
 * Retorna null hasta montar en cliente para evitar desajustes de hidratación.
 */
function useCountdown(target: number): TimeLeft | null {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return null;
  const diff = Math.max(0, target - now);
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor((diff / 3_600_000) % 24),
    minutos: Math.floor((diff / 60_000) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

//src/app/CABR/page.tsx
interface Categoria {
  id: string;
  etiqueta: string;
  titulo: string;
  lema: string;
  descripcion: string;
  puntosClave: string[];
  pdf: string;
}

const CATEGORIAS: Categoria[] = [
  {
    id: "minisumo",
    etiqueta: "Categoría 1 / Autónomo",
    titulo: "Minisumo",
    lema: "Empuja. Resiste. Domina el dojo.",
    descripcion:
      "Robots autónomos que se enfrentan cara a cara con un solo objetivo: sacar al oponente del dojo. Aquí gana quien tenga la mejor estrategia, los mejores sensores y el código más afilado.",
    puntosClave: [
      "Robots completamente autónomos.",
      "Enfrentamientos directos, uno contra uno.",
      "Estrategia, sensores y programación como ventaja competitiva.",
    ],
    pdf: PDF_MINISUMO,
  },
  {
    id: "caminantes",
    etiqueta: "Categoría 2 / Remoto",
    titulo: "Carrera de Caminantes",
    lema: "Una pata tras otra. Primero en la meta.",
    descripcion:
      "Robots con patas articuladas, controlados a distancia, compiten cara a cara en una pista con curvas y obstáculos. Ingeniería mecánica pura: tu mecanismo de locomoción es el protagonista.",
    puntosClave: [
      "Robots caminantes con mecanismos de patas articuladas.",
      "Control remoto desde tu equipo.",
      "Carreras directas en una pista con curvas y obstáculos.",
    ],
    pdf: PDF_CAMINANTES,
  },
];

const TIMELINE = [
  {
    fecha: "Ya disponible",
    titulo: "Apertura de inscripciones",
    detalle: "Registra a tu equipo y cada robot desde el formulario oficial.",
  },
  {
    fecha: "21 de noviembre",
    titulo: "Última fecha para ajustes al reglamento",
    detalle:
      "El Comité puede atender solicitudes de participantes hasta cuatro días antes del evento.",
  },
  {
    fecha: "24 de noviembre, 23:59 h",
    titulo: "Cierre de inscripciones",
    detalle:
      "Sin registro y comprobante de pago no hay lugar en el dojo ni en la pista.",
  },
  {
    fecha: "25 de noviembre, 9:00 h",
    titulo: "Arranca la batalla",
    detalle:
      "Homologación, rondas de clasificación y combates en la sala de posgrado.",
  },
  {
    fecha: "25 de noviembre, 15:00 h",
    titulo: "Premiación y cierre",
    detalle: "Medallas, diplomas y reconocimientos para los finalistas.",
  },
];

const PASOS = [
  {
    titulo: "Forma tu equipo",
    texto:
      "Reúne a tus compañeros y elige un capitán. Pueden ser de distintas facultades y carreras del campus.",
  },
  {
    titulo: "Registra tu robot",
    texto: "Llena el formulario por cada robot que quieras inscribir.",
  },
  {
    titulo: "Realiza tu pago",
    texto:
      "La cuota es de $200 MXN por prototipo, más $50 MXN por persona extra.",
  },
  {
    titulo: "¡Compite!",
    texto:
      "Preséntate el día de la competencia en la sala de posgrado y defiende tu lugar en el podio.",
  },
];

const FAQS = [
  {
    q: "¿Quién puede participar?",
    a: "Cualquier estudiante con matrícula activa de la Facultad de Ingeniería, la Facultad de Matemáticas o la Facultad de Ingeniería Química del Campus de Ciencias Exactas e Ingenierías. Se permiten equipos mixtos entre facultades.",
  },
  {
    q: "¿Puedo inscribir más de un robot?",
    a: "Sí. Cada equipo puede registrar el número de robots que desee, siempre que llene un formulario y pague la cuota por cada uno.",
  },
  {
    q: "¿Qué pasa si mi robot no cumple las especificaciones?",
    a: "El jurado verifica cada robot antes de iniciar la prueba. Los robots que no cumplan los requisitos serán descalificados y no podrán participar.",
  },
  {
    q: "¿Se reembolsa la inscripción?",
    a: "No. El pago no es reembolsable bajo ninguna circunstancia. Si hay contingencias, el evento puede adaptarse o posponerse, pero no cancelarse.",
  },
  {
    q: "¿Qué materiales debo llevar?",
    a: "Tus propias herramientas y componentes. La organización asigna a cada equipo un área de trabajo, pero no proporciona material adicional.",
  },
];

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-white/20 bg-white/10 px-3 py-3 backdrop-blur-md md:px-5 md:py-4">
      <span className="text-2xl font-extrabold tabular-nums md:text-4xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="mt-1 text-[10px] font-semibold tracking-widest text-white/70 md:text-xs">
        {label}
      </span>
    </div>
  );
}

export default function BatallaDeRobotsPage() {
  const timeLeft = useCountdown(EVENT_START);

  return (
    <main className="flex min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 text-neutral-900">
      {/* Hero */}
      <section className="relative w-full overflow-hidden bg-gradient-to-br from-[#98002e] to-[#5f2167] pb-20 pt-32 shadow-sm shadow-neutral-900/20 md:pb-28 md:pt-44">
        <div className="absolute inset-0 z-0 bg-black/10 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute -right-40 -top-40 z-0 h-[700px] w-[700px] opacity-30">
          <div className="animate-spin-slow h-full w-full">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full"
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
              </g>
            </svg>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 z-0 bg-white/5 backdrop-blur-[4px]"></div>

        <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 text-white md:px-8 lg:flex-row">
          <div className="flex w-full flex-col items-center text-center lg:w-3/5 lg:items-start lg:text-left">
            <Reveal delay={0}>
              <h1 className="mb-6 text-4xl font-extrabold leading-[1.1] tracking-tight drop-shadow-md md:text-4xl lg:text-5xl">
                2do Concurso Anual de Batalla de Robots UADY
              </h1>
            </Reveal>
            <Reveal delay={0}>
              <p className="mb-8 max-w-xl text-base font-light leading-relaxed text-white/90 drop-shadow-sm md:text-xl">
                Dos categorías, un solo día y la arena donde tu ingeniería se
                pone a prueba frente a otros equipos del campus. Inscribe tu
                robot y demuestra de qué está hecho.
              </p>
            </Reveal>

            <Reveal delay={0}>
              <div className="mb-8 flex flex-col gap-3 text-sm font-semibold sm:flex-row sm:gap-6">
                <span className="inline-flex items-center gap-2">
                  <Icon name="calendar" className="h-5 w-5 text-white/80" />
                  Miércoles 25 de noviembre de 2026
                </span>
                <span className="inline-flex items-center gap-2">
                  <Icon name="clock" className="h-5 w-5 text-white/80" />
                  9:00 a 15:00 h
                </span>
              </div>
            </Reveal>

            <Reveal delay={0}>
              <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                <Link
                  href={REGISTRO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-white px-8 text-sm font-bold text-[#5f2167] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-neutral-100 sm:w-auto"
                >
                  Inscríbete Ahora
                </Link>
                <Link
                  href="#categorias"
                  className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-white/30 bg-black/20 px-8 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:w-auto"
                >
                  Ver categorías
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0}>
              <div className="mt-10 grid w-full max-w-md grid-cols-4 gap-2 md:gap-3">
                <CountdownBox value={timeLeft?.dias ?? 0} label="Días" />
                <CountdownBox value={timeLeft?.horas ?? 0} label="Horas" />
                <CountdownBox value={timeLeft?.minutos ?? 0} label="Min" />
                <CountdownBox value={timeLeft?.segundos ?? 0} label="Seg" />
              </div>
            </Reveal>
          </div>

          <div className="hidden w-full max-w-md lg:block lg:w-2/5">
            <Reveal delay={0}>
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-black/30 ring-1 ring-white/10 transition-transform duration-700 hover:scale-105">
                <FallbackImage
                  src="/IMG/EVENTS/heroCABRMinisumo.jpg"
                  alt="Robots minisumo compitiendo en el 2do Concurso Anual de Batalla de Robots UADY"
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 0px"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Datos clave */}
      <section className="border-b border-neutral-100 bg-white py-10">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4 md:divide-x md:divide-neutral-200">
            {[
              {
                icon: "calendar" as IconName,
                titulo: "25 Nov 2026",
                sub: "Día de la batalla",
              },
              {
                icon: "pin" as IconName,
                titulo: "Facultad de Ingeniería UADY",
                sub: "Sala de posgrado Dr. Oscar M. González Cuevas",
              },
              {
                icon: "ticket" as IconName,
                titulo: "$200 MXN",
                sub: "Por prototipo registrado",
              },
              {
                icon: "trophy" as IconName,
                titulo: "2 Categorías",
                sub: "Minisumo y Caminantes",
              },
            ].map((item) => (
              <Reveal key={item.titulo} delay={0}>
                <div className="flex flex-col items-center justify-center gap-2 px-2">
                  <span className="text-[#98002e]">
                    <Icon name={item.icon} />
                  </span>
                  <span className="text-lg font-bold leading-tight text-neutral-900 md:text-xl">
                    {item.titulo}
                  </span>
                  <span className="text-xs text-neutral-500 md:text-sm">
                    {item.sub}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Qué es */}
      <section className="border-b border-neutral-100 bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Reveal delay={0}>
              <h2 className="mb-4 bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                ¿Qué es la Batalla de Robots?
              </h2>
            </Reveal>
            <Reveal delay={0}>
              <p className="text-base font-medium leading-relaxed text-neutral-600 md:text-lg">
                Es la competencia anual de robótica de la Rama Estudiantil IEEE
                - UADY y la Sociedad de Robótica y Automatización - UADY. Un día
                completo de enfrentamientos directos donde estudiantes de todo
                el Campus de Ciencias Exactas e Ingenierías miden su diseño, su
                código y su sangre fría.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
            {[
              {
                titulo: "Adrenalina real",
                texto:
                  "Combates y carreras uno contra uno, con jueces en pista y decisiones en el momento. Un error de diseño se paga en segundos.",
                icon: "bolt" as IconName,
              },
              {
                titulo: "Aprende construyendo",
                texto:
                  "Mecanismos, sensores, control y estrategia. Pasas de la teoría a un prototipo funcional que compite de verdad.",
                icon: "ticket" as IconName,
              },
              {
                titulo: "Comunidad multidisciplinaria",
                texto:
                  "Equipos de Ingeniería, Matemáticas e Ingeniería Química pueden unirse y competir juntos.",
                icon: "trophy" as IconName,
              },
            ].map((item) => (
              <Reveal key={item.titulo} delay={0}>
                <Card className="group card-brand flex h-full flex-col bg-white ring-0 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-neutral-200 bg-neutral-100 text-neutral-400 transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-[#5f2167]/10 group-hover:to-[#98002e]/10 group-hover:text-[#98002e]">
                      <Icon name={item.icon} />
                    </div>
                    <CardTitle className="text-fluid-gradient text-xl font-bold">
                      {item.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm font-medium leading-relaxed text-neutral-600">
                      {item.texto}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section
        id="categorias"
        className="border-b border-neutral-100 bg-white py-16 md:py-24"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Reveal delay={0}>
              <h2 className="mb-4 bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                Elige tu campo de batalla
              </h2>
            </Reveal>
            <Reveal delay={0}>
              <p className="text-base font-medium leading-relaxed text-neutral-600 md:text-lg">
                Dos disciplinas opuestas: un robot que piensa solo o un robot
                que camina a tu mando. Puedes inscribirte en ambas.
              </p>
            </Reveal>
          </div>

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2">
            {CATEGORIAS.map((cat) => (
              <Reveal key={cat.id} delay={0}>
                <Card className="group card-brand flex h-full flex-col bg-white ring-0 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <span className="mb-3 inline-flex w-fit rounded-full bg-gradient-to-r from-[#5f2167] to-[#98002e] px-3 py-1 text-[11px] font-bold tracking-widest text-white">
                      {cat.etiqueta}
                    </span>
                    <CardTitle className="text-fluid-gradient text-3xl font-extrabold">
                      {cat.titulo}
                    </CardTitle>
                    <p className="mt-1 text-sm font-bold text-[#98002e]">
                      {cat.lema}
                    </p>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-6">
                    <p className="text-sm font-medium leading-relaxed text-neutral-600">
                      {cat.descripcion}
                    </p>

                    <ul className="space-y-2.5">
                      {cat.puntosClave.map((p) => (
                        <li
                          key={p}
                          className="flex gap-3 text-sm leading-relaxed text-neutral-600"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#5f2167] to-[#98002e]"></span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto rounded-xl border border-neutral-200 bg-slate-50 p-4 text-sm leading-relaxed text-neutral-600">
                      Revisa la convocatoria completa de la categoría para
                      conocer los detalles de la competencia, las reglas y los
                      requisitos de tu robot.
                    </div>
                  </CardContent>
                  <div className="mt-auto flex flex-col gap-3 p-6 pt-0 sm:flex-row">
                    <Link
                      href={REGISTRO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-gradient-to-r from-[#5f2167] to-[#98002e] px-6 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-[2px] hover:opacity-90 hover:shadow-lg"
                    >
                      Inscribir mi robot
                    </Link>
                    <a
                      href={cat.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative inline-flex h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-md border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100"></span>
                      <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                        Convocatoria Completa
                      </span>
                    </a>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Premios y motivos */}
      <section className="border-b border-neutral-100 bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Reveal delay={0}>
              <h2 className="mb-4 bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                ¿Por qué participar?
              </h2>
            </Reveal>
            <Reveal delay={0}>
              <p className="text-base font-medium leading-relaxed text-neutral-600 md:text-lg">
                Más que un trofeo: reconocimiento, experiencia y una credencial
                que habla por tu trabajo.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
            <Reveal delay={0}>
              <Card className="group card-brand flex h-full flex-col bg-white ring-0 transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <span className="mb-2 text-5xl font-extrabold text-neutral-200">
                    1.º
                  </span>
                  <CardTitle className="text-fluid-gradient text-xl font-bold">
                    Primer lugar
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-sm font-medium text-neutral-600">
                    Medalla, diploma y premio en especie para el equipo campeón
                    de la categoría.
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0}>
              <Card className="group card-brand flex h-full flex-col bg-white ring-0 transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <span className="mb-2 text-5xl font-extrabold text-neutral-200">
                    Top 3
                  </span>
                  <CardTitle className="text-fluid-gradient text-xl font-bold">
                    Diploma de finalista
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-sm font-medium text-neutral-600">
                    Primer, segundo y tercer lugar reciben diploma de
                    participación de la Rama Estudiantil IEEE - UADY y la
                    Sociedad de Robótica y Automatización - UADY.
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>
            <Reveal delay={0}>
              <Card className="group card-brand flex h-full flex-col bg-white ring-0 transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <span className="mb-2 text-5xl font-extrabold text-neutral-200">
                    +
                  </span>
                  <CardTitle className="text-fluid-gradient text-xl font-bold">
                    Acreditaciones y premios
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-sm font-medium text-neutral-600">
                    Los ganadores obtienen acreditaciones a próximas ediciones y
                    premios en especie que crecen con el número de robots
                    inscritos. Más equipos, mejores premios.
                  </CardDescription>
                </CardContent>
              </Card>
            </Reveal>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Experiencia práctica de diseño, construcción y programación",
              "Trabajo en equipo con estudiantes de otras facultades",
              "Contacto con la comunidad IEEE RAS UADY",
              "Un proyecto real para tu portafolio",
            ].map((t) => (
              <Reveal key={t} delay={0}>
                <div className="flex h-full items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4 text-sm font-medium text-neutral-700 shadow-sm">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#98002e]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>{t}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fechas clave */}
      <section
        id="fechas"
        className="border-b border-neutral-100 bg-white py-16 md:py-24"
      >
        <div className="container mx-auto max-w-4xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <Reveal delay={0}>
              <h2 className="mb-4 bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                Fechas clave
              </h2>
            </Reveal>
            <Reveal delay={0}>
              <p className="text-base font-medium text-neutral-600 md:text-lg">
                Marca tu calendario. El registro cierra un día antes del evento.
              </p>
            </Reveal>
          </div>

          <ol className="relative space-y-8 border-l-2 border-neutral-200 pl-8">
            {TIMELINE.map((item) => (
              <li key={item.titulo} className="relative">
                <Reveal delay={0}>
                  <span className="absolute -left-[41px] top-1 flex h-5 w-5 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-[#5f2167] to-[#98002e] shadow"></span>
                  <p className="text-xs font-bold tracking-widest text-[#98002e]">
                    {item.fecha}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-neutral-900">
                    {item.titulo}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {item.detalle}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Cómo inscribirse */}
      <section
        id="inscripcion"
        className="border-b border-neutral-100 bg-slate-50 py-16 md:py-24"
      >
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <Reveal delay={0}>
              <h2 className="mb-4 bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
                Inscríbete en cuatro pasos
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {PASOS.map((paso, idx) => (
              <Reveal key={paso.titulo} delay={0}>
                <Card className="group card-brand flex h-full flex-col bg-white ring-0 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#5f2167] to-[#98002e] text-lg font-extrabold text-white">
                      {idx + 1}
                    </span>
                    <CardTitle className="text-fluid-gradient text-lg font-bold">
                      {paso.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm font-medium leading-relaxed text-neutral-600">
                      {paso.texto}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <Reveal delay={0}>
              <h3 className="mb-6 text-center text-2xl font-bold tracking-tight text-neutral-900">
                Preguntas Frecuentes
              </h3>
            </Reveal>
            <div className="space-y-4 text-left">
              {FAQS.map((faq) => (
                <Reveal key={faq.q} delay={0}>
                  <details className="group overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-5 font-bold text-neutral-800 transition-colors hover:bg-slate-50">
                      <span>{faq.q}</span>
                      <span className="text-[#98002e] transition duration-300 group-open:-rotate-180">
                        <svg
                          fill="none"
                          height="24"
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
                    <div className="mt-2 border-t border-neutral-100 bg-slate-50/50 p-5 pt-4 text-sm leading-relaxed text-neutral-600">
                      {faq.a}
                    </div>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#98002e] to-[#5f2167] py-20 md:py-28">
        <div className="absolute inset-0 z-0 bg-black/10 mix-blend-overlay"></div>
        <div className="pointer-events-none absolute inset-0 z-0 bg-white/5 backdrop-blur-[4px]"></div>
        <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center text-white md:px-8">
          <Reveal delay={0}>
            <h2 className="mb-5 text-3xl font-extrabold leading-tight tracking-tight drop-shadow-md md:text-5xl">
              El dojo y la pista te esperan
            </h2>
          </Reveal>
          <Reveal delay={0}>
            <p className="mx-auto mb-8 max-w-2xl text-base font-light leading-relaxed text-white/90 md:text-xl">
              Las inscripciones cierran el 24 de noviembre a las 23:59 h. No
              dejes tu robot en el taller: llévalo a competir.
            </p>
          </Reveal>
          <Reveal delay={0}>
            <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={REGISTRO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md bg-white px-10 text-sm font-bold text-[#5f2167] shadow-sm transition-all duration-300 hover:scale-105 hover:bg-neutral-100 sm:w-auto"
              >
                Inscríbete Ahora
              </Link>
              <a
                href={PDF_MINISUMO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-white/30 bg-black/20 px-8 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:w-auto"
              >
                Convocatoria Minisumo (PDF)
              </a>
              <a
                href={PDF_CAMINANTES}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-md border border-white/30 bg-black/20 px-8 text-sm font-medium text-white shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-white/50 hover:bg-white/20 sm:w-auto"
              >
                Convocatoria Caminantes (PDF)
              </a>
            </div>
          </Reveal>
          <Reveal delay={0}>
            <p className="text-sm text-white/80">
              ¿Dudas? Escríbenos por{" "}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-4 hover:text-white"
              >
                Instagram
              </a>{" "}
              o por{" "}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline underline-offset-4 hover:text-white"
              >
                WhatsApp
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
