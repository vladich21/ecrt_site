import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LOCALES } from "@/content/i18n/locale";
import { parseLocaleParam } from "@/content/i18n/parse-locale";
import { publicPathForLocale } from "@/content/i18n/routing";

import { DirectionBreadcrumbJsonLd } from "@/features/projects/direction-breadcrumb-jsonld";
import { DirectionDetailView } from "@/features/projects/DirectionDetailView";
import {
  getDirectionIdsWithDetailPage,
  getLocalizedDirection,
  type DirectionLocale,
} from "@/features/projects/direction-detail-locale";
import { buildPageMetadata, getPublicSiteOrigin } from "@/shared/seo/build-page-metadata";
import { languageAlternatesForLocale } from "@/shared/seo/hreflang";

export const revalidate = 86400;

export const dynamicParams = false;

type DirectionPageProps = {
  params: Promise<{ locale: string; directionId: string }>;
};

export function createDirectionPage() {
  function generateStaticParams() {
    return LOCALES.flatMap((locale) =>
      getDirectionIdsWithDetailPage().map((directionId) => ({ locale, directionId })),
    );
  }

  async function generateMetadata({ params }: DirectionPageProps): Promise<Metadata> {
    const { locale: rawLocale, directionId } = await params;
    const locale = parseLocaleParam(rawLocale) as DirectionLocale;
    const direction = getLocalizedDirection(directionId, locale);
    if (!direction) {
      return {};
    }

    return buildPageMetadata({
      title: `${direction.title} | ECRT`,
      description: direction.summary,
      path: publicPathForLocale(locale, `/projects/direction/${directionId}`),
      locale: locale === "en" ? "en_US" : "ru_RU",
      alternates: languageAlternatesForLocale(locale, `/projects/direction/${directionId}`),
    });
  }

  async function DirectionSlugPage({ params }: DirectionPageProps) {
    const { locale: rawLocale, directionId } = await params;
    const locale = parseLocaleParam(rawLocale) as DirectionLocale;

    if (!getDirectionIdsWithDetailPage().includes(directionId)) {
      notFound();
    }

    const direction = getLocalizedDirection(directionId, locale);
    if (!direction) {
      notFound();
    }

    return (
      <>
        <DirectionBreadcrumbJsonLd
          baseUrl={getPublicSiteOrigin()}
          directionId={directionId}
          directionTitle={direction.title}
          locale={locale}
        />
        <DirectionDetailView directionId={directionId} locale={locale} />
      </>
    );
  }

  return {
    generateStaticParams,
    generateMetadata,
    default: DirectionSlugPage,
  };
}
