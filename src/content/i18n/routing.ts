import type { Locale } from "./locale";
import { localePathPrefix } from "./locale";

export function publicPathForLocale(locale: Locale, basePath: string): string {
  const prefix = localePathPrefix(locale);
  if (basePath === "/") return prefix || "/";
  return `${prefix}${basePath}`;
}

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function withLocalePath(pathname: string, locale: Locale): string {
  const ruPath = stripLocalePrefix(pathname);
  return publicPathForLocale(locale, ruPath);
}
