import { preloadAllProjectHeroImages } from "./route-hero-images";

/** Server: inject preload hints for every project hero into the document. */
export function ProjectHeroPreload() {
  preloadAllProjectHeroImages("low");
  return null;
}
