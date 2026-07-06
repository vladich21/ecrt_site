import { documents } from "@/data/ecrtSite";
import { DocumentsPageView } from "@/features/documents/DocumentsPageView";
import { createLocaleStaticPage } from "@/shared/seo/create-locale-static-page";

const page = createLocaleStaticPage("documents", "/documents", (props) => (
  <DocumentsPageView {...props} documents={documents} />
));

export const generateMetadata = page.generateMetadata;
export default page.default;
