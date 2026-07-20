import type { StaticImageData } from "next/image";
import Link from "next/link";

import type { BundledImage } from "@/data/ecrtSite";
import { strategicProjects } from "@/data/ecrtSite";
import { projectShowcaseImages } from "@/data/projectMedia";
import {
  getLocalizedCatalogProject,
  getLocalizedStrategicProject,
  getProjectDetailUi,
  projectDetailPath,
  type ProjectDetailLocale,
} from "@/features/projects/project-detail-locale";
import { imageSrc } from "@/features/projects/image-src";
import { ScrollRevealBlock } from "@/shared/motion/ScrollReveal";
import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";

import type { HomeCopy } from "../home-types";
import bentoStyles from "../project-product-showcase.module.scss";

type SlideImage = StaticImageData | string | BundledImage;

type ProductSlide = {
  id: string;
  href?: string;
  linkable?: boolean;
  title: string;
  description?: string;
  descriptions?: string[];
  image: SlideImage;
};

function metricsSlugFromProjectHref(href: string): string | null {
  const match = href.match(/^\/(?:en\/)?project\/([^/?#]+)$/);
  return match ? match[1] : null;
}

type MetricRow = {
  term: string;
  detail: string;
};

function showcaseMetricRows(
  slug: string,
  metricLabels: HomeCopy["projects"]["metricLabels"],
  locale: ProjectDetailLocale,
): MetricRow[] {
  const uiSegment = getProjectDetailUi(locale).hsrSegment;

  if (slug === "ks-400-catenary") {
    const strategic = getLocalizedStrategicProject(slug, locale);
    return [
      { term: metricLabels.segment, detail: uiSegment },
      { term: metricLabels.status, detail: strategic?.status ?? (locale === "en" ? "Production ramp-up" : "Постановка на производство") },
      { term: metricLabels.period, detail: strategic?.period ?? "2021 - 2027" },
    ];
  }

  if (slug === "ks-400-model") {
    const strategic = getLocalizedStrategicProject(slug, locale);
    const segment =
      locale === "en" ? "HSR and other catenary systems" : "ВСМ и любые иные контактные сети";
    return [
      { term: metricLabels.segment, detail: segment },
      { term: metricLabels.status, detail: strategic?.status ?? "" },
      { term: metricLabels.period, detail: strategic?.period ?? "2023 - 2027" },
    ];
  }

  const catalogue = getLocalizedCatalogProject(slug, locale);
  if (catalogue) {
    return [
      { term: metricLabels.segment, detail: catalogue.segment },
      { term: metricLabels.status, detail: catalogue.statusLabel },
      { term: metricLabels.period, detail: catalogue.year },
    ];
  }

  const strategic = getLocalizedStrategicProject(slug, locale);
  if (strategic) {
    return [
      { term: metricLabels.okrPeriod, detail: strategic.period },
      { term: metricLabels.stage, detail: strategic.status },
      { term: metricLabels.programFocus, detail: strategic.teaser },
    ];
  }

  return [];
}

type ProjectProductShowcaseProps = {
  ctaLabel: string;
  projectsSection: HomeCopy["projects"];
  locale?: ProjectDetailLocale;
  revealOnScroll?: boolean;
};

export function ProjectProductShowcase({
  ctaLabel,
  projectsSection,
  locale = "ru",
  revealOnScroll = false,
}: ProjectProductShowcaseProps) {
  const trackSlug = "track-resource-2-5b";
  const trackProject = getLocalizedCatalogProject(trackSlug, locale);
  const trackDescription = trackProject?.description ?? projectsSection.showcaseTrackV25Title;

  const lowProject = getLocalizedCatalogProject("project-0009-low-intensity", locale);
  const vsm1TrackProject = getLocalizedCatalogProject("vsm-1-track-elements", locale);
  const ks400CatenaryProject = strategicProjects.find((project) => project.slug === "ks-400-catenary")!;
  const ks400ModelProject = strategicProjects.find((project) => project.slug === "ks-400-model")!;

  const ps = projectsSection;

  const productSlides: ProductSlide[] = [
    {
      id: "evs-360",
      href: projectDetailPath("evs-360", locale),
      title: ps.showcaseEvsTitle,
      description: ps.evsHomeShowcaseDescription,
      image: projectShowcaseImages["evs-360"]!,
    },
    {
      id: "ks400-catenary",
      href: projectDetailPath(ks400CatenaryProject.slug, locale),
      title: ps.showcaseContactVsm1Title,
      description: ps.showcaseContactVsm1Description,
      image: projectShowcaseImages["ks-400-catenary"]!,
    },
    {
      id: "ks400-model",
      href: projectDetailPath(ks400ModelProject.slug, locale),
      title: ps.showcaseKs400ModelTitle,
      description: ps.showcaseKs400ModelDescription,
      image: projectShowcaseImages["ks-400-model"]!,
    },
    {
      id: "vsm-1-track-elements",
      href: projectDetailPath("vsm-1-track-elements", locale),
      title: ps.showcaseVsm1TrackTitle,
      description: vsm1TrackProject?.description ?? ps.showcaseVsm1TrackTitle,
      image: projectShowcaseImages["vsm-1-track-elements"]!,
    },
    {
      id: "track-v25",
      href: projectDetailPath(trackSlug, locale),
      title: ps.showcaseTrackV25Title,
      description: trackDescription,
      image: projectShowcaseImages["track-resource-2-5b"]!,
    },
    {
      id: "low-intensity",
      href: projectDetailPath("project-0009-low-intensity", locale),
      title: ps.showcaseLowIntensityTitle,
      description: lowProject?.description ?? ps.showcaseLowIntensityTitle,
      image: projectShowcaseImages["project-0009-low-intensity"]!,
    },
    {
      id: "operation-support-placeholder",
      linkable: false,
      title: ps.showcaseOperationSupportTitle,
      descriptions: ps.showcaseOperationSupportDescriptions,
      image: projectShowcaseImages["operation-support-placeholder"]!,
    },
  ];

  return (
    <div className={bentoStyles.productShowcase}>
      {productSlides.map((slide, index) => {
        const headingId = `home-product-${slide.id}`;
        const isReversed = index % 2 === 1;
        const isLinkable = slide.linkable !== false && Boolean(slide.href);
        const metricSlug = slide.href ? metricsSlugFromProjectHref(slide.href) : null;
        const metrics = metricSlug ? showcaseMetricRows(metricSlug, ps.metricLabels, locale) : [];
        const descriptionParagraphs =
          slide.descriptions ?? (slide.description ? [slide.description] : []);

        const imageFrame = (
          <span className={bentoStyles.productMediaFrame}>
            <AssetImage
              className={bentoStyles.productMediaImg}
              src={imageSrc(slide.image)}
              alt=""
              fill
              sizes="(max-width: 480px) calc(100vw - 32px), (max-width: 768px) min(100vw, 420px), (max-width: 1200px) 42vw, 760px"
              quality={
                slide.id === "low-intensity" || slide.id === "vsm-1-track-elements" ? 92 : 85
              }
              loading="lazy"
            />
          </span>
        );

        const copyContent = (
          <>
            <h3 className={bentoStyles.productTitle} id={headingId}>
              {slide.title}
            </h3>
            {descriptionParagraphs.map((paragraph, paragraphIndex) => (
              <p key={`${slide.id}-description-${paragraphIndex}`} className={bentoStyles.productDescription}>
                {paragraph}
              </p>
            ))}
            {metrics.length > 0 ? (
              <ul className={bentoStyles.productMetricList} aria-label={ps.metricListAria}>
                {metrics.map(({ term, detail }) => (
                  <li key={`${slide.id}-${term}`} className={bentoStyles.productMetricItem}>
                    <div className={bentoStyles.productMetricBanner}>
                      <span className={bentoStyles.productMetricTerm}>{term}</span>
                      <span className={bentoStyles.productMetricValue}>{detail}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
            {isLinkable ? (
              <Link className={bentoStyles.productCta} href={slide.href!}>
                {ctaLabel}
                <span aria-hidden>→</span>
              </Link>
            ) : null}
          </>
        );

        const slideContent = (
          <>
            {isLinkable ? (
              <Link
                className={bentoStyles.productMediaLink}
                href={slide.href!}
                aria-labelledby={headingId}
              >
                {imageFrame}
              </Link>
            ) : (
              <div className={bentoStyles.productMediaStatic}>{imageFrame}</div>
            )}
            <div className={bentoStyles.productCopy}>{copyContent}</div>
          </>
        );

        if (revealOnScroll) {
          return (
            <ScrollRevealBlock
              key={slide.id}
              inView
              className={`${bentoStyles.productSlide} ${isReversed ? bentoStyles.productSlideReverse : ""}`}
            >
              {slideContent}
            </ScrollRevealBlock>
          );
        }

        return (
          <article
            key={slide.id}
            className={`${bentoStyles.productSlide} ${isReversed ? bentoStyles.productSlideReverse : ""}`}
          >
            {slideContent}
          </article>
        );
      })}
    </div>
  );
}
