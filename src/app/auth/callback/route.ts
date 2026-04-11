import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  // A dónde lo enviaremos después del login exitoso
  const next = searchParams.get('next') ?? '/admin'

  if (code) {
    const cookieStore = await cookies()
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {
              // Manejo de error silencioso para Server Components
            }
          },
        },
      }
    )
    
    // Intercambiamos el código de Google por una Cookie de Sesión segura
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error("❌ ERROR EN AUTH CALLBACK:", error.message);
    } else {
      // ¡Éxito! Lo dejamos pasar al panel
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // Si algo falló con Google, lo regresamos al login
  return NextResponse.redirect(`${origin}/login?error=auth-callback-failed`)
}