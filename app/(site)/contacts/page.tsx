import type { Metadata } from "next";

import { ContactsPageView } from "@/features/contacts/ContactsPageView";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.contacts.ru.title,
  description: PAGE_SEO.contacts.ru.description,
  path: "/contacts",
  alternates: {
    canonical: "/contacts",
    languages: {
      "ru-RU": "/contacts",
      en: "/en/contacts",
    },
  },
});

export default function ContactsPage() {
  return <ContactsPageView locale="ru" />;
}
