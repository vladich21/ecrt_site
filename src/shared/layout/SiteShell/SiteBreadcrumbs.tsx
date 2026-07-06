"use client";

import { usePathname } from "next/navigation";

import {
  breadcrumbsHideTrailingCurrent,
  breadcrumbsOverDarkHero,
  breadcrumbsOverlayLayout,
  getBreadcrumbEntries,
} from "@/data/breadcrumbItems";
import type { Locale } from "@/content/i18n/locale";
import { stripLocalePrefix, t } from "@/shared/layout/SiteShell/site-shell-utils";
import { Breadcrumbs } from "@/shared/layout/Breadcrumbs/Breadcrumbs";

import styles from "./site-shell.module.scss";

export function SiteBreadcrumbs({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const basePath = stripLocalePrefix(pathname);
  const crumbItems = getBreadcrumbEntries(basePath, (key: string) => t(key, locale), locale);

  if (crumbItems.length === 0) return null;

  const darkHero = breadcrumbsOverDarkHero(basePath);
  const overlayLayout = breadcrumbsOverlayLayout(basePath);
  const hideTrailingCrumb = breadcrumbsHideTrailingCurrent(basePath);
  const breadcrumbVariant = darkHero ? "hero" : overlayLayout ? "compact" : "default";
  const heroBackdrop = darkHero || overlayLayout;

  return (
    <div className={heroBackdrop ? styles.breadcrumbsOverHero : styles.breadcrumbsInFlow}>
      <Breadcrumbs
        variant={breadcrumbVariant}
        hideTrailingCurrent={hideTrailingCrumb}
        items={crumbItems}
        locale={locale}
        ariaLabel={t("breadcrumbs.a11y", locale)}
      />
    </div>
  );
}
