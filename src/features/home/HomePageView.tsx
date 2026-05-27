import { HomePageClient } from "./HomePageClient";

export function HomePageView({ locale = "ru" }: { locale?: "ru" | "en" }) {
  return <HomePageClient locale={locale} />;
}
