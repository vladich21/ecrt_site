"use client";

import homeEn from "@/locales/en/home.json";
import homeRu from "@/locales/ru/home.json";
import commonEn from "@/locales/en/common.json";
import commonRu from "@/locales/ru/common.json";

import siteStyles from "@/shared/ui/SitePageShell/site-page-shell.module.scss";
import { ScrollRevealBlock } from "@/shared/motion/ScrollReveal";

import type { CommonCopy, HomeCopy, HomeLocale } from "./home-types";
import { EcosystemPartnersSection } from "./sections/EcosystemPartnersSection";
import { HeroSection } from "./sections/HeroSection";
import { HomeFutureFlagshipSections } from "./sections/HomeFutureFlagshipSections";
import { ProjectProductShowcase } from "./sections/ProjectProductShowcase";

export function HomePageClient({ locale = "ru" }: { locale?: HomeLocale }) {
  const homeCopy: HomeCopy = locale === "en" ? homeEn : homeRu;
  const commonCopy: CommonCopy = locale === "en" ? commonEn : commonRu;

  return (
    <>
      <HeroSection commonCopy={commonCopy} locale={locale} />

      <HomeFutureFlagshipSections homeCopy={homeCopy} />

      <div className={`${siteStyles.page} ${siteStyles.homePage}`}>
        <section
          className={`${siteStyles.sectionOpen} ${siteStyles.block1268}`}
          id="projects"
          aria-labelledby="home-projects-heading"
        >
          <ScrollRevealBlock revealEarly className={siteStyles.projectsSectionIntro}>
            <h2 className={siteStyles.homeSectionTitle} id="home-projects-heading">
              {homeCopy.projects.title}
            </h2>
            <span className={siteStyles.sectionTitleRule} aria-hidden />
          </ScrollRevealBlock>
          <ProjectProductShowcase
            ctaLabel={homeCopy.projects.ctaMore}
            projectsSection={homeCopy.projects}
            locale={locale}
            revealOnScroll
          />
        </section>
      </div>

      <EcosystemPartnersSection title={homeCopy.ecosystemPartners.title} />
    </>
  );
}
