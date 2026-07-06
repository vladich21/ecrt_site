import Link from "next/link";

import type { BreadcrumbEntry } from "@/data/breadcrumbItems";
import type { Locale } from "@/content/i18n/locale";
import { withLocalePath } from "@/content/i18n/routing";

import styles from "./breadcrumbs.module.scss";

type BreadcrumbsProps = {
  variant?: "default" | "hero" | "compact";
  hideTrailingCurrent?: boolean;
  items: BreadcrumbEntry[];
  locale: Locale;
  ariaLabel: string;
};

export function Breadcrumbs({
  variant = "default",
  hideTrailingCurrent = false,
  items,
  locale,
  ariaLabel,
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  const rootClass = [
    styles.nav,
    "pl-extra",
    variant === "hero" || variant === "compact" ? styles.navCompact : "",
    variant === "hero" ? styles.navOnHero : "",
    hideTrailingCurrent ? styles.navHideTrailingCurrent : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass}>
      <nav aria-label={ariaLabel} className={styles.navInner}>
        <ol className={styles.list}>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {index > 0 ? (
                <span className={styles.sep} aria-hidden>
                  {" - "}
                </span>
              ) : null}
              {item.current ? (
                <span className={styles.current}>{item.label}</span>
              ) : item.to ? (
                <Link className={styles.link} href={withLocalePath(item.to, locale)}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current}>{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
