import Image, { type ImageProps } from "next/image";

type HeroImageProps = Omit<ImageProps, "priority" | "fetchPriority" | "quality"> & {
  alt: string;
  quality?: number;
  /** Bundled webp/png assets skip `/_next/image` and load straight from the CDN. */
  unoptimized?: boolean;
};

function isBundledAsset(src: ImageProps["src"]): src is Exclude<ImageProps["src"], string> {
  return typeof src === "object" && src !== null && "src" in src;
}

export function HeroImage({
  src,
  alt,
  quality = 90,
  sizes,
  unoptimized,
  ...props
}: HeroImageProps) {
  const resolvedSizes = sizes ?? "(max-width: 768px) 100vw, min(1400px, 95vw)";
  const serveDirect = unoptimized ?? isBundledAsset(src);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      priority
      quality={quality}
      sizes={resolvedSizes}
      fetchPriority="high"
      placeholder="empty"
      unoptimized={serveDirect}
    />
  );
}
