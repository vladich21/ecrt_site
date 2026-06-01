import { preload } from "react-dom";

import leadershipPhoto from "@/assets/about/kireytsev-general-director.webp";
import evs360LaunchPhoto from "@/assets/presentation/openart-gpt-image-2-edit-1_1777462551743_196f02f7.webp";
import img33 from "@/assets/presentation/img-33.webp";
import img36 from "@/assets/presentation/img-36.webp";
import ks2Photo from "@/assets/presentation/кс-2.webp";
import trainProductionPhoto from "@/assets/presentation/произв-поезда.webp";
import krasnoyarskTrials from "@/assets/presentation/Красноярские жд испытания.webp";
import vniizhtRing from "@/assets/presentation/Экспериментальное кольцо ВНИИЖТ.webp";
import milestone201906Signing from "@/assets/presentation/milestone-2019-06-signing.webp";
import { getProjectPageImages } from "@/data/project-page-images";
import { projectShowcaseImages } from "@/data/projectMedia";

import { asciiSafeAssetUrl, staticImageUrl, type StaticImageLike } from "./preload-static-image";

const timelinePhotos: StaticImageLike[] = [
  milestone201906Signing,
  evs360LaunchPhoto,
  ks2Photo,
  img33,
  vniizhtRing,
  img36,
  krasnoyarskTrials,
  trainProductionPhoto,
];

const showcaseImages = Object.values(projectShowcaseImages).filter(
  (image): image is StaticImageLike => Boolean(image),
);

/** На главной критичный preload не нужен — hero без картинки; карта и витрина lazy. */
const homeCriticalImages: StaticImageLike[] = [];

/** Ниже первого экрана — не прогреваем на idle (lazy при скролле). */
const homeDeferredImages: StaticImageLike[] = [];

const aboutDeferredImages: StaticImageLike[] = timelinePhotos;

/** На /projects hero грузится отдельно; showcase — ниже fold. */
const projectsDeferredImages: StaticImageLike[] = showcaseImages;

const PAGE_CRITICAL_IMAGES: Record<string, StaticImageLike[]> = {
  "/": homeCriticalImages,
  "/about-us": [leadershipPhoto],
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
