import { resolveProjectCatalogHeroImage } from "@/data/projectMedia";

import { imageSrc } from "./image-src";

export function resolveProjectPreviewImage(projectSlug: string): string | undefined {
  const image = resolveProjectCatalogHeroImage(projectSlug);
  return image ? imageSrc(image) : undefined;
}

export function resolveProjectHeroImage(projectSlug: string) {
  return resolveProjectCatalogHeroImage(projectSlug);
}
