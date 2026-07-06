import { localeFromRequestHeaders } from "@/content/i18n/request-locale";
import { NotFoundPageView } from "@/features/not-found/NotFoundPageView";

export default async function NotFound() {
  const locale = await localeFromRequestHeaders();
  return <NotFoundPageView locale={locale} />;
}
