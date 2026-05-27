"use client";

import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import { motion } from "framer-motion";

import leadershipPhoto from "@/assets/about/kireytsev-general-director.webp";

import { fadeUpItem, sectionReveal } from "../about-page-motion";
import type { AboutCopy } from "../about-types";
import styles from "../about-page.module.scss";

export function AboutLeadershipSection({ aboutCopy }: { aboutCopy: AboutCopy }) {
  return (
    <motion.section
      className={styles.leadership}
      aria-labelledby="about-leadership-heading"
      initial="hidden"
      whileInView="visible"
      variants={sectionReveal}
      viewport={{ once: true, margin: "-50px", amount: 0.12 }}
    >
      <div className={styles.leadershipInner}>
        <motion.div className={styles.leadershipVisual} variants={fadeUpItem}>
          <div className={styles.leadershipPhotoWrap}>
            <span className={styles.leadershipPhotoMesh} aria-hidden />
            <figure className={styles.leadershipPhotoFigure}>
              <AssetImage
                className={styles.leadershipPhoto}
                src={leadershipPhoto}
                alt={aboutCopy.leadership.photoAlt}
                width={leadershipPhoto.width}
                height={leadershipPhoto.height}
                loading="lazy"
              />
            </figure>
          </div>
        </motion.div>

        <motion.div className={styles.leadershipBody} variants={fadeUpItem}>
          <h2 className={styles.leadershipName} id="about-leadership-heading">
            {aboutCopy.leadership.name}
          </h2>
          <span className={styles.pillarsHeadRule} aria-hidden />
          <p className={styles.leadershipRole}>{aboutCopy.leadership.role}</p>
          <div className={styles.pillarCard}>
            <p className={styles.pillarText}>{aboutCopy.leadership.quote}</p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
