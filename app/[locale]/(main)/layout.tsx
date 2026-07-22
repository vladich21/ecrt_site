import type { ReactNode } from "react";

import { parseLocaleParam } from "@/content/i18n/parse-locale";
import { SiteShell } from "@/shared/layout/SiteShell/SiteShell";
import { SiteJsonLd } from "@/shared/seo/site-jsonld";

export default async function MainLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocaleParam((await params).locale);

  return (
    <>
      <SiteJsonLd locale={locale} />
      <SiteShell locale={locale}>{children}</SiteShell>
    </>
  );
}
