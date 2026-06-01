import commonEn from "@/locales/en/common.json";
import commonRu from "@/locales/ru/common.json";

type MessageTree = Record<string, unknown>;

export type Locale = "ru" | "en";

const enPathByRuPath: Record<string, string> = {
  "/": "/en",
  "/about-us": "/en/about-us",
  "/projects": "/en/projects",
  "/careers": "/en/careers",
  "/purchase": "/en/purchase",
  "/documents": "/en/documents",
  "/contacts": "/en/contacts",
  "/privacy-policy": "/en/privacy-policy",
};

export function localeFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  return pathname.replace(/^\/en(?=\/|$)/, "") || "/";
}

export function withLocalePath(pathname: string, locale: Locale): string {
  const ruPath = stripLocalePrefix(pathname);
  if (locale === "ru") return ruPath;
  const mapped = enPathByRuPath[ruPath];
  if (mapped) return mapped;
  if (ruPath === "/") return "/en";
  return `/en${ruPath}`;
}

export function t(key: string, locale: Locale = "ru"): string {
  const commonCopy = locale === "en" ? commonEn : commonRu;
  return key.split(".").reduce<unknown>((node, part) => {
    if (typeof node !== "object" || node === null) return undefined;
    return (node as MessageTree)[part];
  }, commonCopy) as string ?? key;
}
