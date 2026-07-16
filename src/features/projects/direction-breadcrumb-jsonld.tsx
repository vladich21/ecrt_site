import { getCopy, localePathPrefix } from "@/content/i18n";
import type { DirectionLocale } from "@/features/projects/direction-detail-locale";
import { publicPathForLocale } from "@/content/i18n/routing";

type DirectionBreadcrumbJsonLdProps = {
  baseUrl: string;
  directionId: string;
  directionTitle: string;
  locale?: DirectionLocale;
};

export function DirectionBreadcrumbJsonLd({
  baseUrl,
  directionId,
  directionTitle,
  locale = "ru",
}: DirectionBreadcrumbJsonLdProps) {
  const commonCopy = getCopy("common", locale);
  const homeLabel = commonCopy.breadcrumbs.home;
  const projectsLabel = commonCopy.breadcrumbs.projects;
  const projectsPath = `${localePathPrefix(locale)}/projects`;
  const directionPath = publicPathForLocale(locale, `/projects/direction/${directionId}`);

  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: `${baseUrl}${localePathPrefix(locale) || "/"}`,
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
        name: directionTitle,
        item: `${baseUrl}${directionPath}`,
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
