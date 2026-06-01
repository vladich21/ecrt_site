"use client";

import { useEffect, type ReactNode } from "react";

import { registerLenis } from "./smooth-scroll";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const MOBILE_MQ = "(max-width: 768px)";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

/** Lenis только на десктопе — меньше JS/CSS и TBT на мобильных. */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const mobileQuery = window.matchMedia(MOBILE_MQ);
    if (motionQuery.matches || mobileQuery.matches) return;

    let destroyed = false;
    let lenisInstance: { destroy: () => void } | null = null;

    void (async () => {
      const [{ default: Lenis }] = await Promise.all([
        import("lenis"),
        import("lenis/dist/lenis.css"),
      ]);

      if (destroyed || motionQuery.matches || mobileQuery.matches) return;

      const lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.15,
        autoRaf: true,
      });

      lenisInstance = lenis;
      registerLenis(lenis);
      document.documentElement.classList.add("lenis", "lenis-smooth");
    })();

    const teardownLenis = () => {
      lenisInstance?.destroy();
      lenisInstance = null;
      registerLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };

    const onMotionChange = () => {
      if (motionQuery.matches) teardownLenis();
    };

    const onMobileChange = () => {
      if (mobileQuery.matches) teardownLenis();
    };

    motionQuery.addEventListener("change", onMotionChange);
    mobileQuery.addEventListener("change", onMobileChange);

    return () => {
      destroyed = true;
      motionQuery.removeEventListener("change", onMotionChange);
      mobileQuery.removeEventListener("change", onMobileChange);
      lenisInstance?.destroy();
      registerLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return children;
}
