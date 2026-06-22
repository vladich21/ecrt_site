import { preload } from "react-dom";

export type StaticImageLike = string | { src: string };

const NEXT_IMAGE_DEVICE_WIDTHS = [640, 750, 828, 1080, 1200, 1440, 1920, 2048] as const;
const HERO_IMAGE_QUALITY = 80;

/** Matches default `sizes` on `HeroImage`. */
export const HERO_IMAGE_SIZES = "(max-width: 768px) 100vw, min(1400px, 95vw)";

export function staticImageUrl(image: StaticImageLike): string {
  return typeof image === "string" ? image : image.src;
}

export function asciiSafeAssetUrl(url: string): string {
  return encodeURI(url);
}

const preloadedSources = new Set<string>();

function nearestNextImageWidth(targetWidth: number) {
  return (
    NEXT_IMAGE_DEVICE_WIDTHS.find((width) => width >= targetWidth) ??
    NEXT_IMAGE_DEVICE_WIDTHS[NEXT_IMAGE_DEVICE_WIDTHS.length - 1]
  );
}

function nextImageUrl(sourceUrl: string, width: number) {
  return `/_next/image?url=${encodeURIComponent(sourceUrl)}&w=${width}&q=${HERO_IMAGE_QUALITY}`;
}

export function buildHeroPreloadSrcSet(image: StaticImageLike): string {
  const sourceUrl = staticImageUrl(image);

  return NEXT_IMAGE_DEVICE_WIDTHS.map(
    (width) => `${nextImageUrl(sourceUrl, width)} ${width}w`,
  ).join(", ");
}

export function buildOptimizedHeroUrl(
  image: StaticImageLike,
  viewportWidth = 1400,
  devicePixelRatio = 2,
): string {
  const sourceUrl = staticImageUrl(image);
  const density = Math.min(devicePixelRatio, 2);
  const renderedWidth =
    viewportWidth <= 768 ? viewportWidth : Math.min(1400, viewportWidth * 0.95);
  const width = nearestNextImageWidth(renderedWidth * density);

  return nextImageUrl(sourceUrl, width);
}

function viewportHeroUrl(image: StaticImageLike) {
  if (typeof window === "undefined") {
    return buildOptimizedHeroUrl(image);
  }

  return buildOptimizedHeroUrl(
    image,
    window.innerWidth || 390,
    window.devicePixelRatio || 1,
  );
}

function cachePreloadSource(image: StaticImageLike): boolean {
  const key = staticImageUrl(image);
  if (preloadedSources.has(key)) return false;
  preloadedSources.add(key);
  return true;
}

function applyResponsivePreloadLink(
  link: HTMLLinkElement,
  image: StaticImageLike,
  fetchPriority: "high" | "low",
) {
  const href = viewportHeroUrl(image);
  const srcSet = buildHeroPreloadSrcSet(image);

  link.rel = "preload";
  link.as = "image";
  link.href = href;
  link.setAttribute("imagesrcset", srcSet);
  link.setAttribute("imagesizes", HERO_IMAGE_SIZES);
  link.setAttribute("fetchpriority", fetchPriority);
}

function warmHeroImage(image: StaticImageLike) {
  const img = new window.Image();
  img.decoding = "async";
  img.sizes = HERO_IMAGE_SIZES;
  img.srcset = buildHeroPreloadSrcSet(image);
  img.src = viewportHeroUrl(image);
}

export function preloadStaticImage(image: StaticImageLike): void {
  if (typeof window === "undefined") return;

  const url = asciiSafeAssetUrl(staticImageUrl(image));
  if (preloadedSources.has(url)) return;
  preloadedSources.add(url);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = url;
  document.head.append(link);

  const img = new window.Image();
  img.decoding = "async";
  img.src = url;
}

export function preloadHeroImage(
  image: StaticImageLike,
  fetchPriority: "high" | "low" = "high",
): void {
  if (!cachePreloadSource(image)) return;

  const href = viewportHeroUrl(image);
  const srcSet = buildHeroPreloadSrcSet(image);

  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    applyResponsivePreloadLink(link, image, fetchPriority);
    document.head.append(link);
    warmHeroImage(image);
    return;
  }

  preload(href, {
    as: "image",
    fetchPriority,
    imageSrcSet: srcSet,
    imageSizes: HERO_IMAGE_SIZES,
  });
}
