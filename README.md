# IEEE-RAS UADY | Plataforma Web Oficial

Sitio web oficial y panel de gestión del Capítulo Estudiantil (Student Chapter) IEEE Robotics and Automation Society (RAS) de la Facultad de Ingeniería de la Universidad Autónoma de Yucatán (FIUADY).

Este proyecto representa un salto generacional en la infraestructura digital del capítulo. Ha evolucionado de un sitio web estático tradicional a una aplicación web dinámica (WebApp) escalable, automatizada y de alto rendimiento, diseñada para centralizar la información, atraer talento y gestionar las operaciones del grupo de manera eficiente.

---

## 1. Naturaleza y Objetivos del Proyecto

El objetivo principal de esta plataforma es establecer una presencia digital de autoridad técnica. Sirve como el puente principal entre la mesa directiva, los estudiantes, los profesionales de la industria y la red global de IEEE.

**Objetivos Cualitativos:**

- Proyectar una imagen de vanguardia tecnológica, elegancia y profesionalismo, acorde al nivel de la ingeniería en robótica y automatización.
- Educar a los estudiantes de nuevo ingreso sobre el ecosistema IEEE y los beneficios de la membresía internacional mediante un flujo de "Onboarding" claro.
- Demostrar autoridad técnica a posibles patrocinadores y empresas aliadas.

**Objetivos Cuantitativos y Operativos:**

- Reducir a cero la carga de trabajo manual para la actualización de eventos oficiales mediante la sincronización automatizada con IEEE vTools.
- Centralizar el directorio de miembros directivos y proyectos en una base de datos relacional.
- Proveer un panel de administración seguro para la gestión de contenidos sin necesidad de tocar el código fuente.

---

## 2. Arquitectura y Stack Tecnológico

El proyecto está construido sobre una arquitectura moderna sin servidor (Serverless), garantizando máxima velocidad, SEO optimizado y costos operativos cercanos a cero.

### Frontend

- **Next.js 15 (App Router):** Framework principal de React para renderizado híbrido (SSR/SSG/CSR) y enrutamiento avanzado.
- **TypeScript:** Tipado estricto para prevenir errores en tiempo de compilación y asegurar la mantenibilidad del código.
- **Tailwind CSS v4:** Motor de utilidades CSS para un diseño responsivo, corporativo y fluido, con animaciones nativas integradas al motor.

### Backend y Base de Datos (BaaS)

- **Supabase:** Alternativa de código abierto a Firebase.
  - **PostgreSQL:** Base de datos relacional para actividades, directivos, proyectos y patrocinadores.
  - **Supabase Auth:** Autenticación segura mediante sesiones y JWT.
  - **Supabase Storage:** Almacenamiento en la nube para recursos multimedia.

### Infraestructura y Despliegue

- **Cloudflare Workers / Pages:** Alojamiento de borde (Edge Network) global para una latencia mínima.
- **OpenNext:** Adaptador de compilación para ejecutar aplicaciones complejas de Next.js nativamente en la infraestructura de Cloudflare.

### Automatización y Servicios

- **GitHub Actions:** Orquestación de _Cron Jobs_ para la ejecución de tareas programadas.
- **IEEE vTools API:** Fuente de la verdad para la extracción de eventos oficiales.

---

## 3. Características Principales

- **Sincronización Autónoma:** Un _Cron Job_ configurado en GitHub Actions ejecuta una ruta de API protegida dos veces por semana. Esta ruta extrae los eventos oficiales de IEEE vTools, filtra duplicados, respeta las ediciones manuales hechas por los administradores locales y actualiza la base de datos PostgreSQL de forma atómica.
- **Panel de Administración Privado:** Una ruta protegida (`/admin`) que permite a los directivos crear, editar, ocultar y eliminar registros de la base de datos a través de una interfaz visual, sin requerir conocimientos de programación.
- **Seguridad de Nivel de Fila (RLS):** La base de datos está blindada. Los usuarios públicos tienen permisos estrictos de solo lectura (`SELECT`), mientras que las mutaciones de datos (`INSERT`, `UPDATE`, `DELETE`) están bloqueadas a nivel de motor de base de datos a menos que la solicitud provenga de un administrador autenticado con un token válido.

---

## 4. Manual de Sucesión y Mantenimiento

Debido a la naturaleza de los capítulos estudiantiles, la Mesa Directiva (y por ende, el Webmaster) cambia cada generación. Esta sección es crítica para la continuidad del proyecto.

### A. Herencia de Credenciales

El Webmaster saliente **debe** transferir los siguientes accesos al Webmaster entrante:

1.  Propiedad de la cuenta en GitHub (o acceso de administrador en la organización).
2.  Acceso al proyecto en Cloudflare.
3.  Acceso al proyecto en Supabase.
4.  Credenciales de la cuenta de Resend (para el envío de correos).

### B. Gestión de Variables de Entorno (.env)

El proyecto requiere las siguientes claves para funcionar. Nunca deben subirse al repositorio público. Deben configurarse en el panel de variables de entorno de Cloudflare:

- `NEXT_PUBLIC_SUPABASE_URL`: URL del proyecto en Supabase.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Clave pública para lectura de datos en el frontend.
- `SUPABASE_SERVICE_ROLE_KEY`: Clave de administrador (DIOS) utilizada en el backend para sobreescribir el RLS durante las sincronizaciones automáticas.
- `CRON_SECRET`: Contraseña alfanumérica larga utilizada por GitHub Actions para autorizar el disparo de la sincronización de vTools.
- `RESEND_API_KEY`: Clave de la API de Resend para mensajería.

### C. Migración o Cambio de Dominio

Si el capítulo adquiere un dominio personalizado (ej. `ras-uady.org`) en lugar del subdominio proporcionado por Cloudflare, se deben realizar los siguientes ajustes en el código fuente:

1.  **Metadatos y SEO:** Actualizar la propiedad `metadataBase` y la URL de `openGraph` en `src/app/layout.tsx`.
2.  **Sitemap:** Modificar la variable `baseUrl` en `src/app/sitemap.ts`.
3.  **Robots:** Modificar la ruta del sitemap en `src/app/robots.ts`.
4.  **CORS (Cross-Origin Resource Sharing):** Ingresar a Supabase > Authentication > URL Configuration, y añadir el nuevo dominio a la lista de "Site URL" y "Redirect URLs" para que el inicio de sesión funcione correctamente.

---

## 5. Directrices de Contribución

Se alienta a todos los miembros de la rama técnica y estudiantes de la facultad a contribuir al código base. El flujo de trabajo estandarizado es el siguiente:

1.  Realiza un **Fork** de este repositorio.
2.  Clona tu fork localmente: `git clone https://github.com/TU-USUARIO/RAS-FIUADY.git`
3.  Instala las dependencias: `npm install`
4.  Si se te autoriza, crea un archivo `.env.local` en la raíz copiando la estructura de las variables mencionadas en la sección 4.B y solicita las claves de desarrollo al Webmaster actual.
5.  Crea una rama para tu característica: `git checkout -b feature/NombreDeTuCaracteristica`
6.  Desarrolla, prueba y realiza tus _commits_ con mensajes descriptivos y profesionales.
7.  Haz _push_ a tu repositorio: `git push origin feature/NombreDeTuCaracteristica`
8.  Abre un **Pull Request (PR)** hacia la rama principal de este repositorio. El comité revisará tu código antes de fusionarlo e implementarlo en producción.

---

## 6. Autores y Créditos

- **Propiedad y Gestión:** Capítulo Estudiantil IEEE-RAS FIUADY.
- **Arquitectura y Desarrollo Principal:** Eduardo Chan (Edward5126 / E-nnova Design) - Conceptualización, diseño UI/UX corporativo, despliegue de infraestructura serverless y automatización backend.

> Desarrollado con dedicación en la Facultad de Ingeniería de la Universidad Autónoma de Yucatán.

---

© [2026] IEEE RAS UADY. Todos los derechos reservados. Las marcas comerciales "IEEE" y "RAS" pertenecen al Institute of Electrical and Electronics Engineers, Inc., y se utilizan bajo los lineamientos de capítulos estudiantiles. Este sitio no es una plataforma corporativa oficial de IEEE global.
