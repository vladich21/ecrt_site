import type { Metadata } from "next";

import { parseLocaleParam } from "@/content/i18n/parse-locale";
import { HomePageView } from "@/features/home/HomePageView";
import { buildStaticPageMetadata } from "@/shared/seo/static-page-metadata";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = parseLocaleParam((await params).locale);
  return buildStaticPageMetadata("home", locale, "/");
}

export default async function HomePage({ params }: PageProps) {
  const locale = parseLocaleParam((await params).locale);
  return <HomePageView locale={locale} />;
}
