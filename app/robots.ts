import type { MetadataRoute } from "next";

import { getPublicSiteOrigin } from "@/shared/seo/build-page-metadata";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getPublicSiteOrigin();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
