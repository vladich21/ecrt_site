import type { ReactNode } from "react";

import type { Locale } from "@/content/i18n/locale";
import { Footer } from "@/shared/layout/Footer/Footer";
import { Header } from "@/shared/layout/Header/Header";

import { SiteBreadcrumbs } from "./SiteBreadcrumbs";
import { SiteScrollRestore } from "./SiteScrollRestore";
import { t } from "./site-shell-utils";
import styles from "./site-shell.module.scss";

export function SiteShell({
  children,
  locale,
}: {
  children: ReactNode;
  locale: Locale;
}) {
  return (
    <div className={styles.page}>
      <SiteScrollRestore />
      <a className="skipToMain" href="#main-content">
        {t("a11y.skipToContent", locale)}
      </a>
      <Header />
      <main id="main-content" tabIndex={-1} className={styles.mainReveal}>
        <SiteBreadcrumbs locale={locale} />
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
}
