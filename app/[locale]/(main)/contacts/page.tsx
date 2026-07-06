import { createLocaleStaticPage } from "@/shared/seo/create-locale-static-page";

import { ContactsPageView } from "@/features/contacts/ContactsPageView";

const page = createLocaleStaticPage("contacts", "/contacts", ContactsPageView, {
  heroPath: "/contacts",
});

export const generateMetadata = page.generateMetadata;
export default page.default;
