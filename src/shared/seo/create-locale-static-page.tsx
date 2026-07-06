import type { Metadata } from "next";
import type { ComponentType } from "react";

import type { Locale } from "@/content/i18n/locale";
import { parseLocaleParam } from "@/content/i18n/parse-locale";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";

import { buildStaticPageMetadata } from "./static-page-metadata";
import type { PAGE_SEO } from "./page-seo-copy";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

type LocaleStaticPageOptions = {
  heroPath?: string;
  revalidate?: number;
};

export function createLocaleStaticPage(
  section: keyof typeof PAGE_SEO,
  basePath: string,
  View: ComponentType<{ locale: Locale }>,
  options?: LocaleStaticPageOptions,
) {
  async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
    const locale = parseLocaleParam((await params).locale);
    return buildStaticPageMetadata(section, locale, basePath);
  }

  async function Page({ params }: LocalePageProps) {
    const locale = parseLocaleParam((await params).locale);
    if (options?.heroPath) {
      preloadRouteHeroImage(options.heroPath);
    }
    return <View locale={locale} />;
  }

  return {
    generateMetadata,
    default: Page,
    ...(options?.revalidate != null ? { revalidate: options.revalidate } : {}),
  };
}
