import { createLocaleStaticPage } from "@/shared/seo/create-locale-static-page";

import { PurchasePageView } from "@/features/purchase/PurchasePageView";

const page = createLocaleStaticPage("purchase", "/purchase", PurchasePageView, {
  heroPath: "/purchase",
});

export const generateMetadata = page.generateMetadata;
export default page.default;
