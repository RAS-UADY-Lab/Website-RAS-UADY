// app/avisos-legales/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Reveal from "@/components/ui/Reveal";

export default function AvisosLegalesPage() {
  return (
    <div className="flex flex-col w-full">
      {/* HEADER DE SECCIÓN */}
      <section className="bg-white pt-32 pb-12 md:pt-40 md:pb-16 border-b border-neutral-100">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
          <Reveal delay={0}>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent mb-6">
              Avisos Legales y Política de Privacidad
            </h1>
          </Reveal>
          <Reveal delay={0}>
            <p className="text-base md:text-lg text-neutral-600 leading-relaxed mb-6 max-w-2xl mx-auto">
              Nuestro compromiso es mantener absoluta transparencia sobre el uso
              de la información y garantizar un entorno digital seguro y
              responsable para toda la comunidad estudiantil.
            </p>
          </Reveal>
          <Reveal delay={0}>
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-slate-100 border border-neutral-200 text-xs font-medium text-neutral-500">
              Última actualización: Agosto de 2026
            </div>
          </Reveal>
        </div>
      </section>

      {/* CONTENIDO LEGAL (Formato Documento Maestro) */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 space-y-8">
          {/* Tarjeta 1: Identificación y Naturaleza Jurídica */}
          <Reveal delay={0}>
            <Card className="group card-brand ring-0 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  1. Identificación y Naturaleza del Capítulo
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  Este sitio web es administrado de manera independiente por el{" "}
                  <strong>Capítulo Estudiantil IEEE RAS at UADY</strong>, con
                  fines estrictamente académicos, informativos, de divulgación
                  tecnológica y sin fines de lucro.
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Nombre del capítulo:</strong> IEEE Robotics and
                    Automation Society Student Chapter at UADY
                  </li>
                  <li>
                    <strong>Institución sede:</strong> Facultad de Ingeniería,
                    Universidad Autónoma de Yucatán (UADY)
                  </li>
                  <li>
                    <strong>Organización matriz:</strong> IEEE – Robotics and
                    Automation Society (RAS), a nivel internacional
                  </li>
                  <li>
                    <strong>Naturaleza jurídica:</strong> el Capítulo se
                    encuentra reconocido y registrado exclusivamente ante IEEE y
                    su Sociedad de Robótica y Automatización (RAS) a nivel
                    internacional. No cuenta con personalidad jurídica propia
                    registrada ante autoridades mexicanas, por lo que actúa y es
                    representado ante terceros por su Mesa Directiva vigente.
                  </li>
                  <li>
                    <strong>Representación actual:</strong> Presidencia a cargo
                    de Pedro Flores, estudiante de la Facultad de Ingeniería,
                    UADY.
                  </li>
                  <li>
                    <strong>Correo de contacto oficial:</strong>{" "}
                    contacto@rasuady.com
                  </li>
                </ul>
              </CardContent>
            </Card>
          </Reveal>

          {/* Tarjeta 2: Descargo de Responsabilidad y Participación en Actividades */}
          <Reveal delay={0}>
            <Card className="group card-brand ring-0 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  2. Descargo de Responsabilidad y Participación en Actividades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  El Capítulo Estudiantil IEEE RAS at UADY es una organización
                  operada por estudiantes. Las opiniones, contenidos y
                  actividades aquí expresadas son responsabilidad exclusiva de
                  su Mesa Directiva vigente.
                </p>
                <p>
                  Este sitio web y sus contenidos{" "}
                  <strong>no representan posturas oficiales</strong>,
                  declaraciones, ni políticas de la Universidad Autónoma de
                  Yucatán (UADY), del Instituto de Ingenieros Eléctricos y
                  Electrónicos (IEEE) global, ni de la Sección IEEE México. El
                  uso de marcas registradas, nombres y logotipos se realiza bajo
                  los lineamientos de identidad visual para unidades
                  estudiantiles aprobadas por IEEE.
                </p>
                <p>
                  <strong>Participación voluntaria en actividades:</strong> los
                  talleres, visitas técnicas, competencias y demás actividades
                  organizadas por el Capítulo son de carácter formativo y de
                  participación voluntaria. Al inscribirse, el participante
                  reconoce que dichas actividades pueden implicar traslados, uso
                  de instalaciones o equipo de terceros, y asume bajo su propia
                  responsabilidad los riesgos inherentes a su participación, sin
                  perjuicio de las medidas de seguridad razonables que el
                  Capítulo procura implementar. La información de contacto de
                  emergencia y cobertura de seguro médico se solicita únicamente
                  con este fin de seguridad, y no exime a las instituciones
                  anfitrionas de sus propias responsabilidades.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Tarjeta 3: Propiedad Intelectual y Enlaces Externos */}
          <Reveal delay={0}>
            <Card className="group card-brand ring-0 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  3. Propiedad Intelectual y Enlaces Externos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  Todos los contenidos originales de este sitio (textos,
                  códigos, diseños gráficos, fotografías y material didáctico)
                  son propiedad intelectual del Capítulo Estudiantil, salvo que
                  se cite una fuente externa. Su reproducción total o parcial
                  está prohibida sin autorización previa por escrito,
                  exceptuando usos con fines estrictamente académicos o
                  personales donde se acredite claramente la autoría y el enlace
                  original.
                </p>
                <p>
                  <strong>Enlaces externos:</strong> este portal puede incluir
                  enlaces a sitios web de terceros (herramientas, repositorios,
                  patrocinadores o instituciones). El Capítulo no asume
                  responsabilidad alguna por el contenido, la disponibilidad o
                  las políticas de privacidad de dichas plataformas externas.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Tarjeta 4: Aviso de Privacidad - Datos y Finalidades */}
          <Reveal delay={0}>
            <Card className="group card-brand ring-0 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  4. Aviso de Privacidad: Datos que Recabamos y Finalidades
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  En cumplimiento de la Ley Federal de Protección de Datos
                  Personales en Posesión de los Particulares vigente, el
                  tratamiento de los datos personales recabados a través de este
                  sitio es responsabilidad de la Mesa Directiva del Capítulo
                  Estudiantil IEEE RAS UADY, con domicilio de contacto en la
                  Facultad de Ingeniería, UADY, y correo contacto@rasuady.com.
                </p>
                <p>
                  <strong>Datos personales recabados:</strong> nombre completo,
                  correo electrónico, número telefónico, matrícula, facultad,
                  carrera o semestre equivalente, edad y número de membresía
                  IEEE cuando aplique. Para actividades presenciales que
                  impliquen traslados o riesgo físico controlado (visitas
                  técnicas, talleres prácticos), también se solicita información
                  sobre cobertura de seguro médico, la cual se considera un{" "}
                  <strong>dato personal sensible</strong> por su vínculo con el
                  estado de salud del titular.
                </p>
                <p>
                  <strong>Finalidades necesarias:</strong> gestión de
                  inscripción y afiliación al Capítulo y a la rama estudiantil
                  IEEE UADY; control de asistencia y emisión de constancias;
                  organización logística de talleres, visitas técnicas y demás
                  actividades; atención de emergencias médicas durante
                  actividades presenciales; y comunicación directa sobre la
                  actividad en la que el titular se inscribió.
                </p>
                <p>
                  <strong>Finalidades voluntarias</strong> (no condicionan el
                  servicio solicitado): envío de boletines informativos y
                  convocatorias futuras; métricas internas requeridas por IEEE;
                  y difusión de fotografías o videos en medios del Capítulo,
                  conforme a la sección 6 de este documento.
                </p>
                <p>
                  <strong>Tratamiento de datos sensibles:</strong> el dato de
                  seguro médico se recaba única y exclusivamente con fines de
                  seguridad y atención médica oportuna durante actividades
                  presenciales, con acceso restringido a los miembros de la Mesa
                  Directiva organizadores del evento correspondiente. No se
                  utiliza para ningún otro fin ni se comparte con terceros,
                  salvo que resulte necesario para brindar atención médica de
                  emergencia.
                </p>
                <p>
                  <strong>Menores de edad:</strong> los participantes regulares
                  de las actividades del Capítulo son estudiantes de nivel
                  superior mayores de edad. Cuando el Capítulo colabora en
                  actividades de divulgación con escuelas de nivel básico o
                  medio superior, dichas actividades se coordinan y autorizan
                  directamente a través de la dirección del plantel
                  correspondiente, siendo dicha institución la responsable de
                  gestionar el consentimiento de madres, padres o tutores. El
                  Capítulo no recaba directamente datos personales de menores de
                  edad fuera de este esquema institucional.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Tarjeta 5: Almacenamiento, Derechos ARCO y Cookies */}
          <Reveal delay={0}>
            <Card className="group card-brand ring-0 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  5. Almacenamiento, Derechos ARCO y Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  <strong>Almacenamiento de datos:</strong> por transparencia,
                  se informa que la infraestructura tecnológica utilizada para
                  almacenar los datos personales reside en servidores ubicados
                  en Estados Unidos. El Capítulo procura utilizar proveedores
                  con estándares de seguridad reconocidos en la industria para
                  salvaguardar la información.
                </p>
                <p>
                  <strong>Derechos ARCO:</strong> cualquier titular puede
                  solicitar en cualquier momento el Acceso, Rectificación,
                  Cancelación u Oposición al tratamiento de sus datos
                  personales, enviando su solicitud al correo{" "}
                  <strong>contacto@rasuady.com</strong>, indicando su nombre
                  completo y la actividad o dato relacionado. La Mesa Directiva
                  dará respuesta en un plazo razonable.
                </p>
                <p>
                  <strong>Uso de cookies:</strong> el sitio no utiliza cookies
                  de rastreo, analítica ni publicidad. Únicamente emplea una
                  cookie técnica de sesión para el inicio de sesión exclusivo de
                  la Mesa Directiva.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Tarjeta 6: Uso de Imagen en Cobertura de Eventos */}
          <Reveal delay={0}>
            <Card className="group card-brand ring-0 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  6. Uso de Imagen en Cobertura de Eventos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  Al asistir presencial o virtualmente a los talleres,
                  conferencias, competencias y asambleas organizadas por IEEE
                  RAS at UADY, el asistente entiende que dichos eventos son
                  documentados. Esto implica el consentimiento tácito para la
                  captura de fotografías y grabaciones en video donde pueda
                  aparecer.
                </p>
                <p>
                  Este material multimedia se emplea exclusivamente para la
                  memoria gráfica del Capítulo, informes a la organización
                  central y promoción de futuras actividades en este sitio web y
                  en nuestras redes sociales oficiales. Si un asistente desea
                  que una fotografía en la que es identificable sea retirada de
                  nuestros medios públicos, puede solicitarlo a través de
                  nuestro correo de contacto y se procederá a su eliminación.
                </p>
                <p>
                  En actividades realizadas en planteles de educación básica o
                  media superior, el uso de imagen de los estudiantes menores de
                  edad que ahí participen se sujeta a la autorización previa
                  otorgada por la propia institución educativa y/o sus tutores,
                  conforme a los lineamientos internos de dicho plantel.
                </p>
              </CardContent>
            </Card>
          </Reveal>

          {/* Tarjeta 7: Aceptación y Modificaciones */}
          <Reveal delay={0}>
            <Card className="group card-brand ring-0 transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl bg-gradient-to-t from-[#5f2167] to-[#98002e] bg-clip-text text-transparent">
                  7. Aceptación y Modificaciones
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-neutral-600 text-sm leading-relaxed">
                <p>
                  El uso continuado de este portal web constituye la aceptación
                  plena de los términos descritos en estos Avisos Legales y
                  Política de Privacidad. La Mesa Directiva se reserva el
                  derecho de actualizar, modificar o enmendar este documento en
                  cualquier momento para cumplir con nuevas directrices de IEEE,
                  UADY o disposiciones legales aplicables, siendo la fecha de
                  &quot;Última actualización&quot; el indicador de su vigencia.
                </p>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
