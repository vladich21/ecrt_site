import { ProjectsPageView as ProjectsPageClient, type ProjectsPageLocale } from "./ProjectsPageClient";

export function ProjectsPageView({ locale }: { locale: ProjectsPageLocale }) {
  return <ProjectsPageClient locale={locale} />;
}
