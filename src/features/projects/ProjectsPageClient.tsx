"use client";

import projectsHeroImage from "@/assets/presentation/проекты.webp";
import { activityGroups } from "@/data/ecrtSite";
import homeEn from "@/locales/en/home.json";
import homeRu from "@/locales/ru/home.json";
import projectsEn from "@/locales/en/projects.json";
import projectsRu from "@/locales/ru/projects.json";

import { ProjectProductShowcase } from "@/features/home/sections/ProjectProductShowcase";
import {
  directionDetailPath,
  directionHasDetailPage,
} from "@/features/projects/direction-detail-locale";
import { PageHero } from "@/shared/ui/PageHero/PageHero";
import { ScrollRevealBlock } from "@/shared/motion/ScrollReveal";

import siteStyles from "@/shared/ui/SitePageShell/site-page-shell.module.scss";

import { DirectionsThemeAccordion, type ThemeGroup } from "./DirectionsThemeAccordion";
import styles from "./projects-page.module.scss";

export type ProjectsPageLocale = "ru" | "en";

type ProjectsCopy = typeof projectsRu;

function directionGroupsForLocale(locale: ProjectsPageLocale): ThemeGroup[] {
  if (locale === "ru") {
    return activityGroups.map((group) => ({
      id: group.id,
      title: group.title,
      summary: group.summary,
      href: directionHasDetailPage(group)
        ? directionDetailPath(group.id, locale)
        : undefined,
    }));
  }

  const groups = projectsEn.directions.groups as Record<
    string,
    { title: string; detail: string }
  >;
  return activityGroups.map((group) => {
    const en = groups[group.id];
    return {
      id: group.id,
      title: en?.title ?? group.title,
      summary: en?.detail ?? group.summary,
      href: directionHasDetailPage(group)
        ? directionDetailPath(group.id, locale)
        : undefined,
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
          <section
            className={`${styles.section} ${styles.directionsSection}`}
            aria-labelledby="projects-directions-heading"
          >
            <ScrollRevealBlock revealEarly className={`${styles.sectionHead} ${styles.directionsIntro}`}>
              <h2 className={styles.directionsPageTitle} id="projects-directions-heading">
                {copy.directions.title}
              </h2>
              <span className={styles.sectionRule} aria-hidden />
              {copy.directions.intro.trim().length > 0 ? (
                <p className={styles.directionsLead}>{copy.directions.intro}</p>
              ) : null}
            </ScrollRevealBlock>
            <ScrollRevealBlock inView>
              <DirectionsThemeAccordion
                groups={directionGroups}
                moreLabel={copy.directions.moreCta}
              />
            </ScrollRevealBlock>
          </section>

          <section
            className={`${siteStyles.sectionOpen} ${siteStyles.block1268}`}
            aria-labelledby="projects-showcase-heading"
          >
            <ScrollRevealBlock revealEarly className={siteStyles.projectsSectionIntro}>
              <h2 className={styles.projectsShowcaseTitle} id="projects-showcase-heading">
                {copy.showcase.title}
              </h2>
              <span className={siteStyles.sectionTitleRule} aria-hidden />
            </ScrollRevealBlock>
            <ProjectProductShowcase
              ctaLabel={homeBundle.projects.ctaMore}
              projectsSection={homeBundle.projects}
              locale={locale}
              revealOnScroll
            />
          </section>
        </div>
      </div>
    </div>
  );
}
