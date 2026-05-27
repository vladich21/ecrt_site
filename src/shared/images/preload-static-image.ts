export type StaticImageLike = string | { src: string };

export function staticImageUrl(image: StaticImageLike): string {
  return typeof image === "string" ? image : image.src;
}

/** HTTP preload / Link — только ASCII (ByteString); кириллица в имени файла ломает SSR. */
export function asciiSafeAssetUrl(url: string): string {
  return encodeURI(url);
}

const preloadedUrls = new Set<string>();

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
