import { createLocaleStaticPage } from "@/shared/seo/create-locale-static-page";

import { AboutPageView } from "@/features/company/AboutPageView";

const page = createLocaleStaticPage("about", "/about-us", AboutPageView, {
  heroPath: "/about-us",
});

export const generateMetadata = page.generateMetadata;
export default page.default;
