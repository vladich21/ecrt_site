"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { primaryPageHeroImages, resolveRouteHeroImage } from "@/shared/images/route-hero-images";
import { preloadOptimizedHeroImage, preloadStaticImage } from "@/shared/images/preload-static-image";

import { scheduleIdleWork, shouldLimitPreload } from "./network-preload";

let primaryHeroWarmupDone = false;

/** Текущий hero сразу; основные разделы прогреваем в idle для мгновенных переходов по меню. */
export function RouteHeroPreloader() {
  const pathname = usePathname();

  useEffect(() => {
    const current = resolveRouteHeroImage(pathname);
    if (current) {
      preloadStaticImage(current);
      preloadOptimizedHeroImage(current, "high");
    }

    if (primaryHeroWarmupDone || shouldLimitPreload()) return;
    primaryHeroWarmupDone = true;

    scheduleIdleWork(() => {
      for (const image of primaryPageHeroImages()) {
        preloadOptimizedHeroImage(image);
      }
    });
  }, [pathname]);

  return null;
}
