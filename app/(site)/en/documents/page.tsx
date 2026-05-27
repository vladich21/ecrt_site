import type { Metadata } from "next";

import { documents } from "@/data/ecrtSite";
import { DocumentsPageView } from "@/features/documents/DocumentsPageView";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.documents.en.title,
  description: PAGE_SEO.documents.en.description,
  path: "/en/documents",
  locale: "en_US",
  alternates: {
    canonical: "/en/documents",
    languages: {
      "ru-RU": "/documents",
      en: "/en/documents",
    },
  },
});

export default function EnDocumentsPage() {
  return <DocumentsPageView locale="en" documents={documents} />;
}
