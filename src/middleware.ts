import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  const allowedEmails = (process.env.ADMIN_EMAILS || "").split(',');

  // 1. Proteger la ruta /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // Si no ha iniciado sesión, al login
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    if (!allowedEmails.includes(user.email || '')) {
      // Si inició sesión pero no es Admin, lo regresamos con un mensaje de error
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url))
    }
  }

  // 2. Si ya es Admin y está en /login, enviarlo directo al panel
  if (request.nextUrl.pathname.startsWith('/login') && user) {
     if (allowedEmails.includes(user.email || '')) {
         return NextResponse.redirect(new URL('/admin', request.url))
     }
  }

  return supabaseResponse
}

// Rutas donde el middleware debe ejecutarse
export const config = {
  matcher: ['/admin/:path*', '/login'],
}