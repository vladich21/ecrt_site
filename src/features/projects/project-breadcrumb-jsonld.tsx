import type { ProjectDetailLocale } from "@/features/projects/project-detail-locale";
import { projectDetailPath } from "@/features/projects/project-detail-locale";
import commonEn from "@/locales/en/common.json";
import commonRu from "@/locales/ru/common.json";

type BreadcrumbJsonLdProps = {
  baseUrl: string;
  projectSlug: string;
  projectName: string;
  locale?: ProjectDetailLocale;
};

export function ProjectBreadcrumbJsonLd({
  baseUrl,
  projectSlug,
  projectName,
  locale = "ru",
}: BreadcrumbJsonLdProps) {
  const commonCopy = locale === "en" ? commonEn : commonRu;
  const homeLabel = commonCopy.breadcrumbs.home;
  const projectsLabel = commonCopy.breadcrumbs.projects;
  const projectsPath = locale === "en" ? "/en/projects" : "/projects";
  const projectPath = projectDetailPath(projectSlug, locale);

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `${baseUrl}${locale === "en" ? "/en" : "/"}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: projectsLabel,
        item: `${baseUrl}${projectsPath}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: projectName,
        item: `${baseUrl}${projectPath}`,
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
