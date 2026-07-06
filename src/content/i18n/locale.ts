export type Locale = "ru" | "en";

export const LOCALES = ["ru", "en"] as const satisfies readonly Locale[];

export const DEFAULT_LOCALE: Locale = "ru";

/** Префикс пути для EN-версии сайта. */
export function localePathPrefix(locale: Locale): "" | "/en" {
  return locale === "en" ? "/en" : "";
}
