import dynamic from "next/dynamic";

import { getCopy, type Locale } from "@/content/i18n";
import siteStyles from "@/shared/ui/SitePageShell/site-page-shell.module.scss";
import { ScrollRevealBlock } from "@/shared/motion/ScrollReveal";

import { HeroSection } from "./sections/HeroSection";

const HomeFutureFlagshipSections = dynamic(
  () =>
    import("./sections/HomeFutureFlagshipSections").then((mod) => mod.HomeFutureFlagshipSections),
  { ssr: true },
);

const ProjectProductShowcase = dynamic(
  () => import("./sections/ProjectProductShowcase").then((mod) => mod.ProjectProductShowcase),
  { ssr: true },
);

const EcosystemPartnersSection = dynamic(
  () => import("./sections/EcosystemPartnersSection").then((mod) => mod.EcosystemPartnersSection),
  { ssr: true },
);

export function HomePageView({ locale = "ru" }: { locale?: Locale }) {
  const homeCopy = getCopy("home", locale);
  const commonCopy = getCopy("common", locale);

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
