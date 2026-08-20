//src/app/enlaces/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Enlaces | IEEE RAS UADY",
  description:
    "Todos los enlaces oficiales del Capítulo Estudiantil IEEE RAS UADY en un solo lugar.",
};

interface EnlaceItem {
  icono: string;
  etiqueta: string;
  descripcion: string;
  href: string;
  externo?: boolean;
}

const grupoEmpresas: EnlaceItem[] = [
  {
    icono: "icon-envelope",
    etiqueta: "Contacto y alianzas",
    descripcion: "Patrocinios, colaboraciones y vínculos profesionales",
    href: "/contacto",
  },
  {
    icono: "icon-id",
    etiqueta: "Membresía IEEE-RAS",
    descripcion: "Beneficios, becas y certificación internacional",
    href: "/membresia",
  },
];

const grupoEstudiantes: EnlaceItem[] = [
  {
    icono: "icon-whatsapp-brands-solid-full",
    etiqueta: "Únete a la comunidad",
    descripcion: "Recibe invitaciones a eventos por WhatsApp",
    href: "https://chat.whatsapp.com/IHxdv3anQp46EeUKX2WuW1",
    externo: true,
  },
  {
    icono: "icon-user-plus",
    etiqueta: "Regístrate como miembro formal",
    descripcion: "Sé de los primeros en ser considerado como staff",
    href: "https://docs.google.com/forms/d/e/1FAIpQLSeTNdu4XW6zMsYH5QNHUW7Iwf5jtVzBBgGNqLzheyNjqEr6CA/viewform?usp=header",
    externo: true,
  },
];

const grupoProyectos: EnlaceItem[] = [
  {
    icono: "icon-github",
    etiqueta: "GitHub",
    descripcion: "Código abierto y proyectos del capítulo",
    href: "https://github.com/RAS-UADY-Lab",
    externo: true,
  },
  {
    icono: "icon-nodum-logo",
    etiqueta: "Nodum App",
    descripcion: "Nuestra herramienta digital para la comunidad",
    href: "/nodum",
    externo: true,
  },
];

const enlacesInstitucionales: EnlaceItem[] = [
  {
    icono: "icon-IEEE",
    etiqueta: "IEEE",
    descripcion: "",
    href: "https://www.ieee.org",
    externo: true,
  },
  {
    icono: "icon-RAS",
    etiqueta: "RAS",
    descripcion: "",
    href: "https://www.ieee-ras.org",
    externo: true,
  },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-bold tracking-widest text-neutral-400 lg:text-left">
      {children}
    </p>
  );
}

function LinkCard({ item }: { item: EnlaceItem }) {
  const externProps = item.externo
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Link
      href={item.href}
      {...externProps}
      className="group/btn relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-neutral-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f2167]/40 cursor-pointer"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />

      <i
        className={`${item.icono} relative z-10 shrink-0 text-2xl text-neutral-400 transition-colors duration-300 group-hover/btn:text-white`}
      />

      <span className="relative z-10 min-w-0 flex-1 text-left">
        <span className="block text-sm font-bold leading-tight text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
          {item.etiqueta}
        </span>
        {item.descripcion && (
          <span className="mt-0.5 block text-xs leading-snug text-neutral-500 transition-colors duration-300 group-hover/btn:text-white/70">
            {item.descripcion}
          </span>
        )}
      </span>

      <i className="icon-arrow-right relative z-10 shrink-0 text-neutral-300 transition-colors duration-300 group-hover/btn:text-white" />
    </Link>
  );
}

export default function EnlacesPage() {
  return (
    <div className="mt-20 min-h-screen w-full bg-slate-50 lg:flex">
      {/* PANEL DE IDENTIDAD: apilado en móvil, fijo a la izquierda en escritorio/tablet */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#98002e] to-[#5f2167] pb-24 pt-16 shadow-sm shadow-neutral-900/20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-end lg:pb-16 lg:pt-16">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-20 lg:left-1/3 lg:top-1/3 lg:h-[640px] lg:w-[640px]">
          <div className="h-full w-full animate-spin-slow">
            <svg viewBox="0 0 200 200" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <g stroke="#ffffff" strokeWidth="0.5" fill="none">
                <circle cx="100" cy="100" r="90" strokeDasharray="2 4" strokeWidth="0.8" />
                <ellipse cx="100" cy="100" rx="90" ry="30" />
                <ellipse cx="100" cy="100" rx="90" ry="60" />
                <ellipse cx="100" cy="100" rx="30" ry="90" />
                <ellipse cx="100" cy="100" rx="60" ry="90" />
                <circle cx="100" cy="10" r="3" fill="#ffffff" />
                <circle cx="100" cy="190" r="3" fill="#ffffff" />
                <circle cx="10" cy="100" r="3" fill="#ffffff" />
                <circle cx="190" cy="100" r="3" fill="#ffffff" />
              </g>
            </svg>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex max-w-md flex-col items-center px-6 text-center text-white lg:mx-0 lg:max-w-none lg:items-start lg:px-12 lg:text-left">
          <Image
            src="/IMG/Logos/LogoRASTagline.svg"
            alt="Logo de la RAS-UADY"
            width={220}
            height={62}
            priority
            className="mb-6 brightness-0 invert drop-shadow-md lg:w-[260px] lg:h-auto"
          />
          <p className="text-xs font-bold tracking-widest text-white/70">
            Capítulo Estudiantil IEEE-RAS
          </p>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight drop-shadow-sm lg:text-3xl">
            Sociedad de Robótica y Automatización
          </h1>
          <p className="mt-2 text-sm text-white/80">
            Facultad de Ingeniería, UADY
          </p>

          <div className="mt-8 hidden items-center gap-6 lg:flex">
            <a
              href="https://www.facebook.com/RAS.UADY"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-2xl text-white/70 transition-colors duration-300 hover:text-white cursor-pointer"
            >
              <i className="icon-facebook" />
            </a>
            <a
              href="https://www.instagram.com/ras.uady/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-2xl text-white/70 transition-colors duration-300 hover:text-white cursor-pointer"
            >
              <i className="icon-instagram" />
            </a>
          </div>
        </div>
      </section>

      {/* PANEL DE ENLACES: hoja apilada en móvil, columna ancha en escritorio/tablet */}
      <div className="relative z-10 mx-auto -mt-10 max-w-md rounded-t-[2rem] bg-white px-6 pb-16 pt-10 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] sm:px-8 lg:mx-0 lg:mt-0 lg:w-[58%] lg:max-w-none lg:rounded-none lg:px-14 lg:py-16 lg:shadow-none">
        <Eyebrow>Empieza aquí</Eyebrow>
        <Link
          href="/"
          className="group/btn relative mb-10 flex w-full items-center gap-4 overflow-hidden rounded-xl bg-gradient-to-r from-[#5f2167] to-[#98002e] px-5 py-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f2167]/40 cursor-pointer"
        >
          <i className="icon-home shrink-0 text-2xl text-white" />
          <span className="min-w-0 flex-1 text-left">
            <span className="block text-base font-bold text-white">Visitar el sitio oficial</span>
            <span className="mt-0.5 block text-xs text-white/70">
              Actividades, proyectos y todo sobre el capítulo
            </span>
          </span>
          <i className="icon-arrow-right shrink-0 text-white transition-transform duration-300 group-hover/btn:translate-x-1" />
        </Link>

        <div className="border-t border-neutral-100 pt-8">
          <Eyebrow>Para empresas y patrocinadores</Eyebrow>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
            {grupoEmpresas.map((item) => (
              <LinkCard key={item.etiqueta} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-8">
          <Eyebrow>Únete como estudiante</Eyebrow>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
            {grupoEstudiantes.map((item) => (
              <LinkCard key={item.etiqueta} item={item} />
            ))}
          </div>
        </div>

        <div className="mt-8 border-t border-neutral-100 pt-8">
          <Eyebrow>Proyectos</Eyebrow>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-2 lg:gap-4">
            {grupoProyectos.map((item) => (
              <LinkCard key={item.etiqueta} item={item} />
            ))}
          </div>
        </div>

        {/* Redes e institucional: visibles en móvil; en escritorio viven en el panel izquierdo */}
        <div className="mt-10 flex items-center justify-center gap-6 border-t border-neutral-100 pt-8 lg:hidden">
          <a
            href="https://www.facebook.com/RAS.UADY"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-2xl text-neutral-400 transition-colors duration-300 hover:text-[#98002e] cursor-pointer"
          >
            <i className="icon-facebook" />
          </a>
          <a
            href="https://www.instagram.com/ras.uady/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-2xl text-neutral-400 transition-colors duration-300 hover:text-[#98002e] cursor-pointer"
          >
            <i className="icon-instagram" />
          </a>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3 text-xs font-medium text-neutral-400 lg:justify-start">
          {enlacesInstitucionales.map((item, idx) => (
            <span key={item.etiqueta} className="flex items-center gap-3">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fluid-gradient cursor-pointer"
              >
                Sitio {item.etiqueta}
              </a>
              {idx < enlacesInstitucionales.length - 1 && (
                <span className="text-neutral-300">·</span>
              )}
            </span>
          ))}
        </div>

        <p className="mt-10 text-center text-[11px] text-neutral-400 lg:text-left">
          &copy; {new Date().getFullYear()} IEEE RAS UADY
        </p>
      </div>
    </div>
  );
}