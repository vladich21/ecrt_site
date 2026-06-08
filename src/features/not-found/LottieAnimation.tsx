"use client";

import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import type { AnimationItem } from "lottie-web";

type LottieAnimationProps = {
  animationData: object;
  label: string;
  className?: string;
  loop?: boolean;
};

export function LottieAnimation({
  animationData,
  label,
  className,
  loop = true,
}: LottieAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animation: AnimationItem | null = null;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    animation = lottie.loadAnimation({
      container,
      renderer: "svg",
      loop,
      autoplay: !reduceMotion,
      animationData,
    });

    animation.addEventListener("DOMLoaded", () => {
      if (reduceMotion) {
        animation?.goToAndStop(0, true);
      }
    });

    return () => {
      animation?.destroy();
    };
  }, [animationData, loop]);

  return <div ref={containerRef} className={className} role="img" aria-label={label} />;
}
