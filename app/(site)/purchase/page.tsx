import type { Metadata } from "next";

import { PurchasePageView } from "@/features/purchase/PurchasePageView";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.purchase.ru.title,
  description: PAGE_SEO.purchase.ru.description,
  path: "/purchase",
  alternates: {
    canonical: "/purchase",
    languages: {
      "ru-RU": "/purchase",
      en: "/en/purchase",
    },
  },
});

export default function PurchasePage() {
  preloadRouteHeroImage("/purchase");
  return <PurchasePageView />;
}
