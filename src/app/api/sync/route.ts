import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Función para extraer la imagen y obligarla a usar el dominio original de IEEE
function extraerEnlaceImagen(texto: string | null) {
  if (!texto) return null;
  const limpio = texto
    .replace(/\\u003C/g, "<")
    .replace(/\\u003E/g, ">")
    .replace(/\\u0026/g, "&");

  const match = limpio.match(/<img[^>]*src="https:\/\/events\.vtools\.ieee\.org\/([^"]+)"/i);
  return match ? `https://events.vtools.ieee.org/${match[1]}` : null;
}

export async function POST(request: Request) {
  try {
    // 1. INICIALIZACIÓN DEL CLIENTE (Debe estar AQUÍ adentro para que Cloudflare no explote al compilar)
    // Esto es estrictamente necesario para saltarse las reglas de RLS en tareas de fondo
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! 
    );

    // --- CAPA DE SEGURIDAD ---
    const authHeader = request.headers.get("authorization");
    const isCronJob = authHeader === `Bearer ${process.env.CRON_SECRET}`;

    // Si no es Cron Job, verificamos que sea un administrador autenticado desde el frontend
    if (!isCronJob) {
      const cookieStore = await cookies();
      const supabaseAuth = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) { return cookieStore.get(name)?.value; },
          },
        }
      );
      const { data: { session } } = await supabaseAuth.auth.getSession();
      
      if (!session) {
        return NextResponse.json(
          { exito: false, mensaje: "Acceso denegado. Se requiere autenticación de administrador o clave CRON." },
          { status: 401 }
        );
      }
    }
    // --- FIN CAPA DE SEGURIDAD ---

    // 2. URL OFICIAL usando la etiqueta exclusiva
    const vtoolsUrl = "https://events.vtools.ieee.org/feeds/v7/c/SBC03105.json?span=now-3.year~now.1.month&sort=start_time&tags=RAS";
    
    const response = await fetch(vtoolsUrl, { 
      cache: 'no-store', 
      headers: { 'Accept': 'application/json' }
    });
    
    if (!response.ok) {
      throw new Error(`vTools rechazó la conexión: ${response.status} - ${response.statusText}`);
    }

    const json = await response.json();
    
    if (!json.data || !Array.isArray(json.data)) {
      throw new Error("El formato de datos de vTools está vacío o no es reconocido.");
    }

    // 3. Formateamos los datos entrantes de vTools
    const actividadesNuevas = json.data.map((item: any) => {
      const attr = item.attributes;
      return {
        vtools_id: String(attr.id),
        titulo: attr.title,
        descripcion: attr.description?.replace(/<[^>]*>?/gm, '').substring(0, 200) + "..." || "",
        fecha_inicio: attr["start-time"],
        enlace: attr.link,
        imagen_url: extraerEnlaceImagen(attr.header),
        es_interna: false,
        origen: "vtools"
      };
    });

    const vtoolsIds = actividadesNuevas.map((a: any) => a.vtools_id);

    // 4. PREVENCIÓN DE ZOMBIS Y SOBRESCRITURAS
    const { data: eventosExistentes, error: fetchError } = await supabaseAdmin
      .from('actividades')
      .select('vtools_id, oculto, protegido')
      .in('vtools_id', vtoolsIds);

    if (fetchError) throw fetchError;

    const mapaOcultos = new Set(eventosExistentes?.filter(e => e.oculto).map(e => e.vtools_id));
    const mapaProtegidos = new Set(eventosExistentes?.filter(e => e.protegido).map(e => e.vtools_id));

    const actividadesFinales = actividadesNuevas
      .filter((act: any) => !mapaProtegidos.has(act.vtools_id))
      .map((act: any) => ({
        ...act,
        oculto: mapaOcultos.has(act.vtools_id) ? true : false
      }));

    if (actividadesFinales.length === 0) {
      return NextResponse.json({ exito: true, mensaje: "Todo está al día. No hubo eventos nuevos que actualizar." });
    }

    // 5. UPSERT Atómico
    const { error } = await supabaseAdmin
      .from('actividades')
      .upsert(actividadesFinales, { 
        onConflict: 'vtools_id',
        ignoreDuplicates: false
      });

    if (error) throw new Error(`Error de Supabase: ${error.message}`);

    return NextResponse.json({ 
      exito: true, 
      mensaje: `¡Sincronización exitosa! ${actividadesFinales.length} eventos procesados.` 
    });

  } catch (error: any) {
    console.error("ERROR EN EL BACKEND DE SINCRONIZACIÓN:", error.message);
    
    return NextResponse.json({ 
      exito: false, 
      mensaje: "Fallo en el servidor: " + error.message 
    }, { status: 500 });
  }
}