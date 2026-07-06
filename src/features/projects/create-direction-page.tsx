import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LOCALES, type Locale } from "@/content/i18n/locale";
import { parseLocaleParam } from "@/content/i18n/parse-locale";
import { publicPathForLocale } from "@/content/i18n/routing";

import { DirectionDetailView } from "@/features/projects/DirectionDetailView";
import {
  getDirectionIdsWithDetailPage,
  getLocalizedDirection,
  type DirectionLocale,
} from "@/features/projects/direction-detail-locale";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";

export const revalidate = 86400;

export const dynamicParams = false;

type DirectionPageProps = {
  params: Promise<{ locale: string; directionId: string }>;
};

function directionAlternates(directionId: string, locale: Locale) {
  const path = publicPathForLocale(locale, `/projects/direction/${directionId}`);
  return {
    canonical: path,
    languages: {
      "ru-RU": publicPathForLocale("ru", `/projects/direction/${directionId}`),
      en: publicPathForLocale("en", `/projects/direction/${directionId}`),
    },
  };
}

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
      alternates: directionAlternates(directionId, locale),
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

    return <DirectionDetailView directionId={directionId} locale={locale} />;
  }

  return {
    generateStaticParams,
    generateMetadata,
    default: DirectionSlugPage,
  };
}
