import { notFound } from "next/navigation";

import type { Locale } from "./locale";

export function parseLocaleParam(value: string): Locale {
  if (value === "ru" || value === "en") return value;
  notFound();
}
