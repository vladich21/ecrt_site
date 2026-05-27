import type { Metadata } from "next";

import { PurchasePageView } from "@/features/purchase/PurchasePageView";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.purchase.en.title,
  description: PAGE_SEO.purchase.en.description,
  path: "/en/purchase",
  locale: "en_US",
  alternates: {
    canonical: "/en/purchase",
    languages: {
      "ru-RU": "/purchase",
      en: "/en/purchase",
    },
  },
});

export default function EnPurchasePage() {
  preloadRouteHeroImage("/purchase");
  return <PurchasePageView locale="en" />;
}
