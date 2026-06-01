import Image, { type ImageProps } from "next/image";

type AssetImageProps = Omit<ImageProps, "unoptimized"> & {
  alt: string;
};

/**
 * Статические webp из src/assets — без повторного сжатия через /_next/image.
 * Исходник уже оптимизирован; next/image только layout + lazy/priority.
 */
export function AssetImage({ alt, ...props }: AssetImageProps) {
  return <Image {...props} alt={alt} unoptimized />;
}
