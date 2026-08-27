//src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/actividades", label: "Actividades" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/membresia", label: "Membresía" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el menú móvil automáticamente al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloquea el scroll del cuerpo cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (pathname === "/enlaces") return null;

  return (
    <>
      <header className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl rounded-2xl border border-neutral-200/60 bg-white backdrop-blur-md shadow-sm shadow-neutral-900/5 transition-all">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/IMG/Logos/LogoRASTagline.svg"
              alt="Logo de la RAS-UADY"
              width={160}
              height={45}
              priority
            />
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex gap-8">
            <Link href="/" className="text-sm font-medium nav-link-fluid cursor-pointer">
              Inicio
            </Link>
            <Link href="/nosotros" className="text-sm font-medium nav-link-fluid cursor-pointer">
              Nosotros
            </Link>
            <Link href="/actividades" className="text-sm font-medium nav-link-fluid cursor-pointer">
              Actividades
            </Link>
            <Link href="/proyectos" className="text-sm font-medium nav-link-fluid cursor-pointer">
              Proyectos
            </Link>
            <Link href="/membresia" className="text-sm font-medium nav-link-fluid cursor-pointer">
              Membresía
            </Link>
            <Link href="/contacto" className="text-sm font-medium nav-link-fluid cursor-pointer">
              Contacto
            </Link>
          </nav>

          {/* Botones de Acción */}
          <div className="flex items-center gap-3">
            {/* Botón Destacado: Nodum App */}
            <Link
              href="/nodum"
              target="_self"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md border border-neutral-200 bg-slate-50 px-4 py-2 text-sm font-bold shadow-sm transition-all duration-300 hover:bg-white hover:shadow-md hover:border-neutral-300 cursor-pointer group relative"
            >
              <i className="icon-nodum-logo mr-2 text-neutral-500 group-hover:text-[#5f2167] transition-colors"></i>
              <span className="text-neutral-700 group-hover:bg-gradient-to-r group-hover:from-[#5f2167] group-hover:to-[#98002e] group-hover:bg-clip-text group-hover:text-transparent transition-all">
                Nodum
              </span>
            </Link>

            {/* Botón Unirme Desktop */}
            <Link
              href="/#Unirme"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-[#5f2167] to-[#98002e] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md hover:opacity-90 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 cursor-pointer ml-1"
            >
              <i className="icon-handshake-solid-full mr-2 text-lg"></i> Unirme
            </Link>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu-panel"
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-md border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors cursor-pointer ml-1 relative z-50"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <i
                className={`text-neutral-900 text-xl transition-transform duration-300 ${isOpen ? "icon-close rotate-90" : "icon-bars"}`}
              ></i>
            </button>
          </div>
        </div>
      </header>

      {/* FONDO DE CIERRE DEL MENÚ MÓVIL */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-neutral-900/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* PANEL DEL MENÚ MÓVIL */}
      <div
        id="mobile-menu-panel"
        className={`fixed inset-x-0 top-[5.5rem] z-50 mx-auto w-[95%] max-w-7xl origin-top overflow-hidden rounded-3xl border border-neutral-200/60 bg-white/95 shadow-xl shadow-neutral-900/10 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        {/* Motivo decorativo: eco de la esfera de nodos del Hero */}
        <svg
          className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 opacity-[0.05]"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#5f2167" strokeWidth="0.6" fill="none">
            <circle cx="100" cy="100" r="90" strokeDasharray="2 4" />
            <ellipse cx="100" cy="100" rx="90" ry="30" />
            <ellipse cx="100" cy="100" rx="30" ry="90" />
            <circle cx="100" cy="10" r="3" fill="#5f2167" />
            <circle cx="10" cy="100" r="3" fill="#98002e" />
            <circle cx="190" cy="100" r="3" fill="#98002e" />
          </g>
        </svg>

        <nav className="relative flex flex-col p-3">
          {NAV_LINKS.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive ? "page" : undefined}
                style={{ transitionDelay: isOpen ? `${idx * 40}ms` : "0ms" }}
                className={`group flex items-center justify-between rounded-2xl px-5 py-4 text-base font-semibold transition-all duration-300 ${
                  isOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                } ${
                  isActive
                    ? "bg-gradient-to-r from-[#5f2167]/[0.06] to-[#98002e]/[0.06] text-fluid-gradient"
                    : "text-neutral-700 hover:bg-slate-50"
                }`}
              >
                <span>{link.label}</span>
                <svg
                  className={`h-4 w-4 shrink-0 transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-[#98002e]"
                      : "-translate-x-1 text-neutral-300 group-hover:translate-x-0 group-hover:text-neutral-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            );
          })}

          <div className="my-2 border-t border-neutral-100" />

          <div className="flex flex-col gap-2 p-2">
            <Link
              href="/nodum"
              target="_self"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-xl border border-neutral-200 bg-slate-50 px-4 text-sm font-bold text-neutral-700 shadow-sm transition-colors hover:bg-white"
            >
              <i className="icon-nodum-logo mr-2 text-neutral-500"></i>
              Nodum App
            </Link>
            <Link
              href="/#Unirme"
              onClick={() => setIsOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-[#5f2167] to-[#98002e] px-4 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-90"
            >
              <i className="icon-handshake-solid-full mr-2 text-base"></i>
              Unirme al Capítulo
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}