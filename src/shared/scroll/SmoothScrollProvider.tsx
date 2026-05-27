"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

import { registerLenis } from "./smooth-scroll";

import "lenis/dist/lenis.css";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useEffect(() => {
    const motionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    if (motionQuery.matches) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
      autoRaf: true,
    });

    registerLenis(lenis);
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const onMotionChange = () => {
      if (motionQuery.matches) {
        lenis.destroy();
        registerLenis(null);
        document.documentElement.classList.remove("lenis", "lenis-smooth");
      }
    };

    motionQuery.addEventListener("change", onMotionChange);

    return () => {
      motionQuery.removeEventListener("change", onMotionChange);
      lenis.destroy();
      registerLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return children;
}
