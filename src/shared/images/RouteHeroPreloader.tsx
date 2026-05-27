"use client";

import { useEffect } from "react";

import { allRouteHeroImages } from "@/shared/images/route-hero-images";
import { preloadStaticImage } from "@/shared/images/preload-static-image";

export function RouteHeroPreloader() {
  useEffect(() => {
    const warmCache = () => {
      for (const image of allRouteHeroImages()) {
        preloadStaticImage(image);
      }
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warmCache, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timerId = setTimeout(warmCache, 400);
    return () => clearTimeout(timerId);
  }, []);

  return null;
}
