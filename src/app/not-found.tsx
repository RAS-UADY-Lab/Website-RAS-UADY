//src/app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Página no encontrada | IEEE RAS UADY",
  description: "La página que buscas no existe o fue movida.",
};

interface AtajoItem {
  etiqueta: string;
  descripcion: string;
  href: string;
}

const atajos: AtajoItem[] = [
  {
    etiqueta: "Actividades",
    descripcion: "Talleres, conferencias y competencias",
    href: "/actividades",
  },
  {
    etiqueta: "Proyectos",
    descripcion: "Prototipos y desarrollos del capítulo",
    href: "/proyectos",
  },
  {
    etiqueta: "Membresía",
    descripcion: "Beneficios y cómo unirte a IEEE-RAS",
    href: "/membresia",
  },
  {
    etiqueta: "Contacto",
    descripcion: "Alianzas, patrocinios y dudas",
    href: "/contacto",
  },
];

export default function NotFound() {
  return (
    <section className="relative mt-20 flex min-h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden bg-slate-50 px-6 py-24">
      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <Reveal delay={0}>
          <p className="text-xs font-bold tracking-widest text-neutral-400">
            Error
          </p>
        </Reveal>

        <Reveal delay={0}>
          <h1 className="text-fluid-gradient mt-2 text-8xl font-extrabold leading-none sm:text-9xl">
            404
          </h1>
        </Reveal>

        <Reveal delay={0}>
          <h2 className="mt-6 text-2xl font-extrabold leading-tight text-neutral-900 sm:text-3xl">
            Este componente no está en nuestro circuito
          </h2>
        </Reveal>

        <Reveal delay={0}>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
            La página que buscas no existe, cambió de dirección o el enlace está
            incompleto. Puedes regresar al inicio o explorar alguna de las
            secciones principales.
          </p>
        </Reveal>

        <Reveal delay={0}>
          <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/"
              className="group/btn inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#5f2167] to-[#98002e] px-6 text-sm font-bold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f2167]/40 cursor-pointer"
            >
              <i aria-hidden="true" className="icon-home mr-2 text-lg" />
              Volver al inicio
            </Link>
            <Link
              href="/enlaces"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 text-sm font-bold text-neutral-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f2167]/40 cursor-pointer"
            >
              Ver todos los enlaces
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
