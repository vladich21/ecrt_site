"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { resolveRouteHeroImage } from "@/shared/images/route-hero-images";
import { preloadStaticImage } from "@/shared/images/preload-static-image";

/** Только hero текущей страницы. Остальные — по hover в меню (heroPreloadHandlers). */
export function RouteHeroPreloader() {
  const pathname = usePathname();

  useEffect(() => {
    const current = resolveRouteHeroImage(pathname);
    if (current) preloadStaticImage(current);
  }, [pathname]);

  return null;
}
