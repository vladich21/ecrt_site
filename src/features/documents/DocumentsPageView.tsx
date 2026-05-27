import type { SiteDocumentLink } from "@/data/ecrtSite";

import { DocumentsPageClient } from "./DocumentsPageClient";

type Locale = "ru" | "en";

type DocumentsPageViewProps = {
  locale?: Locale;
  documents: readonly SiteDocumentLink[];
};

export function DocumentsPageView({ locale = "ru", documents: docList }: DocumentsPageViewProps) {
  return <DocumentsPageClient locale={locale} documents={docList} />;
}
