import Link from "next/link";
import FallbackImage from "@/components/ui/FallbackImage";

export default function MembresiaPage() {
  return (
    <div className="flex flex-col w-full">
      {/* HEADER DE SECCIÓN */}
      <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-24 border-b border-neutral-100">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-6">
            Adquiere tu membresía IEEE - RAS
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-10">
            Al unirte a la comunidad global de IEEE, accedes a una red
            invaluable de ingeniería. Al especializarte con la membresía RAS,
            desbloqueas recursos, contactos y oportunidades centradas
            exclusivamente en la vanguardia de la robótica y la automatización.
          </p>

          {/* Tarjeta de Información / Proceso */}
          <div className="bg-slate-50 border border-neutral-200 rounded-2xl p-8 max-w-2xl mx-auto shadow-sm text-left relative overflow-hidden">
            {/* Acento decorativo */}
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-t from-[#5f2167] to-[#98002e]"></div>

            <h2 className="text-xl font-bold text-neutral-900 mb-3">
              ¿Cómo funciona la afiliación?
            </h2>
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              La suscripción RAS es de segundo nivel; requiere contar
              previamente con la membresía base de IEEE. Ambas se gestionan
              mediante el portal oficial. Si configuras tu perfil como
              estudiante activo, el sistema te otorgará automáticamente un
              descuento preferencial en tu anualidad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contacto"
                className="group relative inline-flex h-10 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                <span className="relative z-10 px-6 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover:text-white">
                  Contáctanos para asesoría
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFICIOS (Layout Zig-Zag Editorial) */}
      <section className="bg-slate-50 py-24">
        <div className="container mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-20 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
              Conoce los beneficios
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-[#5f2167] to-[#98002e] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="space-y-20 md:space-y-32">
            {/* Beneficio 1 */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
              <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
                <FallbackImage
                  src="/IMG/CONTENT/Recursos.jpg"
                  alt="Estudiantes consultando recursos técnicos"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  Recursos técnicos de alto nivel
                </h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Acceso directo a artículos, publicaciones científicas y
                  revistas especializadas como{" "}
                  <em>IEEE Robotics & Automation Magazine</em> y{" "}
                  <em>IEEE Transactions on Robotics</em>. Mantente a la
                  vanguardia consultando bibliotecas digitales con contenido
                  exclusivo para miembros.
                </p>
              </div>
            </div>

            {/* Beneficio 2 (Invertido) */}
            <div className="flex flex-col md:flex-row-reverse gap-10 md:gap-16 items-center">
              <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
                <FallbackImage
                  src="/IMG/CONTENT/Competencias.jpg"
                  alt="Estudiante en competencia de robótica"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4 text-left md:text-right">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  Competencias y proyectos globales
                </h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Gana el derecho de representar al Capítulo Estudiantil FIUADY
                  en competencias internacionales como el{" "}
                  <em>IEEE Robotics Competition</em> y <em>RAS Challenges</em>.
                  Además, tu membresía te habilita para solicitar fondos
                  institucionales y becas de financiamiento para tus propios
                  proyectos.
                </p>
              </div>
            </div>

            {/* Beneficio 3 */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
              <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
                <FallbackImage
                  src="/IMG/CONTENT/RedInternacional.jpg"
                  alt="Estudiantes colaborando internacionalmente"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  Red internacional de contactos
                </h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Rompe las fronteras de tu universidad. Conecta directamente
                  con estudiantes, investigadores y profesionales consolidados
                  en todo el mundo a través de conferencias exclusivas, talleres
                  prácticos y seminarios web organizados por la directiva global
                  de IEEE - RAS.
                </p>
              </div>
            </div>

            {/* Beneficio 4 (Invertido) */}
            <div className="flex flex-col md:flex-row-reverse gap-10 md:gap-16 items-center">
              <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
                <FallbackImage
                  src="/IMG/CONTENT/Desarrollo.jpg"
                  alt="Desarrollo profesional"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4 text-left md:text-right">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  Desarrollo académico y profesional
                </h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  Construye un currículum altamente competitivo antes de
                  graduarte. Accede a programas de mentoría, oportunidades de
                  voluntariado técnico internacional y asume posiciones de
                  liderazgo que fortalecerán tu perfil profesional en el
                  ecosistema tecnológico.
                </p>
              </div>
            </div>

            {/* Beneficio 5 */}
            <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
              <div className="relative w-full md:w-1/2 h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-neutral-200">
                <FallbackImage
                  src="/IMG/CONTENT/PreciosPreferenciales.jpg"
                  alt="Beneficios y descuentos"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  Precios preferenciales
                </h3>
                <p className="text-neutral-600 leading-relaxed text-lg">
                  La investigación y el aprendizaje no deberían tener barreras
                  económicas. Disfruta de tarifas reducidas en certificaciones,
                  conferencias, hardware y licencias de software, junto con
                  apoyos económicos reservados exclusivamente para miembros
                  estudiantiles activos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION FINAL */}
      <section className="bg-white py-20 border-t border-neutral-100">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
            ¿Listo para llevar tu carrera al siguiente nivel?
          </h2>
          <p className="text-neutral-600 mb-10">
            Visita el portal global para explorar todos los recursos disponibles
            o comunícate con la directiva local para guiarte paso a paso.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="https://www.ieee-ras.org/membership"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md bg-gradient-to-r from-[#5f2167] to-[#98002e] px-8 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg hover:opacity-90 hover:-translate-y-0.5 cursor-pointer"
            >
              Visitar sitio oficial IEEE
            </Link>
            <Link
              href="/contacto"
              className="group relative inline-flex h-12 items-center justify-center rounded-md overflow-hidden border border-neutral-300 shadow-sm transition-all duration-300 hover:border-transparent hover:shadow-md cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#5f2167] to-[#98002e] opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 px-8 text-sm font-medium text-neutral-900 transition-colors duration-300 group-hover:text-white">
                Contactar a la directiva
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
