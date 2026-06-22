import Image, { type ImageProps } from "next/image";

type AssetImageProps = Omit<ImageProps, "unoptimized"> & {
  alt: string;
  fullResolution?: boolean;
};

const DEFAULT_QUALITY = 90;

export function AssetImage({
  alt,
  fullResolution = false,
  quality = DEFAULT_QUALITY,
  ...props
}: AssetImageProps) {
  return <Image {...props} alt={alt} unoptimized={fullResolution} quality={quality} />;
}
