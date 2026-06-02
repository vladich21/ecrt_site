export type StaticImageLike = string | { src: string };

const NEXT_IMAGE_DEVICE_WIDTHS = [640, 750, 828, 1080, 1200, 1440, 1920, 2048] as const;
const HERO_IMAGE_QUALITY = 90;

export function staticImageUrl(image: StaticImageLike): string {
  return typeof image === "string" ? image : image.src;
}

/** HTTP preload / Link — только ASCII (ByteString); кириллица в имени файла ломает SSR. */
export function asciiSafeAssetUrl(url: string): string {
  return encodeURI(url);
}

const preloadedUrls = new Set<string>();

function heroRenderedWidth() {
  const viewportWidth = window.innerWidth || 1200;
  if (viewportWidth <= 768) return viewportWidth;
  return Math.min(1400, viewportWidth * 0.95);
}

function nearestNextImageWidth(targetWidth: number) {
  return (
    NEXT_IMAGE_DEVICE_WIDTHS.find((width) => width >= targetWidth) ??
    NEXT_IMAGE_DEVICE_WIDTHS[NEXT_IMAGE_DEVICE_WIDTHS.length - 1]
  );
}

function optimizedHeroUrl(image: StaticImageLike) {
  const sourceUrl = staticImageUrl(image);
  const density = Math.min(window.devicePixelRatio || 1, 2);
  const targetWidth = heroRenderedWidth() * density;
  const width = nearestNextImageWidth(targetWidth);

  return `/_next/image?url=${encodeURIComponent(sourceUrl)}&w=${width}&q=${HERO_IMAGE_QUALITY}`;
}

/** Декодирование в кэш браузера до перехода на страницу с hero. */
export function preloadStaticImage(image: StaticImageLike): void {
  if (typeof window === "undefined") return;

  const url = asciiSafeAssetUrl(staticImageUrl(image));
  if (preloadedUrls.has(url)) return;
  preloadedUrls.add(url);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = url;
  document.head.append(link);

  const img = new window.Image();
  img.decoding = "async";
  img.src = url;
}

/** Прогрев именно того optimized next/image URL, который нужен hero на текущем viewport. */
export function preloadOptimizedHeroImage(image: StaticImageLike, fetchPriority: "high" | "low" = "low"): void {
  if (typeof window === "undefined") return;

  const url = optimizedHeroUrl(image);
  if (preloadedUrls.has(url)) return;
  preloadedUrls.add(url);

  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = url;
  link.setAttribute("fetchpriority", fetchPriority);
  document.head.append(link);

  const img = new window.Image();
  img.decoding = "async";
  img.src = url;
}
