"use client";

import Image, { type ImageProps } from "next/image";
import { preload } from "react-dom";

import { asciiSafeAssetUrl, staticImageUrl } from "@/shared/images/preload-static-image";

type HeroImageProps = Omit<ImageProps, "priority" | "unoptimized" | "fetchPriority"> & {
  alt: string;
};

export function HeroImage({ src, alt, ...props }: HeroImageProps) {
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
      unoptimized
      fetchPriority="high"
    />
  );
}
