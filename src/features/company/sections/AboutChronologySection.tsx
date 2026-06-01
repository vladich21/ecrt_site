"use client";

import { ScrollRevealBlock } from "@/shared/motion/ScrollReveal";
import siteStyles from "@/shared/ui/SitePageShell/site-page-shell.module.scss";

import type homeRu from "@/locales/ru/home.json";

import { DevelopmentTimeline } from "./DevelopmentTimeline/DevelopmentTimeline";

export function AboutChronologySection({ homeCopy }: { homeCopy: typeof homeRu }) {
  return (
    <section
      className={siteStyles.chronologyFullBleed}
      id="chronology"
      aria-labelledby="chronology-heading"
    >
      <div className={siteStyles.chronologyInner}>
        <ScrollRevealBlock revealEarly className={siteStyles.chronologyIntro}>
          <h2 className={siteStyles.chronologyTitle} id="chronology-heading">
            {homeCopy.chronology.title}
          </h2>
          {typeof homeCopy.chronology.body === "string" && homeCopy.chronology.body.trim() !== "" ? (
            <p className={siteStyles.chronologyLead}>{homeCopy.chronology.body}</p>
          ) : null}
        </ScrollRevealBlock>
        <DevelopmentTimeline homeCopy={homeCopy} />
      </div>
    </section>
  );
}
