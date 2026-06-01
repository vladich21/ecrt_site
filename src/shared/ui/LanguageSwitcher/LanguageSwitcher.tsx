"use client";

import { usePathname, useRouter } from "next/navigation";

import { saveLocaleScrollPosition } from "@/shared/layout/SiteShell/locale-scroll";
import {
  localeFromPathname,
  t,
  withLocalePath,
  type Locale,
} from "@/shared/layout/SiteShell/site-shell-utils";

import styles from "./language-switcher.module.scss";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const current = localeFromPathname(pathname);

  const switchLocale = (locale: Locale) => {
    if (locale === current) return;
    const targetPath = withLocalePath(pathname, locale);
    saveLocaleScrollPosition(targetPath);
    router.push(targetPath, { scroll: false });
  };

  return (
    <div className={styles.wrap} role="group" aria-label={t("a11y.languageChoice", current)}>
      <button
        type="button"
        className={current === "ru" ? styles.active : undefined}
        lang="ru"
        aria-pressed={current === "ru"}
        onClick={() => switchLocale("ru")}
      >
        {t("lang.ru", current)}
      </button>
      <span className={styles.sep} aria-hidden>
        |
      </span>
      <button
        type="button"
        className={current === "en" ? styles.active : undefined}
        lang="en"
        aria-pressed={current === "en"}
        onClick={() => switchLocale("en")}
      >
        {t("lang.en", current)}
      </button>
    </div>
  );
}
