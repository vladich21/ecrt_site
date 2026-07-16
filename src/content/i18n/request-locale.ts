import { headers } from "next/headers";

import type { Locale } from "./locale";

export async function localeFromRequestHeaders(): Promise<Locale> {
  return (await headers()).get("x-locale") === "en" ? "en" : "ru";
}
