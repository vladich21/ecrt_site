"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

type LazyInViewVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "preload"> & {
  rootMargin?: string;
};

function parseRootMarginPx(margin: string): number {
  const top = margin.trim().split(/\s+/)[0] ?? "0px";
  const n = parseFloat(top);
  return Number.isFinite(n) ? n : 0;
}

function isNearViewport(node: HTMLElement, marginPx: number): boolean {
  const rect = node.getBoundingClientRect();
  return rect.top < window.innerHeight + marginPx && rect.bottom > -marginPx;
}

export function LazyInViewVideo({
  rootMargin = "200px 0px",
  autoPlay,
  className,
  children,
  ...props
}: LazyInViewVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const marginPx = parseRootMarginPx(rootMargin);

    if (isNearViewport(node, marginPx)) {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!shouldLoad || !autoPlay) return;
    const node = ref.current;
    if (!node) return;

    const play = () => {
      void node.play().catch(() => {
      });
    };

    if (node.readyState >= 2) {
      play();
      return;
    }

    node.addEventListener("loadeddata", play, { once: true });
    return () => node.removeEventListener("loadeddata", play);
  }, [shouldLoad, autoPlay]);

  const videoClassName = [className, isPlaying ? "is-video-playing" : ""].filter(Boolean).join(" ");

  return (
    <video
      ref={ref}
      className={videoClassName}
      preload={shouldLoad ? "auto" : "none"}
      autoPlay={shouldLoad && autoPlay}
      onPlaying={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
      {...props}
    >
      {shouldLoad ? children : null}
    </video>
  );
}
