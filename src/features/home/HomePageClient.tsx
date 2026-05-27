"use client";

import { motion } from "framer-motion";

import homeEn from "@/locales/en/home.json";
import homeRu from "@/locales/ru/home.json";
import commonEn from "@/locales/en/common.json";
import commonRu from "@/locales/ru/common.json";

import siteStyles from "@/shared/ui/SitePageShell/site-page-shell.module.scss";

import type { CommonCopy, HomeCopy, HomeLocale } from "./home-types";
import { itemVariants, listVariants } from "./home-page-motion";
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
        <motion.section
          className={siteStyles.sectionOpen}
          id="projects"
          aria-labelledby="home-projects-heading"
          initial="hidden"
          whileInView="visible"
          variants={listVariants}
          viewport={{ once: true, margin: "-50px", amount: 0.08 }}
        >
          <div className={siteStyles.block1268}>
            <motion.div className={siteStyles.projectsSectionIntro} variants={itemVariants}>
              <h2 className={siteStyles.homeSectionTitle} id="home-projects-heading">
                {homeCopy.projects.title}
              </h2>
              <span className={siteStyles.sectionTitleRule} aria-hidden />
            </motion.div>
            <ProjectProductShowcase
              ctaLabel={homeCopy.projects.ctaMore}
              projectsSection={homeCopy.projects}
              locale={locale}
            />
          </div>
        </motion.section>
      </div>

      <EcosystemPartnersSection title={homeCopy.ecosystemPartners.title} />
    </>
  );
}
