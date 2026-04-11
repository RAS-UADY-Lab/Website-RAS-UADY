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
  
  // Procesamiento robusto de correos: elimina espacios accidentales y unifica a minúsculas
  const rawAdminEmails = process.env.ADMIN_EMAILS || "";
  const allowedEmails = rawAdminEmails
    .split(',')
    .map((email) => email.trim().toLowerCase());

  const currentUserEmail = (user?.email || "").toLowerCase();

  // 1. Proteger la ruta /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    if (!allowedEmails.includes(currentUserEmail)) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', request.url))
    }
  }

  // 2. Si ya es Admin y está en /login, enviarlo directo al panel
  if (request.nextUrl.pathname.startsWith('/login') && user) {
     if (allowedEmails.includes(currentUserEmail)) {
         return NextResponse.redirect(new URL('/admin', request.url))
     }
  }

  return supabaseResponse
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}