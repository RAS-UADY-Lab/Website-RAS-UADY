//src/app/auth/callback/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

const DESTINO_POR_DEFECTO = "/admin";

/**
 * Acepta únicamente rutas internas relativas al origen. Rechaza esquemas,
 * rutas de protocolo relativo ("//") y variantes con barra invertida que
 * los navegadores normalizan a otro host.
 */
function resolverDestinoSeguro(destino: string | null): string {
  if (
    !destino ||
    !destino.startsWith("/") ||
    destino.startsWith("//") ||
    destino.startsWith("/\\")
  ) {
    return DESTINO_POR_DEFECTO;
  }
  return destino;
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = resolverDestinoSeguro(searchParams.get("next"));

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
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
              // Las Server Components no permiten escribir cookies; el middleware refresca la sesión.
            }
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("ERROR EN AUTH CALLBACK:", error.message);
    } else {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`);
}