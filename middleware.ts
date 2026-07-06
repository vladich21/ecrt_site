import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const LOCALE_HEADER = "x-locale";

function shouldSkipMiddleware(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.(svg|png|jpe?g|gif|webp|mp4|webm|ico|pdf|txt)$/i.test(pathname)
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldSkipMiddleware(pathname)) {
    return NextResponse.next();
  }

  // Public URLs never use /ru; redirect mistaken or leaked internal paths.
  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    const publicPath = pathname.replace(/^\/ru(?=\/|$)/, "") || "/";
    return NextResponse.redirect(new URL(publicPath, request.url));
  }

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const locale = isEn ? "en" : "ru";
  const rewritePath = isEn ? pathname : `/ru${pathname === "/" ? "" : pathname}`;

  const url = request.nextUrl.clone();
  url.pathname = rewritePath;

  const response = NextResponse.rewrite(url);
  response.headers.set(LOCALE_HEADER, locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
