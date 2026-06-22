export type Locale = "ru" | "en";

export const DEFAULT_LOCALE: Locale = "ru";

/** Атрибут lang на обертке страницы (EN-only страницы). */
export function pageLangAttr(locale: Locale): "en" | undefined {
  return locale === "en" ? "en" : undefined;
}

/** Префикс пути для EN-версии сайта. */
export function localePathPrefix(locale: Locale): "" | "/en" {
  return locale === "en" ? "/en" : "";
}
