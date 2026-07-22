"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { shouldLimitPreload } from "./network-preload";
import { preloadRouteHeroImage, warmAllProjectHeroImages } from "./route-hero-images";

/** Once per session: warm project heroes into cache (no bulk link preload). */
export function ProjectHeroIdleWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    if (shouldLimitPreload()) return;

    // Warm into browser cache without <link rel="preload"> (avoids unused-preload warnings).
    warmAllProjectHeroImages();
  }, []);

  useEffect(() => {
    // Current-route hero only — used immediately by the page hero.
    preloadRouteHeroImage(pathname);
  }, [pathname]);

  return null;
}
