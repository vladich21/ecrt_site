"use client";

import Link from "next/link";
import { useMemo } from "react";

import type { BreadcrumbEntry } from "@/data/breadcrumbItems";

import { withLocalePath } from "../SiteShell/site-shell-utils";
import styles from "./breadcrumbs.module.scss";

type BreadcrumbsProps = {
  variant?: "default" | "hero" | "compact";
  items: BreadcrumbEntry[];
  locale: "ru" | "en";
  ariaLabel: string;
};

export function Breadcrumbs({
  variant = "default",
  items,
  locale,
  ariaLabel,
}: BreadcrumbsProps) {
  const rootClass = useMemo(
    () =>
      [
        styles.nav,
        "pl-extra",
        variant === "hero" || variant === "compact" ? styles.navCompact : "",
        variant === "hero" ? styles.navOnHero : "",
      ]
        .filter(Boolean)
        .join(" "),
    [variant],
  );

  if (items.length === 0) return null;

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
