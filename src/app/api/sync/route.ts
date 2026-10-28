//src/app/api/sync/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { timingSafeEqual } from "crypto";

const VTOOLS_URL =
  "https://events.vtools.ieee.org/feeds/v7/c/SBC03105.json?span=now-3.year~now.1.month&sort=start_time&tags=WebRAS";

const LONGITUD_MAXIMA_DESCRIPCION = 200;

interface AtributosVTools {
  id?: number | string;
  title?: string | null;
  description?: string | null;
  "start-time"?: string | null;
  link?: string | null;
  header?: string | null;
}

interface ItemVTools {
  attributes?: AtributosVTools;
}

interface ActividadVTools {
  vtools_id: string;
  titulo: string;
  descripcion: string;
  fecha_inicio: string;
  enlace: string;
  imagen_url: string | null;
  es_interna: boolean;
  origen: "vtools";
}

const ENTIDADES_HTML: Record<string, string> = {
  aacute: "á", eacute: "é", iacute: "í", oacute: "ó", uacute: "ú",
  Aacute: "Á", Eacute: "É", Iacute: "Í", Oacute: "Ó", Uacute: "Ú",
  ntilde: "ñ", Ntilde: "Ñ", uuml: "ü", Uuml: "Ü",
  iquest: "¿", iexcl: "¡", amp: "&", quot: '"', apos: "'",
  lt: "<", gt: ">", nbsp: " ", ndash: "–", mdash: "—",
  hellip: "…", ldquo: "“", rdquo: "”", lsquo: "‘", rsquo: "’",
};

const aCaracter = (codigo: number, original: string) => {
  try {
    return String.fromCodePoint(codigo);
  } catch {
    return original;
  }
};

/**
 * Convierte HTML de vTools en texto plano: elimina etiquetas, decodifica
 * entidades en una sola pasada y trunca el resultado.
 */
function decodificarHTML(texto: string | null | undefined): string {
  if (!texto) return "";

  const sinEtiquetas = texto
    .replace(/<\s*(br|\/p|\/div|\/li)\s*\/?\s*>/gi, " ")
    .replace(/<\/?[a-zA-Z][^>]*>/g, "");

  const decodificado = sinEtiquetas
    .replace(/&#x([0-9a-f]+);/gi, (m, hex) => aCaracter(parseInt(hex, 16), m))
    .replace(/&#(\d+);/g, (m, dec) => aCaracter(parseInt(dec, 10), m))
    .replace(/&([a-zA-Z]+);/g, (m, nombre) => ENTIDADES_HTML[nombre] ?? m)
    .replace(/\s+/g, " ")
    .trim();

  return decodificado.length > LONGITUD_MAXIMA_DESCRIPCION
    ? decodificado.slice(0, LONGITUD_MAXIMA_DESCRIPCION).trimEnd() + "..."
    : decodificado;
}

/**
 * Extrae la primera imagen del encabezado restringida al dominio oficial de vTools.
 */
function extraerEnlaceImagen(texto: string | null | undefined): string | null {
  if (!texto) return null;
  const limpio = texto
    .replace(/\\u003C/g, "<")
    .replace(/\\u003E/g, ">")
    .replace(/\\u0026/g, "&");

  const coincidencia = limpio.match(
    /<img[^>]*src=["']https:\/\/events\.vtools\.ieee\.org\/([^"']+)["']/i,
  );
  return coincidencia
    ? `https://events.vtools.ieee.org/${coincidencia[1]}`
    : null;
}

const correosAdministradores = new Set(
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((correo) => correo.trim().toLowerCase())
    .filter(Boolean),
);

/**
 * Valida el encabezado Authorization contra CRON_SECRET en tiempo constante.
 * Si el secreto no está configurado, se rechaza cualquier solicitud.
 */
function esCronValido(request: Request): boolean {
  const secreto = process.env.CRON_SECRET;
  if (!secreto) return false;

  const recibido = Buffer.from(request.headers.get("authorization") ?? "");
  const esperado = Buffer.from(`Bearer ${secreto}`);
  return (
    recibido.length === esperado.length && timingSafeEqual(recibido, esperado)
  );
}

/**
 * Verifica la sesión contra el servidor de autenticación y exige que el
 * correo pertenezca a ADMIN_EMAILS.
 */
async function esAdministradorAutenticado(): Promise<boolean> {
  const cookieStore = await cookies();
  const supabaseAuth = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Los Route Handlers pueden operar en contextos de solo lectura.
          }
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  const correo = user?.email?.toLowerCase();
  return Boolean(correo && correosAdministradores.has(correo));
}

const respuestaNoAutorizado = () =>
  NextResponse.json(
    {
      exito: false,
      mensaje:
        "Acceso denegado. Se requiere autenticación de administrador o clave CRON.",
    },
    { status: 401 },
  );

async function sincronizar(): Promise<NextResponse> {
  try {
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
    );

    const response = await fetch(VTOOLS_URL, {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(
        `vTools rechazó la conexión: ${response.status} - ${response.statusText}`,
      );
    }

    const json = await response.json();

    if (!json?.data || !Array.isArray(json.data)) {
      throw new Error(
        "El formato de datos de vTools está vacío o no es reconocido.",
      );
    }

    // Se descartan registros incompletos para no abortar el lote por columnas NOT NULL.
    const unicas = new Map<string, ActividadVTools>();
    let descartados = 0;

    for (const item of json.data as ItemVTools[]) {
      const attr = item?.attributes;
      if (
        !attr ||
        attr.id === undefined ||
        !attr.title ||
        !attr["start-time"] ||
        !attr.link
      ) {
        descartados++;
        continue;
      }

      const vtoolsId = String(attr.id);
      unicas.set(vtoolsId, {
        vtools_id: vtoolsId,
        titulo: attr.title,
        descripcion: decodificarHTML(attr.description),
        fecha_inicio: attr["start-time"],
        enlace: attr.link,
        imagen_url: extraerEnlaceImagen(attr.header),
        es_interna: false,
        origen: "vtools",
      });
    }

    const { data: existentes, error: errorConsulta } = await supabaseAdmin
      .from("actividades")
      .select("vtools_id, oculto, protegido")
      .not("vtools_id", "is", null);

    if (errorConsulta) throw errorConsulta;

    const ocultos = new Set(
      (existentes ?? []).filter((e) => e.oculto).map((e) => e.vtools_id),
    );
    const protegidos = new Set(
      (existentes ?? []).filter((e) => e.protegido).map((e) => e.vtools_id),
    );

    const actividadesFinales = Array.from(unicas.values())
      .filter((act) => !protegidos.has(act.vtools_id))
      .map((act) => ({ ...act, oculto: ocultos.has(act.vtools_id) }));

    if (actividadesFinales.length === 0) {
      return NextResponse.json({
        exito: true,
        mensaje: "Todo está al día. No hubo eventos nuevos que actualizar.",
      });
    }

    const { error } = await supabaseAdmin
      .from("actividades")
      .upsert(actividadesFinales, {
        onConflict: "vtools_id",
        ignoreDuplicates: false,
      });

    if (error) throw new Error(`Error de Supabase: ${error.message}`);

    const sufijo =
      descartados > 0 ? ` Se omitieron ${descartados} registros incompletos.` : "";

    return NextResponse.json({
      exito: true,
      mensaje: `Sincronización exitosa. ${actividadesFinales.length} eventos procesados.${sufijo}`,
    });
  } catch (error) {
    const detalle =
      error instanceof Error
        ? error.message
        : (error as { message?: string })?.message ?? "Error desconocido";
    console.error("ERROR EN EL BACKEND DE SINCRONIZACIÓN:", detalle);

    return NextResponse.json(
      { exito: false, mensaje: "Fallo en el servidor: " + detalle },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (esCronValido(request) || (await esAdministradorAutenticado())) {
    return sincronizar();
  }
  return respuestaNoAutorizado();
}

/**
 * Los planificadores de tareas (p. ej. Vercel Cron) invocan por GET; este
 * método solo acepta la clave CRON y nunca una sesión de navegador.
 */
export async function GET(request: Request) {
  if (esCronValido(request)) {
    return sincronizar();
  }
  return respuestaNoAutorizado();
}