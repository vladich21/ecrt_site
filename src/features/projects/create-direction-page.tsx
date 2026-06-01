import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DirectionDetailView } from "@/features/projects/DirectionDetailView";
import {
  getDirectionIdsWithDetailPage,
  getLocalizedDirection,
  type DirectionLocale,
} from "@/features/projects/direction-detail-locale";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { trimDescription } from "@/shared/seo/page-seo-copy";

export const revalidate = 86400;

export const dynamicParams = false;

type DirectionPageProps = {
  params: Promise<{ directionId: string }>;
};

export function createDirectionPage(locale: DirectionLocale) {
  const pathPrefix = locale === "en" ? "/en" : "";

  function generateStaticParams() {
    return getDirectionIdsWithDetailPage().map((directionId) => ({ directionId }));
  }

  async function generateMetadata({ params }: DirectionPageProps): Promise<Metadata> {
    const { directionId } = await params;
    const direction = getLocalizedDirection(directionId, locale);
    if (!direction) {
      return {};
    }

    const title = `${direction.title} | ECRT`;
    const description = trimDescription(direction.summary);
    const path = `${pathPrefix}/projects/direction/${directionId}`;

    return buildPageMetadata({
      title,
      description,
      path,
      locale: locale === "en" ? "en_US" : "ru_RU",
      alternates:
        locale === "en"
          ? {
              canonical: path,
              languages: {
                "ru-RU": `/projects/direction/${directionId}`,
                en: path,
              },
            }
          : {
              canonical: path,
              languages: {
                "ru-RU": path,
                en: `/en/projects/direction/${directionId}`,
              },
            },
    });
  }

  async function DirectionSlugPage({ params }: DirectionPageProps) {
    const { directionId } = await params;
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
