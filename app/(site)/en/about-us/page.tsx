import type { Metadata } from "next";

import { AboutPageView } from "@/features/company/AboutPageView";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.about.en.title,
  description: PAGE_SEO.about.en.description,
  path: "/en/about-us",
  locale: "en_US",
  alternates: {
    canonical: "/en/about-us",
    languages: {
      "ru-RU": "/about-us",
      en: "/en/about-us",
    },
  },
});

export default function EnAboutPage() {
  preloadRouteHeroImage("/about-us");
  return <AboutPageView locale="en" />;
}
