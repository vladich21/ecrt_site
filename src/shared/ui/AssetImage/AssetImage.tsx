import Image, { type ImageProps } from "next/image";

type AssetImageProps = Omit<ImageProps, "unoptimized"> & {
  alt: string;
};

/** Статические файлы из src/assets — без повторного сжатия через /_next/image */
export function AssetImage({ alt, ...props }: AssetImageProps) {
  return <Image {...props} alt={alt} unoptimized />;
}
