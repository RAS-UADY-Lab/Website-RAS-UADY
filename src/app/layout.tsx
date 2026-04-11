import type { Metadata } from "next";
import { Montserrat } from "next/font/google"; // Cambio a Montserrat
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

// Configuración de Montserrat: Profesional y moderna
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"], // Pesos optimizados para jerarquía visual
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "IEEE RAS UADY | Capítulo Estudiantil",
  description:
    "Sitio oficial de la Sociedad de Robótica y Automatización en la Facultad de Ingeniería de la UADY.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${montserrat.className} min-h-screen flex flex-col bg-slate-50`}
      >
        {/* BARRA DE NAVEGACIÓN (ISLA FLOTANTE) */}
        <header className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl rounded-2xl border border-neutral-200/60 bg-white/85 backdrop-blur-md shadow-sm shadow-neutral-900/5 transition-all">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <Link href="/" className="flex items-center">
              <Image
                src="/IMG/Logos/LogoRASTagline.svg"
                alt="Logo de la RAS-UADY"
                width={160}
                height={45}
                priority
              />
            </Link>

            <nav className="hidden md:flex gap-8">
              <Link
                href="/"
                className="text-sm font-medium nav-link-fluid cursor-pointer"
              >
                Inicio
              </Link>
              <Link
                href="/nosotros"
                className="text-sm font-medium nav-link-fluid cursor-pointer"
              >
                Nosotros
              </Link>
              <Link
                href="/actividades"
                className="text-sm font-medium nav-link-fluid cursor-pointer"
              >
                Actividades
              </Link>
              <Link
                href="/proyectos"
                className="text-sm font-medium nav-link-fluid cursor-pointer"
              >
                Proyectos
              </Link>
              <Link
                href="/membresia"
                className="text-sm font-medium nav-link-fluid cursor-pointer"
              >
                Membresía
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {/* Botón Destacado: Nodum App */}
              <Link
                href="https://mynodum.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex h-9 items-center justify-center rounded-md border border-neutral-200 bg-slate-50 px-4 py-2 text-sm font-bold shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:border-neutral-300 cursor-pointer group relative"
              >
                <i className="icon-Laptop mr-2 text-neutral-500 group-hover:text-[#5f2167] transition-colors"></i>
                <span className="text-neutral-700 group-hover:bg-gradient-to-r group-hover:from-[#5f2167] group-hover:to-[#98002e] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                  Nodum
                </span>
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#98002e] opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#98002e]"></span>
                </span>
              </Link>

              <Link
                href="/contacto"
                className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-[#5f2167] to-[#98002e] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md hover:opacity-90 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 cursor-pointer ml-1"
              >
                <i className="icon-trato mr-2 text-lg"></i> Unirme
              </Link>

              <button className="md:hidden flex items-center justify-center h-10 w-10 rounded-md border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer ml-1">
                <i className="icon-MenuHam text-neutral-900 text-xl"></i>
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 -mt-20">{children}</main>

        <footer className="relative border-t border-neutral-900 bg-gradient-to-br from-[#98002e] to-[#5f2167] overflow-hidden mt-12">
          <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>
          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-20 pb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-16">
              <div className="flex flex-wrap items-center gap-6 md:gap-8">
                <Image
                  src="/IMG/Logos/LogoRAS.svg"
                  alt="Logo de la RAS"
                  width={90}
                  height={45}
                  className="object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 drop-shadow-md"
                />
                <div className="hidden sm:block h-10 w-px bg-white/20"></div>
                <Image
                  src="/IMG/Logos/LogoIEEE.svg"
                  alt="Logo de IEEE"
                  width={100}
                  height={35}
                  className="object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 drop-shadow-md"
                />
                <div className="hidden sm:block h-10 w-px bg-white/20"></div>
                <Image
                  src="/IMG/Logos/LogoTagStudentBranch.svg"
                  alt="Tag de la rama estudiantil IEEE"
                  width={140}
                  height={40}
                  className="object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 drop-shadow-md"
                />
              </div>
              <div className="flex items-center gap-6">
                <a
                  href="https://www.facebook.com/RAS.UADY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                >
                  <i className="icon-Facebook2 text-2xl drop-shadow-sm"></i>
                </a>
                <a
                  href="https://www.instagram.com/ras.uady/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                >
                  <i className="icon-Instagram1 text-2xl drop-shadow-sm"></i>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16 mb-16">
              <div className="md:col-span-6 lg:col-span-5">
                <h4 className="text-white font-semibold text-lg mb-4 tracking-tight">
                  Capítulo Estudiantil IEEE-RAS
                </h4>
                <p className="text-white/60 text-sm leading-relaxed max-w-md">
                  Facultad de Ingeniería, Universidad Autónoma de Yucatán
                  (UADY).
                  <br />
                  Dedicados a impulsar la innovación, la divulgación y el
                  desarrollo tecnológico en robótica y automatización.
                </p>
              </div>
              <div className="md:col-span-3 lg:col-span-3 lg:col-start-8">
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs opacity-90">
                  Explorar
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block w-fit"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/nosotros"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block w-fit"
                    >
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/actividades"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block w-fit"
                    >
                      Actividades
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/proyectos"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block w-fit"
                    >
                      Proyectos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/nodum"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer flex items-center gap-2 w-fit"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60"></span>{" "}
                      Nodum App
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="md:col-span-3 lg:col-span-2">
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs opacity-90">
                  Participa
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/membresia"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block w-fit"
                    >
                      Membresía
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contacto"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block w-fit"
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-8 border-t border-white/10">
              <p className="text-xs text-white/40 leading-relaxed max-w-5xl">
                Sitio gestionado por el Capítulo Estudiantil IEEE-RAS de la
                Facultad de Ingeniería, UADY. IEEE y RAS son marcas registradas
                usadas con autorización. Este sitio no representa oficialmente a
                IEEE ni a la UADY.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 mt-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                  <span>&copy; {new Date().getFullYear()} IEEE RAS UADY.</span>
                  <span className="hidden md:inline text-white/20">|</span>
                  <Link
                    href="/AvisosLegales"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Avisos Legales
                  </Link>
                </div>
                <span className="text-center md:text-right">
                  Desarrollado por{" "}
                  <a
                    href="https://edward5126.github.io/Portafolio-E-nnovaDesign/#Inicio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white hover:text-white/90 transition-colors cursor-pointer"
                  >
                    E-nnova Design
                  </a>
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
