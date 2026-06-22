import aboutHeroImage from "@/assets/presentation/О-нас.webp";
import purchaseHeroImage from "@/assets/presentation/закупки-hero1.webp";
import careersHeroImage from "@/assets/presentation/проекты.webp";
import projectsHeroImage from "@/assets/presentation/project_train.webp";
import type { BundledImage } from "@/data/ecrtSite";
import { strategicProjects } from "@/data/ecrtSite";
import { projectCatalogHeroImages } from "@/data/projectMedia";

import { preloadHeroImage, staticImageUrl, type StaticImageLike } from "./preload-static-image";

const pageHeroByPath: Record<string, StaticImageLike> = {
  "/about-us": aboutHeroImage,
  "/projects": projectsHeroImage,
  "/careers": careersHeroImage,
  "/purchase": purchaseHeroImage,
};

const projectHeroBySlug = new Map<string, StaticImageLike>();

for (const [slug, image] of Object.entries(projectCatalogHeroImages)) {
  if (image) projectHeroBySlug.set(slug, image);
}

for (const project of strategicProjects) {
  projectHeroBySlug.set(project.slug, project.coverImage);
}

function normalizePath(pathOrHref: string): string {
  const withoutQuery = pathOrHref.split(/[?#]/)[0] ?? pathOrHref;
  const withoutLocale = withoutQuery.replace(/^\/en(?=\/|$)/, "") || "/";
  if (withoutLocale.length > 1 && withoutLocale.endsWith("/")) {
    return withoutLocale.slice(0, -1);
  }
  return withoutLocale;
}

export function resolveRouteHeroImage(pathOrHref: string): StaticImageLike | undefined {
  const path = normalizePath(pathOrHref);

  if (pageHeroByPath[path]) {
    return pageHeroByPath[path];
  }

  const projectMatch = path.match(/^\/project\/([^/]+)$/);
  if (!projectMatch) return undefined;

  return projectHeroBySlug.get(projectMatch[1]);
}

export function preloadRouteHeroImage(pathOrHref: string): void {
  const image = resolveRouteHeroImage(pathOrHref);
  if (!image) return;

  preloadHeroImage(image, "high");
}

export function heroPreloadHandlers(href: string) {
  return {
    onMouseEnter: () => preloadRouteHeroImage(href),
    onFocus: () => preloadRouteHeroImage(href),
  };
}

export function allRouteHeroImages(): StaticImageLike[] {
  const seen = new Set<string>();
  const images: StaticImageLike[] = [];

  const add = (image: BundledImage | StaticImageLike | undefined) => {
    if (!image) return;
    const url = staticImageUrl(image);
    if (seen.has(url)) return;
    seen.add(url);
    images.push(image);
  };

  for (const image of Object.values(pageHeroByPath)) add(image);
  for (const image of projectHeroBySlug.values()) add(image);

  return images;
}
