"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { shouldLimitPreload } from "./network-preload";
import {
  preloadAllProjectHeroImages,
  preloadRouteHeroImage,
  warmAllProjectHeroImages,
} from "./route-hero-images";

/** Once per session: fetch and decode every project hero for instant client navigations. */
export function ProjectHeroIdleWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    if (shouldLimitPreload()) return;

    preloadAllProjectHeroImages("low");
    warmAllProjectHeroImages();
  }, []);

  useEffect(() => {
    preloadRouteHeroImage(pathname);
  }, [pathname]);

  return null;
}
