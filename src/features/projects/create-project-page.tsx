import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
import { trimDescription } from "@/shared/seo/page-seo-copy";

export const revalidate = 86400;

export const dynamicParams = false;

type ProjectPageProps = {
  params: Promise<{ projectSlug: string }>;
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

export function createProjectPage(locale: ProjectDetailLocale) {
  const pathPrefix = locale === "en" ? "/en" : "";

  function generateStaticParams() {
    return getAllProjectSlugs().map((projectSlug) => ({ projectSlug }));
  }

  async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { projectSlug } = await params;
    const name = resolveProjectTitle(projectSlug, locale);
    const meta = getProjectDetailMeta(locale);
    const title = `${name} — ${meta.titleSuffix} | ECRT`;
    const description = trimDescription(projectDescription(projectSlug, locale));
    const path = `${pathPrefix}/project/${projectSlug}`;

    return buildPageMetadata({
      title,
      description,
      path,
      locale: locale === "en" ? "en_US" : "ru_RU",
      ogImagePath: resolveProjectPreviewImage(projectSlug),
      ogImageAlt: name,
      alternates:
        locale === "en"
          ? {
              canonical: path,
              languages: {
                "ru-RU": `/project/${projectSlug}`,
                en: path,
              },
            }
          : {
              canonical: path,
              languages: {
                "ru-RU": path,
                en: `/en/project/${projectSlug}`,
              },
            },
    });
  }

  async function ProjectSlugPage({ params }: ProjectPageProps) {
    const { projectSlug } = await params;
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
