import type { Metadata } from "next";

import type { Locale } from "@/content/i18n/locale";
import { publicPathForLocale } from "@/content/i18n/routing";

import { buildPageMetadata } from "./build-page-metadata";
import { languageAlternates } from "./hreflang";
import { PAGE_SEO } from "./page-seo-copy";

export function buildStaticPageMetadata(
  section: keyof typeof PAGE_SEO,
  locale: Locale,
  basePath: string,
): Metadata {
  const copy = PAGE_SEO[section][locale];
  const canonical = publicPathForLocale(locale, basePath);

  return buildPageMetadata({
    title: copy.title,
    description: copy.description,
    path: canonical,
    locale: locale === "en" ? "en_US" : "ru_RU",
    alternates: {
      canonical,
      languages: languageAlternates(basePath),
    },
  });
}
