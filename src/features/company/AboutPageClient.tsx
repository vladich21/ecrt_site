"use client";

import { motion } from "framer-motion";

import aboutEn from "@/locales/en/about.json";
import aboutRu from "@/locales/ru/about.json";
import homeEn from "@/locales/en/home.json";
import homeRu from "@/locales/ru/home.json";

import styles from "./about-page.module.scss";
import type { AboutLocale } from "./about-types";
import { AboutChronologySection } from "./sections/AboutChronologySection";
import { AboutHeroSection } from "./sections/AboutHeroSection";
import { AboutLeadershipSection } from "./sections/AboutLeadershipSection";
import { AboutPillarsSection } from "./sections/AboutPillarsSection";

export function AboutPageClient({ locale = "ru" }: { locale?: AboutLocale }) {
  const aboutCopy = locale === "en" ? aboutEn : aboutRu;
  const homeCopy = locale === "en" ? homeEn : homeRu;

  return (
    <motion.div className={styles.aboutRoot}>
      <AboutHeroSection aboutCopy={aboutCopy} />

      <AboutChronologySection homeCopy={homeCopy} />

      <div className={styles.contentShell}>
        <div className={styles.wrap}>
          <AboutPillarsSection aboutCopy={aboutCopy} />
          <AboutLeadershipSection aboutCopy={aboutCopy} />
        </div>
      </div>
    </motion.div>
  );
}
