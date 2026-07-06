import type { ReactNode } from "react";

import { parseLocaleParam } from "@/content/i18n/parse-locale";
import { ProjectHeroPreload } from "@/shared/images/ProjectHeroPreload";
import { SiteShell } from "@/shared/layout/SiteShell/SiteShell";

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
      <ProjectHeroPreload />
      <SiteShell locale={locale}>{children}</SiteShell>
    </>
  );
}
