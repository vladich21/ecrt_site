import type { Metadata } from "next";

import { trimDescription } from "@/shared/seo/page-seo-copy";

export const DEFAULT_SITE_ORIGIN = "https://ecrt.ru";
export const DEFAULT_OG_IMAGE_PATH = "/og-default.png";
export const DEFAULT_OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function getPublicSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_ORIGIN;
  return raw.replace(/\/$/, "");
}

export type SocialLocale = "ru_RU" | "en_US";

export type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  locale?: SocialLocale;
  siteName?: string;
  ogImagePath?: string;
  ogImageAlt?: string;
  ogImageDimensions?: { width: number; height: number };
  alternates?: Metadata["alternates"];
};

export function buildPageMetadata(input: BuildPageMetadataInput): Metadata {
  const locale = input.locale ?? "ru_RU";
  const siteName = input.siteName ?? (locale === "en_US" ? "ECRT" : "АО ИЦ ЖТ");
  const imagePath = input.ogImagePath?.trim() || DEFAULT_OG_IMAGE_PATH;
  const imageAlt = input.ogImageAlt ?? siteName;
  const dims = input.ogImageDimensions ?? (imagePath === DEFAULT_OG_IMAGE_PATH ? DEFAULT_OG_IMAGE_SIZE : undefined);

  const imageEntry = dims
    ? { url: imagePath, width: dims.width, height: dims.height, alt: imageAlt }
    : { url: imagePath, alt: imageAlt };

  return {
    title: { absolute: input.title },
    description: trimDescription(input.description),
    alternates: input.alternates ?? { canonical: input.path },
    openGraph: {
      title: input.title,
      description: trimDescription(input.description),
      url: input.path,
      siteName,
      locale,
      alternateLocale: locale === "en_US" ? ["ru_RU"] : ["en_US"],
      type: "website",
      images: [imageEntry],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: trimDescription(input.description),
      images: [imagePath],
    },
  };
}
