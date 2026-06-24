import { preload } from "react-dom";

export type StaticImageLike = string | { src: string };

/** Matches default `sizes` on `HeroImage` (used when images go through the optimizer). */
export const HERO_IMAGE_SIZES = "(max-width: 768px) 100vw, min(1400px, 95vw)";

export function staticImageUrl(image: StaticImageLike): string {
  return typeof image === "string" ? image : image.src;
}

export function asciiSafeAssetUrl(url: string): string {
  return encodeURI(url);
}

const preloadedSources = new Set<string>();

function cachePreloadSource(url: string): boolean {
  if (preloadedSources.has(url)) return false;
  preloadedSources.add(url);
  return true;
}

/** Preload bundled/static hero assets directly from CDN — skip `/_next/image` latency. */
export function preloadHeroImage(
  image: StaticImageLike,
  fetchPriority: "high" | "low" = "high",
): void {
  const url = asciiSafeAssetUrl(staticImageUrl(image));
  if (!cachePreloadSource(url)) return;

  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    link.setAttribute("fetchpriority", fetchPriority);
    document.head.append(link);
    return;
  }

  preload(url, { as: "image", fetchPriority });
}

export function preloadStaticImage(image: StaticImageLike): void {
  preloadHeroImage(image, "high");
}

/** Decode a static asset into the browser image cache (client only). */
export function warmStaticImage(image: StaticImageLike): void {
  if (typeof window === "undefined") return;

  const img = new window.Image();
  img.decoding = "async";
  img.src = asciiSafeAssetUrl(staticImageUrl(image));
}
