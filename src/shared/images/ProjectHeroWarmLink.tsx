"use client";

import Link, { type LinkProps } from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  type AnchorHTMLAttributes,
  type ReactNode,
} from "react";

import { preloadOptimizedHeroImage } from "@/shared/images/preload-static-image";
import { resolveRouteHeroImage } from "@/shared/images/route-hero-images";

type ProjectHeroWarmLinkProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | "href"> & {
    children: ReactNode;
  };

export function ProjectHeroWarmLink({
  href,
  children,
  onPointerDown,
  onMouseEnter,
  onFocus,
  ...props
}: ProjectHeroWarmLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const hrefString = typeof href === "string" ? href : href.toString();
  const image = resolveRouteHeroImage(hrefString);

  const warmHero = useCallback(() => {
    if (image) preloadOptimizedHeroImage(image, "low");
  }, [image]);

  useEffect(() => {
    const element = linkRef.current;
    if (!element || !image) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        warmHero();
        observer.disconnect();
      },
      { rootMargin: "280px 0px", threshold: 0.01 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [image, warmHero]);

  return (
    <Link
      ref={linkRef}
      href={href}
      onPointerDown={(event) => {
        warmHero();
        onPointerDown?.(event);
      }}
      onMouseEnter={(event) => {
        warmHero();
        onMouseEnter?.(event);
      }}
      onFocus={(event) => {
        warmHero();
        onFocus?.(event);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
