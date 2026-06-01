import type { Metadata } from "next";

import { AboutPageView } from "@/features/company/AboutPageView";
import { preloadPageImages } from "@/shared/images/page-image-preload";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.about.ru.title,
  description: PAGE_SEO.about.ru.description,
  path: "/about-us",
  alternates: {
    canonical: "/about-us",
    languages: {
      "ru-RU": "/about-us",
      en: "/en/about-us",
    },
  },
});

export default function AboutPage() {
  preloadRouteHeroImage("/about-us");
  preloadPageImages("/about-us");
  return <AboutPageView />;
}
