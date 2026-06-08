import type { Locale } from "@/content/i18n";
import type commonEn from "@/locales/en/common.json";
import type homeEn from "@/locales/en/home.json";

export type HomeLocale = Locale;
export type HomeCopy = typeof homeEn;
export type CommonCopy = typeof commonEn;
