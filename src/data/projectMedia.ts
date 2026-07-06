import evs360CatalogHero from "@/assets/presentation/project_train.webp";
import evs360Showcase from "@/assets/presentation/render-train.webp";
import ks400Showcase from "@/assets/presentation/ks-test.webp";
import lowIntensity0009 from "@/assets/low-intensity-0009/figure2.webp";
import lowIntensityShowcase from "@/assets/low-intensity-0009/showcase-train.png";
import vsm1TrackRender from "@/assets/track-v25-modeling/renderv2.5-showcase.png";
import trackLayingHero from "@/assets/presentation/09_Укладка_РШР.webp";
import hydrogenPreview from "@/assets/presentation/img-35.webp";
import evs2Showcase from "@/assets/presentation/evs2-02.webp";
import type { BundledImage } from "@/data/ecrtSite";
import { getStrategicProjectBySlug } from "@/data/ecrtSite";

export const projectCatalogHeroImages: Partial<Record<string, BundledImage>> = {
  "evs-360": evs360CatalogHero,
  "project-0007-hydrogen": hydrogenPreview,
  "project-0009-low-intensity": lowIntensity0009,
  "vsm-1-track-elements": vsm1TrackRender,
  "track-resource-2-5b": trackLayingHero,
};

export const projectShowcaseImages: Partial<Record<string, BundledImage>> = {
  "evs-360": evs360Showcase,
  "ks-400-catenary": ks400Showcase,
  "vsm-1-track-elements": vsm1TrackRender,
  "track-resource-2-5b": trackLayingHero,
  "project-0009-low-intensity": lowIntensityShowcase,
  "operation-support-placeholder": evs2Showcase,
};

export function resolveProjectCatalogHeroImage(projectSlug: string): BundledImage | undefined {
  const strategic = getStrategicProjectBySlug(projectSlug);
  if (strategic) {
    return strategic.coverImage;
  }

  return projectCatalogHeroImages[projectSlug];
}
