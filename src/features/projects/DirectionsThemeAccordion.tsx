"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import styles from "./directions-accordion.module.scss";

export type ThemeGroup = {
  id: string;
  title: string;
  summary: string;
  href?: string;
};

type Props = {
  groups: readonly ThemeGroup[];
  moreLabel: string;
};

export function DirectionsThemeAccordion({ groups, moreLabel }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    setOpenId((prev) => {
      if (prev === null) return null;
      return groups.some((group) => group.id === prev) ? prev : null;
    });
  }, [groups]);

  const onToggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  if (!groups.length) return null;

  const activeIndex = openId === null ? -1 : groups.findIndex((group) => group.id === openId);
  const displayGroup = activeIndex >= 0 ? groups[activeIndex]! : groups[0]!;
  const counterFrom =
    activeIndex >= 0 ? String(activeIndex + 1).padStart(2, "0") : String(1).padStart(2, "0");
  const counterTo = String(groups.length).padStart(2, "0");

  return (
    <div className={styles.root}>
      <div className={styles.split}>
        <aside className={styles.sticky} aria-live="polite">
          <div key={displayGroup.id} className={styles.activeBlock}>
            <p className={styles.counter}>
              {counterFrom}&nbsp;-&nbsp;{counterTo}
            </p>
            <h3 className={styles.activeTitle}>{displayGroup.title}</h3>
          </div>
        </aside>

        <div className={styles.accordion}>
          {groups.map((group) => {
            const expanded = group.id === openId;
            return (
              <div key={group.id} className={styles.item}>
                <button
                  type="button"
                  id={`accordion-trigger-${group.id}`}
                  className={styles.trigger}
                  aria-expanded={expanded}
                  aria-controls={`accordion-panel-${group.id}`}
                  data-expanded={expanded}
                  onClick={() => onToggle(group.id)}
                >
                  <span className={styles.triggerLabel}>{group.title}</span>
                  <span className={styles.toggle} aria-hidden>
                    {expanded ? "\u2212" : "+"}
                  </span>
                </button>
                {expanded ? (
                  <div
                    id={`accordion-panel-${group.id}`}
                    role="region"
                    aria-labelledby={`accordion-trigger-${group.id}`}
                    className={styles.panelMotion}
                  >
                    <div className={styles.panel}>
                      <p className={styles.summary}>{group.summary}</p>
                      {group.href ? (
                        <Link className={styles.moreLink} href={group.href}>
                          {moreLabel}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
