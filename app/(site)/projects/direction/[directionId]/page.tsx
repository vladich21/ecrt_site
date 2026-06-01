import { createDirectionPage } from "@/features/projects/create-direction-page";

export const revalidate = 86400;
export const dynamicParams = false;

const page = createDirectionPage("ru");

export const generateStaticParams = page.generateStaticParams;
export const generateMetadata = page.generateMetadata;
export default page.default;
