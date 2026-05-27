import type { Metadata } from "next";

export const DEFAULT_OG_IMAGE_PATH = "/og-default.webp";
export const DEFAULT_OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function getPublicSiteOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";
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
  const imagePath = input.ogImagePath ?? DEFAULT_OG_IMAGE_PATH;
  const imageAlt = input.ogImageAlt ?? siteName;
  const dims = input.ogImageDimensions ?? (imagePath === DEFAULT_OG_IMAGE_PATH ? DEFAULT_OG_IMAGE_SIZE : undefined);

  const imageEntry = dims
    ? { url: imagePath, width: dims.width, height: dims.height, alt: imageAlt }
    : { url: imagePath, alt: imageAlt };

  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: input.alternates ?? { canonical: input.path },
    openGraph: {
      title: input.title,
      description: input.description,
      url: input.path,
      siteName,
      locale,
      type: "website",
      images: [imageEntry],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [imagePath],
    },
  };
}
