import type { Metadata } from "next";

import { HomePageView } from "@/features/home/HomePageView";
import { preloadPageImages } from "@/shared/images/page-image-preload";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";
import { SiteJsonLd } from "@/shared/seo/site-jsonld";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.home.ru.title,
  description: PAGE_SEO.home.ru.description,
  path: "/",
  alternates: {
    canonical: "/",
    languages: {
      "ru-RU": "/",
      en: "/en",
    },
  },
});

export default function HomePage() {
  preloadPageImages("/");

  return (
    <>
      <SiteJsonLd locale="ru" />
      <HomePageView />
    </>
  );
}
