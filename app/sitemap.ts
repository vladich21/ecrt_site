import type { MetadataRoute } from "next";

import { LOCALES } from "@/content/i18n/locale";
import { publicPathForLocale } from "@/content/i18n/routing";
import { getDirectionIdsWithDetailPage } from "@/features/projects/direction-detail-locale";
import { getAllProjectSlugs } from "@/features/projects/project-slugs";
import { getPublicSiteOrigin } from "@/shared/seo/build-page-metadata";

const STATIC_BASE_PATHS = [
  "/",
  "/about-us",
  "/projects",
  "/careers",
  "/purchase",
  "/documents",
  "/contacts",
  "/privacy-policy",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getPublicSiteOrigin();

  const staticEntries = LOCALES.flatMap((locale) =>
    STATIC_BASE_PATHS.map((basePath) => ({
      url: `${baseUrl}${publicPathForLocale(locale, basePath)}`,
      changeFrequency: "weekly" as const,
      priority: basePath === "/" ? 1 : 0.8,
    })),
  );

  const projectEntries = LOCALES.flatMap((locale) =>
    getAllProjectSlugs().map((slug) => ({
      url: `${baseUrl}${publicPathForLocale(locale, `/project/${slug}`)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  const directionEntries = LOCALES.flatMap((locale) =>
    getDirectionIdsWithDetailPage().map((directionId) => ({
      url: `${baseUrl}${publicPathForLocale(locale, `/projects/direction/${directionId}`)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  );

  return [...staticEntries, ...projectEntries, ...directionEntries];
}
