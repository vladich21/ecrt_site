declare module "*.jpg" {
  import type { StaticImageData } from "next/image";

  const content: StaticImageData;
  export default content;
}

declare module "*.JPG" {
  import type { StaticImageData } from "next/image";

  const content: StaticImageData;
  export default content;
}
