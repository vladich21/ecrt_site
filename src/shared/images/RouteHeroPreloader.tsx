"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { allRouteHeroImages, resolveRouteHeroImage } from "@/shared/images/route-hero-images";
import { preloadStaticImage } from "@/shared/images/preload-static-image";

import { scheduleIdleWork, shouldLimitPreload } from "./network-preload";

function isHomePath(pathname: string): boolean {
  const path = pathname.replace(/\/$/, "") || "/";
  return path === "/" || path === "/en";
}

/** Прогрев hero текущего маршрута; остальные hero — в idle (кроме главной). */
export function RouteHeroPreloader() {
  const pathname = usePathname();

  useEffect(() => {
    const current = resolveRouteHeroImage(pathname);
    if (current) preloadStaticImage(current);

    if (shouldLimitPreload() || isHomePath(pathname)) return;

    scheduleIdleWork(() => {
      const currentUrl = current ? (typeof current === "string" ? current : current.src) : "";
      for (const image of allRouteHeroImages()) {
        const url = typeof image === "string" ? image : image.src;
        if (url === currentUrl) continue;
        preloadStaticImage(image);
      }
    });
  }, [pathname]);

  return null;
}
