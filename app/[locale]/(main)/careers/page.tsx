import { createLocaleStaticPage } from "@/shared/seo/create-locale-static-page";

import { CareersPageView } from "@/features/careers/CareersPageView";

const page = createLocaleStaticPage("careers", "/careers", CareersPageView, {
  heroPath: "/careers",
});

export const generateMetadata = page.generateMetadata;
export default page.default;
