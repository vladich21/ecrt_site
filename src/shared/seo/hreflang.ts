import type { Locale } from "@/content/i18n/locale";
import { publicPathForLocale } from "@/content/i18n/routing";

export function languageAlternates(basePath: string) {
  const ru = publicPathForLocale("ru", basePath);
  const en = publicPathForLocale("en", basePath);
  return {
    "ru-RU": ru,
    "en-US": en,
    "x-default": ru,
  };
}

export function languageAlternatesForLocale(locale: Locale, basePath: string) {
  return {
    canonical: publicPathForLocale(locale, basePath),
    languages: languageAlternates(basePath),
  };
}
