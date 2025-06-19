import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const locales = ["sq", "en"] // Albanian (main), English
const defaultLocale = "sq"

function getLocale(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = defaultLocale
  request.nextUrl.pathname = `/${locale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export function middleware(request: NextRequest) {
  return getLocale(request)
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
}
