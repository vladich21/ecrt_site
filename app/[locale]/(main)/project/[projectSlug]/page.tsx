import { createProjectPage } from "@/features/projects/create-project-page";

export const revalidate = 86400;
export const dynamicParams = false;

const projectPage = createProjectPage();

export const generateStaticParams = projectPage.generateStaticParams;
export const generateMetadata = projectPage.generateMetadata;
export default projectPage.default;
