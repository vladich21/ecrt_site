import Image, { type ImageProps } from "next/image";

type HeroImageProps = Omit<ImageProps, "priority" | "unoptimized" | "fetchPriority" | "quality"> & {
  alt: string;
  quality?: number;
};

export function HeroImage({ src, alt, quality = 80, sizes, ...props }: HeroImageProps) {
  const resolvedSizes = sizes ?? "(max-width: 768px) 100vw, min(1400px, 95vw)";

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
    />
  );
}
