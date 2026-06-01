"use client";

import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

import type { AboutCopy } from "../about-types";
import styles from "../about-page.module.scss";

export function AboutPillarsSection({ aboutCopy }: { aboutCopy: AboutCopy }) {
  return (
    <ScrollRevealSection className={styles.pillars} aria-labelledby="about-pillars-heading">
      <ScrollRevealBlock className={`${styles.sectionHead} ${styles.pillarsHead}`}>
        <h2 className={styles.pillarsHeading} id="about-pillars-heading">
          {aboutCopy.pillars.title}
        </h2>
        <span className={styles.pillarsHeadRule} aria-hidden />
        {aboutCopy.pillars.subtitle.trim() ? (
          <p className={styles.sectionSubtitle}>{aboutCopy.pillars.subtitle}</p>
        ) : null}
      </ScrollRevealBlock>
      <ul className={styles.pillarGrid}>
        {aboutCopy.pillars.items.map((text, index) => (
          <li key={text} className={styles.pillarCard}>
            <ScrollRevealBlock inView fadeOnly>
              <span className={styles.storyBlockIndex} aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className={styles.pillarText}>{text}</p>
            </ScrollRevealBlock>
          </li>
        ))}
      </ul>
    </ScrollRevealSection>
  );
}
