"use client";

import { useEffect, useId, useRef } from "react";

import styles from "./footer.module.scss";

const DREAMJOB_URL = "https://dreamjob.ru/employers/115837";
const WIDGET_SRC = "https://dreamjob.ru/widget/get-widget?id=2918";

/** Бейдж рейтинга Dream Job — грузится при каждом mount (в т.ч. /en). */
export function DreamJobRatingWidget() {
  const slotRef = useRef<HTMLDivElement>(null);
  const reactId = useId();
  const slotId = `wg-dj-2918-${reactId.replace(/:/g, "")}`;

  useEffect(() => {
    const el = slotRef.current;
    if (!el || el.dataset.loaded === "1") return;
    el.dataset.loaded = "1";

    let cancelled = false;
    fetch(WIDGET_SRC)
      .then((r) => r.text())
      .then((html) => {
        if (cancelled || !slotRef.current) return;
        const cleaned = html
          .replace(/\/\*\s*margin:\s*0\s+auto;\s*\*\//gi, "")
          .replace(/margin:\s*0\s+auto;\s*/gi, "");
        slotRef.current.innerHTML = cleaned;
        const child = slotRef.current.firstElementChild as HTMLElement | null;
        if (child) child.style.margin = "0";
      })
      .catch(() => {
        if (cancelled || !slotRef.current) return;
        slotRef.current.textContent = "Employee reviews on Dream Job";
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <a
      className={styles.dreamJobWidget}
      href={DREAMJOB_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Engineering Center of Railway Transport: employee reviews on Dream Job"
    >
      <div ref={slotRef} data-id={slotId} suppressHydrationWarning />
    </a>
  );
}
