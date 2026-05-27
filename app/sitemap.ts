import type { MetadataRoute } from "next";

import { getAllProjectSlugs } from "@/features/projects/project-slugs";
import { getPublicSiteOrigin } from "@/shared/seo/build-page-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getPublicSiteOrigin();

  const staticRoutes = [
    "/",
    "/en",
    "/about-us",
    "/en/about-us",
    "/projects",
    "/en/projects",
    "/careers",
    "/en/careers",
    "/purchase",
    "/en/purchase",
    "/documents",
    "/en/documents",
    "/contacts",
    "/en/contacts",
    "/privacy-policy",
    "/en/privacy-policy",
  ];

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "/" ? 1 : 0.8,
  }));

  const projectEntries = getAllProjectSlugs().flatMap((slug) => [
    {
      url: `${baseUrl}/project/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/en/project/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  return [...staticEntries, ...projectEntries];
}
