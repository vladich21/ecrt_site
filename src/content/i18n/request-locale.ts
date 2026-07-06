import { headers } from "next/headers";

import type { Locale } from "./locale";

/** Locale from middleware (`x-locale`) for routes without `[locale]` params (e.g. not-found). */
export async function localeFromRequestHeaders(): Promise<Locale> {
  return (await headers()).get("x-locale") === "en" ? "en" : "ru";
}
