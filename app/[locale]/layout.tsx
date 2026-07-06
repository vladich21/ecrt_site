import type { ReactNode } from "react";

import { LOCALES } from "@/content/i18n/locale";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default function LocaleLayout({ children }: { children: ReactNode }) {
  return children;
}
