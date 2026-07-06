import type { Locale } from "@/content/i18n/locale";
import {
  localeFromPathname,
  stripLocalePrefix,
  withLocalePath,
} from "@/content/i18n/routing";
import commonEn from "@/locales/en/common.json";
import commonRu from "@/locales/ru/common.json";

type MessageTree = Record<string, unknown>;

export type { Locale };

export { localeFromPathname, stripLocalePrefix, withLocalePath };

export function t(key: string, locale: Locale = "ru"): string {
  const commonCopy = locale === "en" ? commonEn : commonRu;
  return (
    (key.split(".").reduce<unknown>((node, part) => {
      if (typeof node !== "object" || node === null) return undefined;
      return (node as MessageTree)[part];
    }, commonCopy) as string | undefined) ?? key
  );
}
