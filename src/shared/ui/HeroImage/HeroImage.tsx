"use client";

import Image, { type ImageProps } from "next/image";
import { preload } from "react-dom";

import { asciiSafeAssetUrl, staticImageUrl } from "@/shared/images/preload-static-image";

type HeroImageProps = Omit<ImageProps, "priority" | "unoptimized" | "fetchPriority" | "quality"> & {
  alt: string;
  quality?: number;
};

/** LCP-hero: next/image по sizes (мобильный ~750–1080px), не полный исходник. */
export function HeroImage({ src, alt, quality = 80, sizes, ...props }: HeroImageProps) {
  const resolvedSizes = sizes ?? "(max-width: 768px) 100vw, min(1400px, 95vw)";
  const placeholder = typeof src === "string" ? "empty" : "blur";

  if (typeof src === "string") {
    preload(asciiSafeAssetUrl(src), { as: "image", fetchPriority: "high" });
  } else if (src && typeof src === "object" && "src" in src) {
    preload(asciiSafeAssetUrl(staticImageUrl(src)), { as: "image", fetchPriority: "high" });
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      priority
      quality={quality}
      sizes={resolvedSizes}
      fetchPriority="high"
      placeholder={placeholder}
    />
  );
}
