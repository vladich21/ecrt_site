import evs360CatalogHero from "@/assets/presentation/эвс-02.webp";
import evs360Showcase from "@/assets/presentation/magnific_3013745194.webp";
import ks400Showcase from "@/assets/presentation/magnific_3013812977.webp";
import lowIntensity0009 from "@/assets/low-intensity-0009/image1.webp";
import vsm1TrackCatalogHero from "@/assets/evs360-calculations/rack-interaction3.webp";
import vsm1TrackShowcase from "@/assets/evs360-calculations/rail-fastening-node.webp";
import trackLayingHero from "@/assets/presentation/09_Укладка_РШР.webp";
import hydrogenPreview from "@/assets/presentation/img-35.webp";
import evs2Showcase from "@/assets/presentation/ЭВС2-02.webp";
import type { BundledImage } from "@/data/ecrtSite";
import { getStrategicProjectBySlug } from "@/data/ecrtSite";

/** Hero/cover images for catalog project detail pages and OG previews. */
export const projectCatalogHeroImages: Partial<Record<string, BundledImage>> = {
  "evs-360": evs360CatalogHero,
  "project-0007-hydrogen": hydrogenPreview,
  "project-0009-low-intensity": lowIntensity0009,
  "vsm-1-track-elements": vsm1TrackCatalogHero,
  "track-resource-2-5b": trackLayingHero,
};

/** Images for home page product showcase slides (may differ from catalog hero). */
export const projectShowcaseImages: Partial<Record<string, BundledImage>> = {
  "evs-360": evs360Showcase,
  "ks-400-catenary": ks400Showcase,
  "vsm-1-track-elements": vsm1TrackShowcase,
  "track-resource-2-5b": trackLayingHero,
  "project-0009-low-intensity": lowIntensity0009,
  "operation-support-placeholder": evs2Showcase,
};

export function resolveProjectCatalogHeroImage(projectSlug: string): BundledImage | undefined {
  const strategic = getStrategicProjectBySlug(projectSlug);
  if (strategic) {
    return strategic.coverImage;
  }

  return projectCatalogHeroImages[projectSlug];
}
