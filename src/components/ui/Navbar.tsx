"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el menú móvil automáticamente al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Bloquea el scroll del cuerpo cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl rounded-2xl border border-neutral-200/60 bg-white/85 backdrop-blur-md shadow-sm shadow-neutral-900/5 transition-all">
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

          {/* Botones de Acción */}
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

            {/* Botón Unirme Desktop */}
            <Link
              href="/contacto"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md bg-gradient-to-r from-[#5f2167] to-[#98002e] px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:shadow-md hover:opacity-90 hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 cursor-pointer ml-1"
            >
              <i className="icon-trato mr-2 text-lg"></i> Unirme
            </Link>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-md border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors cursor-pointer ml-1 relative z-50"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <i
                className={`text-neutral-900 text-xl transition-transform duration-300 ${isOpen ? "icon-Cruz rotate-90" : "icon-MenuHam"}`}
              ></i>
            </button>
          </div>
        </div>
      </header>

      {/* OVERLAY DEL MENÚ MÓVIL */}
      <div
        className={`fixed inset-0 z-40 bg-white/95 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col justify-center items-center ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center gap-8 text-center w-full px-6">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-fluid-gradient cursor-pointer"
          >
            Inicio
          </Link>
          <Link
            href="/nosotros"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-fluid-gradient cursor-pointer"
          >
            Nosotros
          </Link>
          <Link
            href="/actividades"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-fluid-gradient cursor-pointer"
          >
            Actividades
          </Link>
          <Link
            href="/proyectos"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-fluid-gradient cursor-pointer"
          >
            Proyectos
          </Link>
          <Link
            href="/membresia"
            onClick={() => setIsOpen(false)}
            className="text-2xl font-bold text-fluid-gradient cursor-pointer"
          >
            Membresía
          </Link>

          <div className="w-16 h-px bg-neutral-200 my-4"></div>

          <Link
            href="https://mynodum.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs inline-flex h-12 items-center justify-center rounded-md border border-neutral-200 bg-slate-50 px-4 py-2 text-base font-bold shadow-sm cursor-pointer group"
          >
            <i className="icon-Laptop mr-2 text-neutral-500"></i>
            <span className="text-neutral-700">Nodum App</span>
          </Link>

          <Link
            href="/contacto"
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-[#5f2167] to-[#98002e] px-5 py-2 text-base font-medium text-white shadow-md cursor-pointer"
          >
            <i className="icon-trato mr-2 text-xl"></i> Unirme al Capítulo
          </Link>
        </nav>
      </div>
    </>
  );
}
