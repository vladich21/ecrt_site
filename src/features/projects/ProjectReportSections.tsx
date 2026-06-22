"use client";

import type { ReactNode } from "react";

import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

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
  bulletsPlacement?: "inline" | "slot";
  bulletsAfterLeadParagraph?: boolean;
  paddingTopPx?: number;
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
        <ScrollRevealSection
          key={section.id}
          className={styles.strReportSection}
          style={section.paddingTopPx != null ? { paddingTop: `${section.paddingTopPx}px` } : undefined}
          aria-labelledby={`${ariaIdPrefix}-${section.id}-heading`}
        >
          <ScrollRevealBlock>
            <header className={styles.strReportSectionHead}>
              <h2 id={`${ariaIdPrefix}-${section.id}-heading`} className={styles.strReportTitle}>
                {section.title}
              </h2>
              <span className={styles.strReportTitleRule} aria-hidden />
            </header>
          </ScrollRevealBlock>

          {section.paragraphs?.length ? (
            <ScrollRevealBlock>
              {(section.bulletsAfterLeadParagraph ? section.paragraphs.slice(0, 1) : section.paragraphs).map(
                (paragraph) => (
                  <p key={paragraph} className={styles.strReportParagraph}>
                    {paragraph}
                  </p>
                ),
              )}
            </ScrollRevealBlock>
          ) : null}

          {sectionSlots?.[section.id] ? (
            <ScrollRevealBlock>{sectionSlots[section.id]}</ScrollRevealBlock>
          ) : null}

          {section.bullets &&
          section.bullets.length > 0 &&
          section.bulletsPlacement !== "slot" ? (
            <ScrollRevealBlock>
              {section.bulletLayout === "focusGrid" ? (
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
              )}
            </ScrollRevealBlock>
          ) : null}

          {section.bulletsAfterLeadParagraph && section.paragraphs && section.paragraphs.length > 1 ? (
            <ScrollRevealBlock>
              {section.paragraphs.slice(1).map((paragraph) => (
                <p key={paragraph} className={styles.strReportParagraph}>
                  {paragraph}
                </p>
              ))}
            </ScrollRevealBlock>
          ) : null}

          {section.metrics && section.metrics.length > 0 ? (
            <ScrollRevealBlock>
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
            </ScrollRevealBlock>
          ) : null}
        </ScrollRevealSection>
      ))}
    </div>
  );
}
