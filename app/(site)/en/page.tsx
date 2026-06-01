import type { Metadata } from "next";

import { HomePageView } from "@/features/home/HomePageView";
import { preloadPageImages } from "@/shared/images/page-image-preload";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";
import { SiteJsonLd } from "@/shared/seo/site-jsonld";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.home.en.title,
  description: PAGE_SEO.home.en.description,
  path: "/en",
  locale: "en_US",
  alternates: {
    canonical: "/en",
    languages: {
      "ru-RU": "/",
      en: "/en",
    },
  },
});

export default function EnHomePage() {
  preloadPageImages("/");

  return (
    <>
      <SiteJsonLd locale="en" />
      <HomePageView locale="en" />
    </>
  );
}
