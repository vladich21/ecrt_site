"use client";

import { motion } from "framer-motion";

import { fadeUpItem, pillarItem, pillarStagger, sectionReveal } from "../about-page-motion";
import type { AboutCopy } from "../about-types";
import styles from "../about-page.module.scss";

export function AboutPillarsSection({ aboutCopy }: { aboutCopy: AboutCopy }) {
  return (
    <motion.section
      className={styles.pillars}
      aria-labelledby="about-pillars-heading"
      initial="hidden"
      whileInView="visible"
      variants={sectionReveal}
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
    >
      <motion.div className={`${styles.sectionHead} ${styles.pillarsHead}`} variants={fadeUpItem}>
        <h2 className={styles.pillarsHeading} id="about-pillars-heading">
          {aboutCopy.pillars.title}
        </h2>
        <span className={styles.pillarsHeadRule} aria-hidden />
        {aboutCopy.pillars.subtitle.trim() ? (
          <p className={styles.sectionSubtitle}>{aboutCopy.pillars.subtitle}</p>
        ) : null}
      </motion.div>
      <motion.ul className={styles.pillarGrid} variants={pillarStagger}>
        {aboutCopy.pillars.items.map((text, index) => (
          <motion.li key={text} className={styles.pillarCard} variants={pillarItem}>
            <span className={styles.storyBlockIndex} aria-hidden>
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className={styles.pillarText}>{text}</p>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
}
