"use client";

import { motion } from "framer-motion";

import projectsHeroImage from "@/assets/presentation/проекты.webp";
import { activityGroups } from "@/data/ecrtSite";
import homeEn from "@/locales/en/home.json";
import homeRu from "@/locales/ru/home.json";
import projectsEn from "@/locales/en/projects.json";
import projectsRu from "@/locales/ru/projects.json";

import { itemVariants, listVariants } from "@/features/home/home-page-motion";
import { ProjectProductShowcase } from "@/features/home/sections/ProjectProductShowcase";
import { fadeUp, sectionReveal } from "@/shared/motion/presets";
import { PageHero } from "@/shared/ui/PageHero/PageHero";

import siteStyles from "@/shared/ui/SitePageShell/site-page-shell.module.scss";

import { DirectionsThemeAccordion, type ThemeGroup } from "./DirectionsThemeAccordion";
import styles from "./projects-page.module.scss";

export type ProjectsPageLocale = "ru" | "en";

type ProjectsCopy = typeof projectsRu;

function directionGroupsForLocale(locale: ProjectsPageLocale): ThemeGroup[] {
  if (locale === "ru") {
    return activityGroups.map((g) => ({
      id: g.id,
      title: g.title,
      detail: g.detail,
    }));
  }

  const groups = projectsEn.directions.groups as Record<
    string,
    { title: string; detail: string }
  >;
  return activityGroups.map((g) => {
    const en = groups[g.id];
    return {
      id: g.id,
      title: en?.title ?? g.title,
      detail: en?.detail ?? g.detail,
    };
  });
}

type Props = {
  locale: ProjectsPageLocale;
};

export function ProjectsPageView({ locale }: Props) {
  const copy = (locale === "en" ? projectsEn : projectsRu) as ProjectsCopy;
  const homeBundle = locale === "en" ? homeEn : homeRu;
  const directionGroups = directionGroupsForLocale(locale);

  return (
    <div className={styles.projectsRoot}>
      <PageHero
        image={projectsHeroImage}
        title={copy.hero.title}
        lead={copy.hero.tagline}
        headingId="projects-hero-heading"
        imageAlt={copy.hero.imageAlt}
        mediaClassName={styles.projectsHeroMedia}
        animateCopy
      />

      <div className={styles.contentShell}>
        <div className={styles.wrap}>
          <motion.section
            className={`${styles.section} ${styles.directionsSection}`}
            aria-labelledby="projects-directions-heading"
            initial="hidden"
            whileInView="visible"
            variants={sectionReveal}
            viewport={{ once: true, margin: "-60px", amount: 0.12 }}
          >
            <motion.div className={`${styles.sectionHead} ${styles.directionsIntro}`} variants={fadeUp}>
              <h2 className={styles.directionsPageTitle} id="projects-directions-heading">
                {copy.directions.title}
              </h2>
              <span className={styles.sectionRule} aria-hidden />
              {copy.directions.intro.trim().length > 0 ? (
                <p className={styles.directionsLead}>{copy.directions.intro}</p>
              ) : null}
            </motion.div>
            <motion.div variants={fadeUp}>
              <DirectionsThemeAccordion groups={directionGroups} />
            </motion.div>
          </motion.section>

          <motion.section
            className={siteStyles.sectionOpen}
            aria-labelledby="projects-showcase-heading"
            initial="hidden"
            whileInView="visible"
            variants={listVariants}
            viewport={{ once: true, margin: "-50px", amount: 0.08 }}
          >
            <div className={siteStyles.block1268}>
              <motion.div className={siteStyles.projectsSectionIntro} variants={itemVariants}>
                <h2 className={styles.projectsShowcaseTitle} id="projects-showcase-heading">
                  {copy.showcase.title}
                </h2>
                <span className={siteStyles.sectionTitleRule} aria-hidden />
              </motion.div>
              <ProjectProductShowcase
                ctaLabel={homeBundle.projects.ctaMore}
                projectsSection={homeBundle.projects}
                locale={locale}
              />
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}
