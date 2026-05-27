import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import type { ReactNode } from "react";

import homeEn from "@/locales/en/home.json";
import homeRu from "@/locales/ru/home.json";
import { getStrategicProjectBySlug } from "@/data/ecrtSite";
import { projectCatalogHeroImages } from "@/data/projectMedia";

import { Evs360ReportBlock } from "./Evs360ReportBlock";
import { imageSrc } from "./image-src";
import { projectGalleryBySlug } from "./project-galleries";
import styles from "./project-detail.module.scss";
import { StrategicProjectHero } from "@/features/projects/StrategicProjectHero";
import { LowIntensity0009ReportBlock } from "./LowIntensity0009ReportBlock";
import { ProjectCatalogHero } from "./ProjectCatalogHero";
import { TrackFasteningCalculationsBlock } from "./TrackFasteningCalculationsBlock";
import { TrackV25FieldWorksBlock } from "./TrackV25FieldWorksBlock";
import { TrackV25ModelingBlock } from "./TrackV25ModelingBlock";
import { TrackV25ReportBlock } from "./TrackV25ReportBlock";
import { Vsm1TrackElementsReportBlock } from "./Vsm1TrackElementsReportBlock";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";
import {
  galleryImageAlt,
  getLocalizedCatalogProject,
  getLocalizedStrategicProject,
  getProjectDetailUi,
  heroAltText,
  projectDetailPath,
  type ProjectDetailLocale,
} from "./project-detail-locale";

type Props = {
  projectSlug: string;
  locale?: ProjectDetailLocale;
};

const catalogLayoutSlugs = [
  "evs-360",
  "vsm-1-track-elements",
  "project-0009-low-intensity",
  "track-resource-2-5b",
] as const;

const catalogLayoutSlugSet = new Set<string>(catalogLayoutSlugs);

function catalogHeroCopy(
  slug: string,
  project: NonNullable<ReturnType<typeof getLocalizedCatalogProject>>,
  showcase: typeof homeRu.projects,
): { title: string; lead: string } {
  if (!project) {
    return { title: slug, lead: "" };
  }

  if (slug === "vsm-1-track-elements") {
    return {
      title: project.title,
      lead: project.description,
    };
  }

  if (slug === "project-0009-low-intensity") {
    return {
      title: project.title,
      lead: project.description,
    };
  }

  if (slug === "track-resource-2-5b") {
    return {
      title: showcase.showcaseTrackV25Title,
      lead: project.description,
    };
  }

  return {
    title: project.title,
    lead: project.description,
  };
}

function catalogProjectContent(slug: string, locale: ProjectDetailLocale): ReactNode {
  switch (slug) {
    case "evs-360":
      return <Evs360ReportBlock locale={locale} />;
    case "vsm-1-track-elements":
      return (
        <>
          <Vsm1TrackElementsReportBlock locale={locale} />
          <TrackFasteningCalculationsBlock locale={locale} />
        </>
      );
    case "project-0009-low-intensity":
      return (
        <>
          <LowIntensity0009ReportBlock group="intro" locale={locale} />
          <LowIntensity0009ReportBlock group="details" locale={locale} />
        </>
      );
    case "track-resource-2-5b":
      return (
        <>
          <TrackV25ReportBlock group="intro" locale={locale} />
          <TrackV25FieldWorksBlock locale={locale} />
          <TrackV25ModelingBlock locale={locale} />
          <TrackV25ReportBlock group="details" locale={locale} />
        </>
      );
    default:
      return null;
  }
}

export function ProjectDetailView({ projectSlug, locale = "ru" }: Props) {
  preloadRouteHeroImage(projectDetailPath(projectSlug, locale));
  const ui = getProjectDetailUi(locale);
  const homeProjects = locale === "en" ? homeEn.projects : homeRu.projects;

  const strategic = getLocalizedStrategicProject(projectSlug, locale);
  const strategicSource = getStrategicProjectBySlug(projectSlug);
  if (strategic && strategicSource) {
    const coverImageUrl = imageSrc(strategicSource.coverImage);
    const hasSections = strategic.sections.length > 0;
    const omitHeroPhaseLine = strategicSource.omitHeroPhaseLine === true;
    const showHeroPhaseLine =
      !omitHeroPhaseLine && (strategic.status.trim() !== "" || strategic.period.trim() !== "");
    const isKsCatenary = strategicSource.slug === "ks-400-catenary";
    const heroHeading = isKsCatenary ? homeProjects.showcaseContactVsm1Title : strategic.title;
    const heroLead = isKsCatenary ? homeProjects.showcaseContactVsm1Description : strategic.teaser;

    return (
      <div className={styles.pageStrategic}>
        <StrategicProjectHero
          coverImageUrl={coverImageUrl}
          phaseLabel={showHeroPhaseLine ? `${strategic.status} · ${strategic.period}` : undefined}
          heading={heroHeading}
          lead={heroLead}
          imageAlt={heroAltText(strategic.title, locale)}
          projectSlug={strategicSource.slug}
        />

        <div className={styles.strReportShell}>
          <section className={styles.strReportSection} aria-labelledby="strategic-about-heading">
            <header className={styles.strReportSectionHead}>
              <h2 id="strategic-about-heading" className={styles.strReportTitle}>
                {ui.aboutProject}
              </h2>
              <span className={styles.strReportTitleRule} aria-hidden />
            </header>
            <div className={styles.strReportProse}>
              {strategic.description.split(/\n\n+/).map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className={styles.strReportParagraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          <section className={styles.strReportSection} aria-labelledby="strategic-points-heading">
            <header className={styles.strReportSectionHead}>
              <h2 id="strategic-points-heading" className={styles.strReportTitle}>
                {ui.keyPoints}
              </h2>
              <span className={styles.strReportTitleRule} aria-hidden />
            </header>
            <ul className={styles.strFocusGrid}>
              {strategic.bullets.map((bullet, pillarIndex) => (
                <li key={bullet} className={styles.strFocusItem}>
                  <span className={styles.strFocusDigit} aria-hidden>
                    {(pillarIndex + 1).toString().padStart(2, "0")}
                  </span>
                  <p className={styles.strFocusItemText}>{bullet}</p>
                </li>
              ))}
            </ul>
          </section>

          {!hasSections && strategic.details.length > 0 ? (
            <section className={styles.strReportSection} aria-labelledby="strategic-details-heading">
              <header className={styles.strReportSectionHead}>
                <h2 id="strategic-details-heading" className={styles.strReportTitle}>
                  {ui.details}
                </h2>
                <span className={styles.strReportTitleRule} aria-hidden />
              </header>
              <div className={styles.strReportProse}>
                {strategic.details.map((paragraph) => (
                  <p key={paragraph} className={styles.strReportParagraph}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          {hasSections
            ? strategic.sections.map((sectionBlock, sectionIndex) => (
                <section
                  key={sectionBlock.title}
                  className={styles.strReportSection}
                  aria-labelledby={`strategic-extra-${sectionIndex}`}
                >
                  <header className={styles.strReportSectionHead}>
                    <h2 id={`strategic-extra-${sectionIndex}`} className={styles.strReportTitle}>
                      {sectionBlock.title}
                    </h2>
                    <span className={styles.strReportTitleRule} aria-hidden />
                  </header>
                  <div className={styles.strReportProse}>
                    {sectionBlock.paragraphs.map((paragraph) => (
                      <p key={paragraph} className={styles.strReportParagraph}>
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))
            : null}
        </div>
      </div>
    );
  }

  const project = getLocalizedCatalogProject(projectSlug, locale);
  if (!project) return null;

  const heroImageAlt = heroAltText(project.title, locale);

  if (catalogLayoutSlugSet.has(projectSlug)) {
    const heroImage = projectCatalogHeroImages[projectSlug];
    if (!heroImage) return null;

    const { title, lead } = catalogHeroCopy(projectSlug, project, homeProjects);

    return (
      <div className={styles.pageEvs}>
        <ProjectCatalogHero
          image={heroImage}
          title={title}
          lead={lead}
          imageAlt={heroImageAlt}
          projectSlug={projectSlug}
        />
        {catalogProjectContent(projectSlug, locale)}
      </div>
    );
  }

  const gallery = (projectGalleryBySlug[projectSlug] ?? []).map(imageSrc);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.code}>
          {project.code} · {project.statusLabel}
        </p>
        <h1>{project.title}</h1>
        <p className={styles.lead}>{project.description}</p>
      </section>

      <section className={styles.details}>
        <div className={styles.block}>
          <h2>{ui.keyParameters}</h2>
          <ul>
            <li>
              {ui.segment}: {project.segment}
            </li>
            <li>
              {ui.period}: {project.year}
            </li>
            <li>
              {ui.indicator}: {project.metric}
            </li>
          </ul>
        </div>
        <div className={styles.block}>
          <h2>{ui.engineeringContext}</h2>
          {project.details.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
        <div className={styles.block}>
          <h2>{ui.confirmedFacts}</h2>
          <ul>
            {project.facts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.gallery}>
        <h2>{ui.gallery}</h2>
        <div className={styles.grid}>
          {gallery.map((image, index) => (
            <figure key={`${String(image)}-${index}`} className={styles.mediaCard}>
              <AssetImage
                src={image}
                alt={galleryImageAlt(project.title, index, locale)}
                fill
                className={styles.galleryFillImg}
                sizes="(max-width: 900px) 50vw, 300px"
              />
            </figure>
          ))}
        </div>
        <p className={styles.note}>{ui.galleryNote}</p>
      </section>
    </div>
  );
}
