"use client";

import { motion } from "framer-motion";

import siteStyles from "@/shared/ui/SitePageShell/site-page-shell.module.scss";

import type homeRu from "@/locales/ru/home.json";

import { ease } from "../about-page-motion";
import { DevelopmentTimeline } from "./DevelopmentTimeline/DevelopmentTimeline";

export function AboutChronologySection({ homeCopy }: { homeCopy: typeof homeRu }) {
  return (
    <motion.section
      className={siteStyles.chronologyFullBleed}
      id="chronology"
      aria-labelledby="chronology-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.45, ease }}
      viewport={{ once: true, margin: "-40px" }}
    >
      <div className={siteStyles.chronologyInner}>
        <header className={siteStyles.chronologyIntro}>
          <h2 className={siteStyles.chronologyTitle} id="chronology-heading">
            {homeCopy.chronology.title}
          </h2>
          {typeof homeCopy.chronology.body === "string" && homeCopy.chronology.body.trim() !== "" ? (
            <p className={siteStyles.chronologyLead}>{homeCopy.chronology.body}</p>
          ) : null}
        </header>
        <DevelopmentTimeline homeCopy={homeCopy} />
      </div>
    </motion.section>
  );
}
