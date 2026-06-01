import { preload } from "react-dom";

import { getProjectPageImages } from "@/data/project-page-images";

import { asciiSafeAssetUrl, staticImageUrl, type StaticImageLike } from "./preload-static-image";

/** На главной критичный preload не нужен — hero без картинки; карта и витрина lazy. */
const homeCriticalImages: StaticImageLike[] = [];

/** Ниже первого экрана — не прогреваем на idle (lazy при скролле). */
const homeDeferredImages: StaticImageLike[] = [];

/** Таймлайн и витрина — только lazy при скролле, без idle-preload. */
const aboutDeferredImages: StaticImageLike[] = [];
const projectsDeferredImages: StaticImageLike[] = [];

const PAGE_CRITICAL_IMAGES: Record<string, StaticImageLike[]> = {
  "/": homeCriticalImages,
};

const PAGE_DEFERRED_IMAGES: Record<string, StaticImageLike[]> = {
  "/": homeDeferredImages,
  "/projects": projectsDeferredImages,
  "/about-us": aboutDeferredImages,
};

function normalizePagePath(pathOrHref: string): string {
  const withoutQuery = pathOrHref.split(/[?#]/)[0] ?? pathOrHref;
  const withoutLocale = withoutQuery.replace(/^\/en(?=\/|$)/, "") || "/";
  if (withoutLocale.length > 1 && withoutLocale.endsWith("/")) {
    return withoutLocale.slice(0, -1);
  }
  return withoutLocale;
}

function dedupeImages(images: StaticImageLike[]): StaticImageLike[] {
  const seen = new Set<string>();
  const result: StaticImageLike[] = [];

  for (const image of images) {
    const url = staticImageUrl(image);
    if (seen.has(url)) continue;
    seen.add(url);
    result.push(image);
  }

  return result;
}

function preloadImages(images: StaticImageLike[]): void {
  for (const image of images) {
    preload(asciiSafeAssetUrl(staticImageUrl(image)), {
      as: "image",
      fetchPriority: "high",
    });
  }
}

/** Критичные изображения текущей страницы (above-the-fold). */
export function resolveCriticalPageImages(pathOrHref: string): StaticImageLike[] {
  const path = normalizePagePath(pathOrHref);
  return PAGE_CRITICAL_IMAGES[path] ?? [];
}

/** Изображения ниже fold — idle-preload на клиенте. */
export function resolveDeferredPageImages(pathOrHref: string): StaticImageLike[] {
  const path = normalizePagePath(pathOrHref);

  const deferred = PAGE_DEFERRED_IMAGES[path];
  if (deferred?.length) return dedupeImages(deferred);

  const projectMatch = path.match(/^\/project\/([^/]+)$/);
  if (projectMatch) {
    return getProjectPageImages(projectMatch[1]);
  }

  return [];
}

/** @deprecated Используйте resolveCriticalPageImages / resolveDeferredPageImages */
export function resolvePageImages(pathOrHref: string): StaticImageLike[] {
  return dedupeImages([
    ...resolveCriticalPageImages(pathOrHref),
    ...resolveDeferredPageImages(pathOrHref),
  ]);
}

/** SSR: только критичные изображения страницы. */
export function preloadPageImages(pathOrHref: string): void {
  const images = resolveCriticalPageImages(pathOrHref);
  if (!images.length) return;
  preloadImages(images);
}

/** SSR: hero + контент проекта (страница проекта — контент нужен раньше). */
export function preloadProjectPageImages(projectSlug: string): void {
  preloadImages(getProjectPageImages(projectSlug));
}
