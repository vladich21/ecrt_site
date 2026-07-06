import { createLocaleStaticPage } from "@/shared/seo/create-locale-static-page";

import { PrivacyPolicyPageView } from "@/features/legal/PrivacyPolicyPageView";

const page = createLocaleStaticPage("privacy", "/privacy-policy", PrivacyPolicyPageView);

export const generateMetadata = page.generateMetadata;
export default page.default;
