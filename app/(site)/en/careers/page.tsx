import type { Metadata } from "next";

import { CareersPageView } from "@/features/careers/CareersPageView";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.careers.en.title,
  description: PAGE_SEO.careers.en.description,
  path: "/en/careers",
  locale: "en_US",
  alternates: {
    canonical: "/en/careers",
    languages: {
      "ru-RU": "/careers",
      en: "/en/careers",
    },
  },
});

export default function EnCareersPage() {
  preloadRouteHeroImage("/careers");
  return <CareersPageView locale="en" />;
}
