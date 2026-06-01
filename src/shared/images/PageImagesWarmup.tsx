"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import {
  resolveCriticalPageImages,
  resolveDeferredPageImages,
} from "@/shared/images/page-image-preload";
import { preloadStaticImage } from "@/shared/images/preload-static-image";
import { resolveRouteHeroImage } from "@/shared/images/route-hero-images";

import { scheduleIdleWork, shouldLimitPreload } from "./network-preload";

/** Клиентский прогрев: сначала hero + critical, остальное — в idle (если сеть позволяет). */
export function PageImagesWarmup() {
  const pathname = usePathname();

  useEffect(() => {
    const hero = resolveRouteHeroImage(pathname);
    if (hero) preloadStaticImage(hero);

    for (const image of resolveCriticalPageImages(pathname)) {
      preloadStaticImage(image);
    }

    if (shouldLimitPreload()) return;

    scheduleIdleWork(() => {
      for (const image of resolveDeferredPageImages(pathname)) {
        preloadStaticImage(image);
      }
    });
  }, [pathname]);

  return null;
}
