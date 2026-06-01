import Image, { type ImageProps } from "next/image";

type AssetImageProps = Omit<ImageProps, "unoptimized"> & {
  alt: string;
  /**
   * Полный исходный файл (без /_next/image).
   * Только для слайдеров и кадров, где важно максимальное качество.
   */
  fullResolution?: boolean;
};

/** Должно быть в next.config `images.qualities` */
const DEFAULT_QUALITY = 90;

/**
 * По умолчанию next/image подбирает ширину по `sizes` (важно для mobile LCP).
 * fullResolution — оригинальный webp без ресайза.
 */
export function AssetImage({
  alt,
  fullResolution = false,
  quality = DEFAULT_QUALITY,
  ...props
}: AssetImageProps) {
  return <Image {...props} alt={alt} unoptimized={fullResolution} quality={quality} />;
}
