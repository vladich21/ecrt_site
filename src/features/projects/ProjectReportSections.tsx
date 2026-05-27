import type { ReactNode } from "react";

import styles from "./project-detail.module.scss";

export type ProjectReportMetric = {
  value: string;
  unit: string;
  label: string;
};

export type ProjectReportSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  metrics?: ProjectReportMetric[];
  bulletLayout?: "list" | "focusGrid";
  /** Пункты рендерятся в sectionSlots, а не в общем шаблоне секции */
  bulletsPlacement?: "inline" | "slot";
  /** Группировка intro/details для составных страниц */
  group?: "intro" | "details";
};

type ProjectReportSectionsProps = {
  sections: ProjectReportSection[];
  ariaIdPrefix: string;
  continued?: boolean;
  sectionSlots?: Record<string, ReactNode>;
};

export function ProjectReportSections({
  sections,
  ariaIdPrefix,
  continued = false,
  sectionSlots,
}: ProjectReportSectionsProps) {
  const shellClassName = continued
    ? `${styles.strReportShell} ${styles.strReportShellContinued}`
    : styles.strReportShell;

  return (
    <div className={shellClassName}>
      {sections.map((section) => (
        <section
          key={section.id}
          className={styles.strReportSection}
          aria-labelledby={`${ariaIdPrefix}-${section.id}-heading`}
        >
          <header className={styles.strReportSectionHead}>
            <h2 id={`${ariaIdPrefix}-${section.id}-heading`} className={styles.strReportTitle}>
              {section.title}
            </h2>
            <span className={styles.strReportTitleRule} aria-hidden />
          </header>

          {section.paragraphs?.map((paragraph) => (
            <p key={paragraph} className={styles.strReportParagraph}>
              {paragraph}
            </p>
          ))}

          {sectionSlots?.[section.id]}

          {section.bullets &&
          section.bullets.length > 0 &&
          section.bulletsPlacement !== "slot" ? (
            section.bulletLayout === "focusGrid" ? (
              <ul className={styles.strFocusGrid}>
                {section.bullets.map((bullet, pillarIndex) => (
                  <li key={bullet} className={styles.strFocusItem}>
                    <span className={styles.strFocusDigit} aria-hidden>
                      {(pillarIndex + 1).toString().padStart(2, "0")}
                    </span>
                    <p className={styles.strFocusItemText}>{bullet}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className={styles.strReportList}>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            )
          ) : null}

          {section.metrics && section.metrics.length > 0 ? (
            <ul className={styles.strMetricsGrid}>
              {section.metrics.map((metric) => (
                <li key={metric.label} className={styles.strMetricItem}>
                  <p className={styles.strMetricValue}>
                    <span className={styles.strMetricNumber}>{metric.value}</span>
                    {metric.unit ? <span className={styles.strMetricUnit}>{metric.unit}</span> : null}
                  </p>
                  <p className={styles.strMetricLabel}>{metric.label}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}
    </div>
  );
}
