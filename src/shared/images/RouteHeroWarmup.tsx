"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { preloadRouteHeroImage } from "./route-hero-images";

/** Preloads the hero for the current route (and on nav link hover via header handlers). */
export function RouteHeroWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    preloadRouteHeroImage(pathname);
  }, [pathname]);

  return null;
}
