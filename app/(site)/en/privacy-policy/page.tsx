import type { Metadata } from "next";

import { PrivacyPolicyPageView } from "@/features/legal/PrivacyPolicyPageView";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.privacy.en.title,
  description: PAGE_SEO.privacy.en.description,
  path: "/en/privacy-policy",
  locale: "en_US",
  alternates: {
    canonical: "/en/privacy-policy",
    languages: {
      "ru-RU": "/privacy-policy",
      en: "/en/privacy-policy",
    },
  },
});

export default function EnPrivacyPolicyPage() {
  return <PrivacyPolicyPageView locale="en" />;
}
