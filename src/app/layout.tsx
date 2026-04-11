import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar"; // Importamos el nuevo cliente

// Configuración de Montserrat: Profesional y moderna
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ras-uady.ras-fiuady.workers.dev"),
  title: "IEEE RAS UADY | Capítulo Estudiantil",
  description:
    "Sitio oficial de la Sociedad de Robótica y Automatización en la Facultad de Ingeniería de la UADY.",
  icons: {
    icon: "/IMG/favicon.svg",
    apple: "/IMG/favicon.svg",
  },
  openGraph: {
    title: "IEEE RAS UADY | Capítulo Estudiantil",
    description:
      "Impulsando la innovación, la divulgación y el desarrollo tecnológico en robótica y automatización.",
    url: "https://ras-uady.ras-fiuady.workers.dev/",
    siteName: "IEEE RAS UADY",
    images: [
      {
        url: "/IMG/EVENTS/Default.jpg",
        width: 1200,
        height: 630,
        alt: "Logo IEEE RAS UADY",
      },
    ],
    locale: "es_MX",
    type: "website",
  },
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
        {/* COMPONENTE DE NAVEGACIÓN (Cliente) */}
        <Navbar />

        {/* CONTENIDO PRINCIPAL */}
        <main className="flex-1 -mt-20">{children}</main>

        {/* FOOTER CORPORATIVO PREMIUM */}
        <footer className="relative border-t border-neutral-900 bg-gradient-to-br from-[#98002e] to-[#5f2167] overflow-hidden mt-12">
          <div className="absolute inset-0 bg-black/5 mix-blend-overlay"></div>

          <div className="container relative z-10 mx-auto max-w-7xl px-4 md:px-8 pt-20 pb-12">
            {/* Franja Superior: Logos y Redes */}
            <div className="flex flex-col lg:flex-row justify-between items-center gap-10 mb-16">
              {/* Logos centrados en móvil, alineados a la izquierda en desktop */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 sm:gap-6">
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

              {/* Redes centradas en móvil, alineadas a la derecha en desktop */}
              <div className="flex items-center justify-center lg:justify-end gap-8">
                <a
                  href="https://www.facebook.com/RAS.UADY"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                >
                  <i className="icon-Facebook2 text-3xl md:text-2xl drop-shadow-sm"></i>
                </a>
                <a
                  href="https://www.instagram.com/ras.uady/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 cursor-pointer"
                >
                  <i className="icon-Instagram1 text-3xl md:text-2xl drop-shadow-sm"></i>
                </a>
              </div>
            </div>

            {/* Franja Media: Información y Enlaces (Ajuste de alineación Responsiva) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 border-t border-white/10 pt-16 mb-16 text-center md:text-left">
              <div className="md:col-span-6 lg:col-span-5 flex flex-col items-center md:items-start">
                <h4 className="text-white font-semibold text-lg mb-4 tracking-tight">
                  Capítulo Estudiantil IEEE-RAS
                </h4>
                <p className="text-white/60 text-sm leading-relaxed max-w-md">
                  Facultad de Ingeniería, Universidad Autónoma de Yucatán
                  (UADY).
                  <br />
                  <br />
                  Dedicados a impulsar la innovación, la divulgación y el
                  desarrollo tecnológico en robótica y automatización.
                </p>
              </div>

              <div className="md:col-span-3 lg:col-span-3 lg:col-start-8 flex flex-col items-center md:items-start">
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs opacity-90">
                  Explorar
                </h4>
                <ul className="space-y-4 flex flex-col items-center md:items-start w-full">
                  <li>
                    <Link
                      href="/"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block"
                    >
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/nosotros"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block"
                    >
                      Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/actividades"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block"
                    >
                      Actividades
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/proyectos"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block"
                    >
                      Proyectos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/nodum"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer flex items-center justify-center md:justify-start gap-2"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/60"></span>{" "}
                      Nodum App
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="md:col-span-3 lg:col-span-2 flex flex-col items-center md:items-start">
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs opacity-90">
                  Participa
                </h4>
                <ul className="space-y-4 flex flex-col items-center md:items-start w-full">
                  <li>
                    <Link
                      href="/membresia"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block"
                    >
                      Membresía
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contacto"
                      className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 cursor-pointer block"
                    >
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Franja Inferior: Legal y Copyright */}
            <div className="flex flex-col gap-6 pt-8 border-t border-white/10 text-center md:text-left">
              <p className="text-xs text-white/40 leading-relaxed max-w-5xl mx-auto md:mx-0">
                Sitio gestionado por el Capítulo Estudiantil IEEE-RAS de la
                Facultad de Ingeniería, UADY. IEEE y RAS son marcas registradas
                usadas con autorización. Este sitio no representa oficialmente a
                IEEE ni a la UADY.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/60 mt-2">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <span>&copy; {new Date().getFullYear()} IEEE RAS UADY.</span>
                  <span className="hidden sm:inline text-white/20">|</span>
                  <Link
                    href="/AvisosLegales"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Avisos Legales
                  </Link>
                </div>

                <span>
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
