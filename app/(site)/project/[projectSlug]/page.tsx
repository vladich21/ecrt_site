import { createProjectPage } from "@/features/projects/create-project-page";

export const revalidate = 86400;
export const dynamicParams = false;

const ruProjectPage = createProjectPage("ru");

export const generateStaticParams = ruProjectPage.generateStaticParams;
export const generateMetadata = ruProjectPage.generateMetadata;
export default ruProjectPage.default;
