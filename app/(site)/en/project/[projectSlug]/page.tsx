import { createProjectPage } from "@/features/projects/create-project-page";

export const revalidate = 86400;
export const dynamicParams = false;

const enProjectPage = createProjectPage("en");

export const generateStaticParams = enProjectPage.generateStaticParams;
export const generateMetadata = enProjectPage.generateMetadata;
export default enProjectPage.default;
