"use client";

import { useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import {
  getBreadcrumbEntries,
  breadcrumbsOverDarkHero,
  breadcrumbsOverlayLayout,
  breadcrumbsHideTrailingCurrent,
} from "@/data/breadcrumbItems";
import { Breadcrumbs } from "@/shared/layout/Breadcrumbs/Breadcrumbs";
import { RouteHeroWarmup } from "@/shared/images/RouteHeroWarmup";
import { Footer } from "@/shared/layout/Footer/Footer";
import { Header } from "@/shared/layout/Header/Header";

import {
  consumeLocaleScrollPosition,
  restoreLocaleScrollPosition,
  scrollToPageTop,
} from "./locale-scroll";
import { localeFromPathname, stripLocalePrefix, t } from "./site-shell-utils";
import styles from "./site-shell.module.scss";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const basePath = stripLocalePrefix(pathname);

  const crumbItems = useMemo(
    () => getBreadcrumbEntries(basePath, (key: string) => t(key, locale), locale),
    [basePath, locale],
  );

  useLayoutEffect(() => {
    const scrollY = consumeLocaleScrollPosition(pathname);
    if (scrollY != null) {
      return restoreLocaleScrollPosition(scrollY);
    }

    if (!window.location.hash) {
      scrollToPageTop();
    }
  }, [pathname]);

  const hasBreadcrumbs = crumbItems.length > 0;
  const darkHero = breadcrumbsOverDarkHero(basePath);
  const overlayLayout = breadcrumbsOverlayLayout(basePath);
  const hideTrailingCrumb = breadcrumbsHideTrailingCurrent(basePath);
  const heroBackdrop = hasBreadcrumbs && (darkHero || overlayLayout);
  const breadcrumbVariant = darkHero ? "hero" : overlayLayout ? "compact" : "default";

  return (
    <div className={styles.page}>
      <a className="skipToMain" href="#main-content">
        {t("a11y.skipToContent", locale)}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className={styles.mainReveal}>
        {hasBreadcrumbs ? (
          <div
            className={heroBackdrop ? styles.breadcrumbsOverHero : styles.breadcrumbsInFlow}
          >
            <Breadcrumbs
              variant={breadcrumbVariant}
              hideTrailingCurrent={hideTrailingCrumb}
              items={crumbItems}
              locale={locale}
              ariaLabel={t("breadcrumbs.a11y", locale)}
            />
          </div>
        ) : null}
        {children}
      </main>
      <Footer locale={locale} />
      <RouteHeroWarmup />
    </div>
  );
}
