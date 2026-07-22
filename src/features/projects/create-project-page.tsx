import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LOCALES } from "@/content/i18n/locale";
import { parseLocaleParam } from "@/content/i18n/parse-locale";
import { publicPathForLocale } from "@/content/i18n/routing";

import { ProjectBreadcrumbJsonLd } from "@/features/projects/project-breadcrumb-jsonld";
import { ProjectDetailView } from "@/features/projects/ProjectDetailView";
import {
  getLocalizedCatalogProject,
  getLocalizedStrategicProject,
  getProjectDetailMeta,
  resolveProjectTitle,
  type ProjectDetailLocale,
} from "@/features/projects/project-detail-locale";
import { resolveProjectPreviewImage } from "@/features/projects/project-preview-image";
import { getAllProjectSlugs } from "@/features/projects/project-slugs";
import { buildPageMetadata, getPublicSiteOrigin } from "@/shared/seo/build-page-metadata";
import { languageAlternatesForLocale } from "@/shared/seo/hreflang";

export const revalidate = 86400;

export const dynamicParams = false;

type ProjectPageProps = {
  params: Promise<{ locale: string; projectSlug: string }>;
};

function projectDescription(slug: string, locale: ProjectDetailLocale): string {
  const meta = getProjectDetailMeta(locale);
  const catalog = getLocalizedCatalogProject(slug, locale);
  if (catalog?.description) return catalog.description;
  const strategic = getLocalizedStrategicProject(slug, locale);
  if (strategic?.description) return strategic.description;
  const name = resolveProjectTitle(slug, locale);
  return `${name}. ${meta.descriptionFallback}`;
}

export function createProjectPage() {
  function generateStaticParams() {
    return LOCALES.flatMap((locale) =>
      getAllProjectSlugs().map((projectSlug) => ({ locale, projectSlug })),
    );
  }

  async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { locale: rawLocale, projectSlug } = await params;
    const locale = parseLocaleParam(rawLocale) as ProjectDetailLocale;
    const name = resolveProjectTitle(projectSlug, locale);

    return buildPageMetadata({
      title: name,
      description: projectDescription(projectSlug, locale),
      path: publicPathForLocale(locale, `/project/${projectSlug}`),
      locale: locale === "en" ? "en_US" : "ru_RU",
      ogImagePath: resolveProjectPreviewImage(projectSlug),
      ogImageAlt: name,
      alternates: languageAlternatesForLocale(locale, `/project/${projectSlug}`),
    });
  }

  async function ProjectSlugPage({ params }: ProjectPageProps) {
    const { locale: rawLocale, projectSlug } = await params;
    const locale = parseLocaleParam(rawLocale) as ProjectDetailLocale;

    if (!getAllProjectSlugs().includes(projectSlug)) {
      notFound();
    }

    const name = resolveProjectTitle(projectSlug, locale);

    return (
      <>
        <ProjectBreadcrumbJsonLd
          baseUrl={getPublicSiteOrigin()}
          projectSlug={projectSlug}
          projectName={name}
          locale={locale}
        />
        <ProjectDetailView projectSlug={projectSlug} locale={locale} />
      </>
    );
  }

  return {
    generateStaticParams,
    generateMetadata,
    default: ProjectSlugPage,
  };
}
