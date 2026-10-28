//src/middleware.ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Normaliza ADMIN_EMAILS: recorta espacios, unifica a minúsculas y descarta
 * entradas vacías para que una variable sin definir nunca autorice a nadie.
 */
const correosAdministradores = new Set(
  (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((correo) => correo.trim().toLowerCase())
    .filter(Boolean),
);

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const correoActual = user?.email?.toLowerCase() ?? "";
  const esAdministrador =
    correoActual !== "" && correosAdministradores.has(correoActual);

  /**
   * Las redirecciones conservan las cookies de sesión refrescadas durante
   * esta solicitud para evitar invalidar el token vigente.
   */
  const redirigir = (ruta: string) => {
    const respuesta = NextResponse.redirect(new URL(ruta, request.url));
    supabaseResponse.cookies
      .getAll()
      .forEach((cookie) => respuesta.cookies.set(cookie));
    return respuesta;
  };

  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!user) return redirigir("/login");
    if (!esAdministrador) return redirigir("/login?error=unauthorized");
  }

  if (pathname.startsWith("/login") && user && esAdministrador) {
    return redirigir("/admin");
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};