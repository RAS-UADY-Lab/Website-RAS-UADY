//src/app/enlaces/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Enlaces | IEEE RAS UADY",
  description:
    "Todos los enlaces oficiales del Capítulo Estudiantil IEEE RAS UADY en un solo lugar.",
};

interface EnlaceItem {
  icono?: string;
  etiqueta: string;
  descripcion?: string;
  href: string;
  externo?: boolean;
}

interface CategoriaEnlaces {
  id: string;
  icono: string;
  titulo: string;
  resumen: string;
  abiertaPorDefecto?: boolean;
  items: EnlaceItem[];
}

const URL_WHATSAPP = "https://chat.whatsapp.com/IHxdv3anQp46EeUKX2WuW1";
const URL_REGISTRO_STAFF =
  "https://docs.google.com/forms/d/e/1FAIpQLSeTNdu4XW6zMsYH5QNHUW7Iwf5jtVzBBgGNqLzheyNjqEr6CA/viewform?usp=header";
const URL_FACEBOOK = "https://www.facebook.com/RAS.UADY";
const URL_INSTAGRAM = "https://www.instagram.com/ras.uady/";

const categorias: CategoriaEnlaces[] = [
  {
    id: "comunidad",
    icono: "icon-user-plus",
    titulo: "Comunidad y membresía",
    resumen: "Súmate al capítulo y conoce los beneficios IEEE",
    abiertaPorDefecto: true,
    items: [
      {
        icono: "icon-user-plus",
        etiqueta: "Regístrate como miembro formal",
        descripcion: "Sé de los primeros en ser considerado para el staff",
        href: URL_REGISTRO_STAFF,
        externo: true,
      },
      {
        icono: "icon-id",
        etiqueta: "Membresía IEEE-RAS",
        descripcion: "Beneficios, becas y certificación internacional",
        href: "/membresia",
      },
    ],
  },
  {
    id: "tecnologia",
    icono: "icon-gear",
    titulo: "Tecnología y proyectos",
    resumen: "Software propio, código abierto y prototipos",
    items: [
      {
        icono: "icon-nodum-logo",
        etiqueta: "Nodum App",
        descripcion: "Nuestra herramienta digital para la comunidad",
        href: "/nodum",
      },
      {
        icono: "icon-github",
        etiqueta: "GitHub",
        descripcion: "Código abierto y proyectos del capítulo",
        href: "https://github.com/RAS-UADY-Lab",
        externo: true,
      },
      {
        etiqueta: "Proyectos",
        descripcion: "Desarrollos y prototipos de robótica y automatización",
        href: "/proyectos",
      },
    ],
  },
  {
    id: "capitulo",
    icono: "icon-home",
    titulo: "Actividades y capítulo",
    resumen: "Talleres, eventos y quiénes somos",
    items: [
      {
        etiqueta: "Actividades",
        descripcion: "Talleres, conferencias y competencias del capítulo",
        href: "/actividades",
      },
      {
        etiqueta: "Nosotros",
        descripcion: "Misión, equipo y trayectoria del capítulo",
        href: "/nosotros",
      },
    ],
  },
  {
    id: "alianzas",
    icono: "icon-handshake-solid-full",
    titulo: "Alianzas y patrocinio",
    resumen: "Para empresas, patrocinadores e instituciones",
    items: [
      {
        icono: "icon-envelope",
        etiqueta: "Contacto y alianzas",
        descripcion: "Patrocinios, colaboraciones y vínculos profesionales",
        href: "/contacto",
      },
    ],
  },
];

const enlacesInstitucionales: EnlaceItem[] = [
  { etiqueta: "Sitio IEEE", href: "https://www.ieee.org", externo: true },
  { etiqueta: "Sitio RAS", href: "https://www.ieee-ras.org", externo: true },
  { etiqueta: "Avisos legales", href: "/AvisosLegales" },
];

/**
 * Atributos de apertura segura para enlaces externos.
 */
function propsExternos(externo?: boolean) {
  return externo ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Reveal delay={0}>
      <p className="mb-4 text-xs font-bold tracking-widest text-neutral-400 lg:text-left">
        {children}
      </p>
    </Reveal>
  );
}

function LinkCard({ item }: { item: EnlaceItem }) {
  return (
    <Link
      href={item.href}
      {...propsExternos(item.externo)}
      className="group/btn relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-neutral-200 bg-white px-4 py-3.5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f2167]/40 cursor-pointer"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />

      {item.icono && (
        <i
          aria-hidden="true"
          className={`${item.icono} relative z-10 shrink-0 text-xl text-neutral-400 transition-colors duration-300 group-hover/btn:text-white`}
        />
      )}

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

      <i
        aria-hidden="true"
        className="icon-arrow-right relative z-10 shrink-0 text-neutral-300 transition-colors duration-300 group-hover/btn:text-white"
      />
    </Link>
  );
}

/**
 * Categoría colapsable basada en <details>: accesible por teclado y sin JavaScript en cliente.
 */
function CategoriaAcordeon({ categoria }: { categoria: CategoriaEnlaces }) {
  return (
    <Reveal delay={0}>
      <details
        open={categoria.abiertaPorDefecto}
        className="group overflow-hidden rounded-2xl border border-neutral-200 bg-slate-50/60 transition-colors duration-300 open:bg-white open:shadow-sm"
      >
        <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5f2167]/40 [&::-webkit-details-marker]:hidden">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#5f2167] to-[#98002e] text-white shadow-sm">
            <i aria-hidden="true" className={`${categoria.icono} text-lg`} />
          </span>
          <span className="min-w-0 flex-1 text-left">
            <span className="block text-sm font-bold leading-tight text-neutral-900">
              {categoria.titulo}
            </span>
            <span className="mt-0.5 block text-xs leading-snug text-neutral-500">
              {categoria.resumen}
            </span>
          </span>
          <svg
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-300 group-open:rotate-90"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </summary>

        <div className="flex flex-col gap-3 border-t border-neutral-100 p-4">
          {categoria.items.map((item) => (
            <LinkCard key={item.etiqueta} item={item} />
          ))}
        </div>
      </details>
    </Reveal>
  );
}

function RedesSociales({ variante }: { variante: "claro" | "oscuro" }) {
  const estilo =
    variante === "oscuro"
      ? "text-white/70 hover:text-white"
      : "text-neutral-400 hover:text-[#98002e]";

  return (
    <>
      <a
        href={URL_FACEBOOK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook de RAS UADY"
        className={`text-2xl transition-colors duration-300 cursor-pointer ${estilo}`}
      >
        <i aria-hidden="true" className="icon-facebook" />
      </a>
      <a
        href={URL_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram de RAS UADY"
        className={`text-2xl transition-colors duration-300 cursor-pointer ${estilo}`}
      >
        <i aria-hidden="true" className="icon-instagram" />
      </a>
    </>
  );
}

export default function EnlacesPage() {
  return (
    <div className="mt-20 min-h-screen w-full bg-slate-50 lg:flex">
      {/* Panel de identidad: apilado en móvil, fijo a la izquierda en escritorio */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#98002e] to-[#5f2167] pb-24 pt-16 shadow-sm shadow-neutral-900/20 lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[42%] lg:flex-col lg:justify-end lg:pb-16 lg:pt-16">
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 opacity-20 lg:left-1/3 lg:top-1/3 lg:h-[640px] lg:w-[640px]"
        >
          <div className="h-full w-full animate-spin-slow">
            <svg
              viewBox="0 0 200 200"
              className="h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g stroke="#ffffff" strokeWidth="0.5" fill="none">
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
            className="mb-6 brightness-0 invert drop-shadow-md lg:h-auto lg:w-[260px]"
          />
          <Reveal delay={0}>
            <p className="text-xs font-bold tracking-widest text-white/70">
              Capítulo Estudiantil IEEE-RAS
            </p>
          </Reveal>
          <Reveal delay={0}>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight drop-shadow-sm lg:text-3xl">
              Sociedad de Robótica y Automatización
            </h1>
          </Reveal>
          <Reveal delay={0}>
            <p className="mt-2 text-sm text-white/80">
              Facultad de Ingeniería, UADY
            </p>
          </Reveal>
          <Reveal delay={0}>
            <p className="mt-4 text-sm leading-relaxed text-white/70 lg:max-w-sm">
              Impulsando la innovación, la robótica y la automatización desde
              Yucatán.
            </p>
          </Reveal>

          <Reveal delay={0}>
            <div className="mt-8 hidden items-center gap-6 lg:flex">
              <RedesSociales variante="oscuro" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Panel de enlaces: hoja apilada en móvil, columna ancha en escritorio */}
      <div className="relative z-10 mx-auto -mt-10 max-w-md rounded-t-[2rem] bg-white px-6 pb-16 pt-10 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] sm:px-8 lg:mx-0 lg:mt-0 lg:w-[58%] lg:max-w-none lg:rounded-none lg:px-14 lg:py-16 lg:shadow-none">
        {/* Nivel 1: zona de conversión primaria, máximo dos acciones */}
        <Eyebrow>Empieza aquí</Eyebrow>

        <div className="mb-10 flex flex-col gap-3">
          <Reveal delay={0}>
            <Link
              href="/CABR"
              className="group/btn relative flex w-full items-center gap-4 overflow-hidden rounded-xl bg-gradient-to-r from-[#5f2167] to-[#98002e] px-5 py-5 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f2167]/40 cursor-pointer"
            >
              <i
                aria-hidden="true"
                className="icon-gear shrink-0 text-2xl text-white"
              />
              <span className="min-w-0 flex-1 text-left">
                <span className="mb-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-bold text-white">
                  Evento destacado
                </span>
                <span className="block text-base font-bold leading-tight text-white">
                  2do Concurso Anual de Batalla de Robots
                </span>
                <span className="mt-0.5 block text-xs text-white/70">
                  Minisumo autónomo y Carrera de Caminantes
                </span>
              </span>
              <i
                aria-hidden="true"
                className="icon-arrow-right shrink-0 text-white transition-transform duration-300 group-hover/btn:translate-x-1"
              />
            </Link>
          </Reveal>

          <Reveal delay={0}>
            <a
              href={URL_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn relative flex w-full items-center gap-4 overflow-hidden rounded-xl border border-[#5f2167]/30 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f2167]/40 cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
              <i
                aria-hidden="true"
                className="icon-whatsapp-brands-solid-full relative z-10 shrink-0 text-2xl text-[#5f2167] transition-colors duration-300 group-hover/btn:text-white"
              />
              <span className="relative z-10 min-w-0 flex-1 text-left">
                <span className="block text-sm font-bold leading-tight text-neutral-900 transition-colors duration-300 group-hover/btn:text-white">
                  Únete a la comunidad
                </span>
                <span className="mt-0.5 block text-xs text-neutral-500 transition-colors duration-300 group-hover/btn:text-white/70">
                  Recibe invitaciones a eventos por WhatsApp
                </span>
              </span>
              <i
                aria-hidden="true"
                className="icon-arrow-right relative z-10 shrink-0 text-neutral-300 transition-colors duration-300 group-hover/btn:text-white"
              />
            </a>
          </Reveal>
        </div>

        {/* Nivel 2: exploración por categorías colapsables */}
        <div className="border-t border-neutral-100 pt-8">
          <Eyebrow>Explora el capítulo</Eyebrow>
          <div className="flex flex-col gap-3">
            {categorias.map((categoria) => (
              <CategoriaAcordeon key={categoria.id} categoria={categoria} />
            ))}
          </div>
        </div>

        <Reveal delay={0}>
          <Link
            href="/"
            className="group/btn mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-slate-50 px-5 py-3.5 text-sm font-bold text-neutral-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5f2167]/40 cursor-pointer"
          >
            <i
              aria-hidden="true"
              className="icon-home text-lg text-neutral-500"
            />
            <span className="text-fluid-gradient">
              Visitar el sitio oficial
            </span>
          </Link>
        </Reveal>

        {/* Nivel 4: redes visibles solo en móvil; en escritorio viven en el panel izquierdo */}
        <Reveal delay={0}>
          <div className="mt-10 flex items-center justify-center gap-6 border-t border-neutral-100 pt-8 lg:hidden">
            <RedesSociales variante="claro" />
          </div>
        </Reveal>

        {/* Nivel 3: matrices globales y marco legal */}
        <Reveal delay={0}>
          <nav
            aria-label="Enlaces institucionales y legales"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-xs font-medium text-neutral-400 lg:justify-start"
          >
            {enlacesInstitucionales.map((item, idx) => (
              <span key={item.etiqueta} className="flex items-center gap-3">
                {item.externo ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-fluid-gradient cursor-pointer"
                  >
                    {item.etiqueta}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-fluid-gradient cursor-pointer"
                  >
                    {item.etiqueta}
                  </Link>
                )}
                {idx < enlacesInstitucionales.length - 1 && (
                  <span aria-hidden="true" className="text-neutral-300">
                    ·
                  </span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>

        <Reveal delay={0}>
          <p className="mt-10 text-center text-[11px] leading-relaxed text-neutral-400 lg:text-left">
            Sitio gestionado por estudiantes. No representa oficialmente a IEEE
            ni a la UADY.
            <br />
            &copy; {new Date().getFullYear()} IEEE RAS UADY
          </p>
        </Reveal>
      </div>
    </div>
  );
}
