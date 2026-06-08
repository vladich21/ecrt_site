import aboutEn from "@/locales/en/about.json";
import aboutRu from "@/locales/ru/about.json";
import careersEn from "@/locales/en/careers.json";
import careersRu from "@/locales/ru/careers.json";
import commonEn from "@/locales/en/common.json";
import commonRu from "@/locales/ru/common.json";
import contactsEn from "@/locales/en/contacts.json";
import contactsRu from "@/locales/ru/contacts.json";
import documentsEn from "@/locales/en/documents.json";
import documentsRu from "@/locales/ru/documents.json";
import homeEn from "@/locales/en/home.json";
import homeRu from "@/locales/ru/home.json";
import privacyEn from "@/locales/en/privacy-policy.json";
import privacyRu from "@/locales/ru/privacy-policy.json";
import projectDetailEn from "@/locales/en/project-detail.json";
import projectDetailRu from "@/locales/ru/project-detail.json";
import projectsEn from "@/locales/en/projects.json";
import projectsRu from "@/locales/ru/projects.json";
import purchaseEn from "@/locales/en/purchase.json";
import purchaseRu from "@/locales/ru/purchase.json";

import type { Locale } from "./locale";

const copies = {
  about: { ru: aboutRu, en: aboutEn },
  careers: { ru: careersRu, en: careersEn },
  common: { ru: commonRu, en: commonEn },
  contacts: { ru: contactsRu, en: contactsEn },
  documents: { ru: documentsRu, en: documentsEn },
  home: { ru: homeRu, en: homeEn },
  privacy: { ru: privacyRu, en: privacyEn },
  projectDetail: { ru: projectDetailRu, en: projectDetailEn },
  projects: { ru: projectsRu, en: projectsEn },
  purchase: { ru: purchaseRu, en: purchaseEn },
} as const;

export type CopyNamespace = keyof typeof copies;
export type CopyFor<N extends CopyNamespace, L extends Locale = Locale> = (typeof copies)[N][L];

export function getCopy<N extends CopyNamespace, L extends Locale>(
  namespace: N,
  locale: L,
): CopyFor<N, L> {
  return copies[namespace][locale] as CopyFor<N, L>;
}
