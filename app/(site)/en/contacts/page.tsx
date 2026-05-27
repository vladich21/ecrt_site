import type { Metadata } from "next";

import { ContactsPageView } from "@/features/contacts/ContactsPageView";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.contacts.en.title,
  description: PAGE_SEO.contacts.en.description,
  path: "/en/contacts",
  locale: "en_US",
  alternates: {
    canonical: "/en/contacts",
    languages: {
      "ru-RU": "/contacts",
      en: "/en/contacts",
    },
  },
});

export default function EnContactsPage() {
  return <ContactsPageView locale="en" />;
}
