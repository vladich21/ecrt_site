import { CareersPageView as CareersPageClient } from "./CareersPageClient";

export function CareersPageView({ locale = "ru" }: { locale?: "ru" | "en" }) {
  return <CareersPageClient locale={locale} />;
}
