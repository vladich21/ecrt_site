import { createLocaleStaticPage } from "@/shared/seo/create-locale-static-page";

import { ProjectsPageView } from "@/features/projects/ProjectsPageView";

const page = createLocaleStaticPage("projects", "/projects", ProjectsPageView, {
  heroPath: "/projects",
  revalidate: 86400,
});

export const generateMetadata = page.generateMetadata;
export const revalidate = 86400;
export default page.default;
