import { createDirectionPage } from "@/features/projects/create-direction-page";

export const revalidate = 86400;
export const dynamicParams = false;

const directionPage = createDirectionPage();

export const generateStaticParams = directionPage.generateStaticParams;
export const generateMetadata = directionPage.generateMetadata;
export default directionPage.default;
