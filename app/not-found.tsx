import type { Metadata } from "next";

import { localeFromRequestHeaders } from "@/content/i18n/request-locale";
import { NotFoundPageView } from "@/features/not-found/NotFoundPageView";

export const metadata: Metadata = {
  title: "404",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function NotFound() {
  const locale = await localeFromRequestHeaders();
  return <NotFoundPageView locale={locale} />;
}
