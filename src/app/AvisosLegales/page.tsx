import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AvisosLegalesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* HEADER DE SECCIÓN */}
      <section className="bg-white pt-32 pb-12 md:pt-40 md:pb-16 border-b border-neutral-100">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-6">
            Avisos Legales y Política de Privacidad
          </h1>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-6 max-w-2xl mx-auto">
            Nuestro compromiso es mantener absoluta transparencia sobre el uso
            de la información y garantizar un entorno digital seguro y
            responsable para toda la comunidad estudiantil.
          </p>
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 border border-neutral-200 text-xs font-medium text-neutral-500">
            Última actualización: Abril de 2026
          </div>
        </div>
      </section>

      {/* CONTENIDO LEGAL (Formato Documento Maestro) */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 space-y-8">
          {/* Tarjeta 1: Aviso Legal e Identidad */}
          <Card className="group card-brand ring-0 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                1. Aviso Legal e Identificación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p>
                Este sitio web es administrado de manera independiente por el{" "}
                <strong>Capítulo Estudiantil IEEE RAS at UADY</strong> con fines
                estrictamente académicos, informativos, de divulgación
                tecnológica y sin fines de lucro.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Nombre del capítulo:</strong> IEEE Robotics and
                  Automation Society Student Chapter at UADY
                </li>
                <li>
                  <strong>Institución sede:</strong> Universidad Autónoma de
                  Yucatán (UADY)
                </li>
                <li>
                  <strong>Organización madre:</strong> IEEE – Robotics and
                  Automation Society (RAS)
                </li>
                <li>
                  <strong>Correo de contacto oficial:</strong>{" "}
                  ras.uady@gmail.com
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Tarjeta 2: Descargo de Responsabilidad Institucional */}
          <Card className="group card-brand ring-0 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                2. Descargo de Responsabilidad (Disclaimer)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p>
                El Capítulo Estudiantil IEEE RAS at UADY es una organización
                operada por estudiantes. Las opiniones, contenidos y actividades
                aquí expresadas son responsabilidad exclusiva de la Mesa
                Directiva del Capítulo.
              </p>
              <p>
                Este sitio web y sus contenidos{" "}
                <strong>no representan posturas oficiales</strong>,
                declaraciones, ni políticas de la Universidad Autónoma de
                Yucatán (UADY), del Instituto de Ingenieros Eléctricos y
                Electrónicos (IEEE) global, ni de la Sección IEEE México. El uso
                de marcas registradas, nombres y logotipos se realiza bajo los
                lineamientos de identidad visual para unidades estudiantiles
                aprobadas.
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta 3: Propiedad Intelectual */}
          <Card className="group card-brand ring-0 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                3. Propiedad Intelectual y Enlaces
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p>
                Todos los contenidos originales de este sitio (textos, códigos,
                diseños gráficos, fotografías y material didáctico) son
                propiedad intelectual del Capítulo Estudiantil, salvo que se
                cite una fuente externa. Su reproducción total o parcial está
                prohibida sin autorización previa por escrito, exceptuando usos
                para fines estrictamente académicos o personales donde se
                acredite claramente la autoría y el enlace original.
              </p>
              <p>
                <strong>Enlaces externos:</strong> Este portal puede incluir
                enlaces a sitios web de terceros (herramientas, repositorios,
                patrocinadores o instituciones). El Capítulo no asume
                responsabilidad alguna por el contenido, la disponibilidad o las
                políticas de privacidad de dichas plataformas externas.
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta 4: Política de Privacidad y Datos */}
          <Card className="group card-brand ring-0 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                4. Política de Privacidad y Manejo de Datos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p>
                <strong>Recopilación:</strong> El sitio no recopila datos de
                navegación mediante cookies de rastreo invasivas. Únicamente
                almacenamos la información que el usuario proporciona de manera
                voluntaria a través de formularios de registro a eventos,
                solicitudes de contacto o afiliación (ej. nombre, correo
                institucional, facultad, número de membresía).
              </p>
              <p>
                <strong>Finalidad:</strong> Los datos recabados se utilizan
                exclusivamente para propósitos logísticos del Capítulo: control
                de asistencia, emisión de constancias, envío de boletines
                informativos y métricas internas requeridas por IEEE.{" "}
                <strong>
                  Bajo ninguna circunstancia comercializamos, alquilamos ni
                  cedemos bases de datos a terceros
                </strong>
                .
              </p>
              <p>
                <strong>Derechos ARCO:</strong> En apego a las normativas de
                protección de datos, cualquier usuario puede ejercer sus
                derechos de Acceso, Rectificación, Cancelación u Oposición
                respecto a su información personal almacenada por el Capítulo,
                enviando una solicitud formal al correo{" "}
                <strong>ras.uady@gmail.com</strong>.
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta 5: Cobertura de Eventos */}
          <Card className="group card-brand ring-0 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                5. Uso de Imagen en Cobertura de Eventos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p>
                Al asistir presencial o virtualmente a los talleres,
                conferencias, competencias y asambleas organizadas por IEEE RAS
                at UADY, el asistente entiende que dichos eventos son
                documentados. Esto implica el consentimiento tácito para la
                captura de fotografías y grabaciones en video donde pueda
                aparecer.
              </p>
              <p>
                Este material multimedia se emplea exclusivamente para la
                memoria gráfica del Capítulo, informes a la organización central
                y promoción de futuras actividades en este sitio web y en
                nuestras redes sociales oficiales. Si un asistente desea que una
                fotografía en la que es identificable sea retirada de nuestros
                medios públicos, puede solicitarlo a través de nuestro correo de
                contacto y se procederá a su eliminación inmediata.
              </p>
            </CardContent>
          </Card>

          {/* Tarjeta 6: Aceptación */}
          <Card className="group card-brand ring-0 transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                6. Aceptación y Modificaciones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
              <p>
                El uso continuado de este portal web constituye la aceptación
                plena de los términos descritos en estos Avisos Legales y
                Políticas de Privacidad. El Capítulo Estudiantil se reserva el
                derecho de actualizar, modificar o enmendar este documento en
                cualquier momento para cumplir con nuevas directrices de IEEE,
                UADY o leyes aplicables, siendo la fecha de &quot;Última
                actualización&quot; el indicador de su vigencia.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
