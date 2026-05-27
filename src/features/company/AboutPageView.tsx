import { AboutPageClient } from "./AboutPageClient";

export function AboutPageView({ locale = "ru" }: { locale?: "ru" | "en" }) {
  return <AboutPageClient locale={locale} />;
}
