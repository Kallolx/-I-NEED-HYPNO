// middleware.js
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname

  // Public paths
  if (['/auth/login', '/auth/signup'].includes(path)) {
    return NextResponse.next()
  }

  // Protected paths requiring authentication
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Admin-only paths
  if (path.startsWith('/admin') && token.role !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Doctor-only paths
  if (path.startsWith('/doctor') && token.role !== 'doctor') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/doctor/:path*',
    '/profile/:path*',
    '/bookings/:path*'
  ]
}