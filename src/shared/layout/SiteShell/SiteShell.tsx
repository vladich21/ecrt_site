"use client";

import { useEffect, useLayoutEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import {
  getBreadcrumbEntries,
  breadcrumbsOverDarkHero,
  breadcrumbsOverlayLayout,
} from "@/data/breadcrumbItems";
import { Breadcrumbs } from "@/shared/layout/Breadcrumbs/Breadcrumbs";
import { RouteHeroPreloader } from "@/shared/images/RouteHeroPreloader";
import { CookieConsent } from "@/shared/ui/CookieConsent/CookieConsent";
import { SmoothScrollProvider } from "@/shared/scroll/SmoothScrollProvider";
import { Footer } from "@/shared/layout/Footer/Footer";
import { Header } from "@/shared/layout/Header/Header";

import {
  consumeLocaleScrollPosition,
  restoreLocaleScrollPosition,
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

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useLayoutEffect(() => {
    const scrollY = consumeLocaleScrollPosition();
    if (scrollY == null) return;
    return restoreLocaleScrollPosition(scrollY);
  }, [pathname]);

  const hasBreadcrumbs = crumbItems.length > 0;
  const darkHero = breadcrumbsOverDarkHero(basePath);
  const overlayLayout = breadcrumbsOverlayLayout(basePath);
  const heroBackdrop = hasBreadcrumbs && (darkHero || overlayLayout);
  const breadcrumbVariant = darkHero ? "hero" : overlayLayout ? "compact" : "default";

  return (
    <SmoothScrollProvider>
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
              items={crumbItems}
              locale={locale}
              ariaLabel={t("breadcrumbs.a11y", locale)}
            />
          </div>
        ) : null}
        {children}
      </main>
      <Footer locale={locale} />
      <RouteHeroPreloader />
      <CookieConsent />
    </div>
    </SmoothScrollProvider>
  );
}
