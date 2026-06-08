import { HeroImage } from "@/shared/ui/HeroImage/HeroImage";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";

import type { BundledImage } from "@/data/ecrtSite";

import styles from "./project-detail.module.scss";

type ProjectCatalogHeroProps = {
  image: BundledImage;
  title: string;
  lead: string;
  imageAlt: string;
  projectSlug: string;
  /** Панорама — широкий кадр с ручной позицией через CSS-переменные */
  imageFit?: "cover" | "panorama";
};

export function ProjectCatalogHero({
  image,
  title,
  lead,
  imageAlt,
  projectSlug,
  imageFit = "cover",
}: ProjectCatalogHeroProps) {
  preloadRouteHeroImage(`/project/${projectSlug}`);
  const fitPanorama = imageFit === "panorama";

  return (
    <section className={styles.evsHero}>
      <div className={fitPanorama ? styles.evsHeroMediaPanorama : styles.evsHeroMedia}>
        <HeroImage
          src={image}
          alt={imageAlt}
          fill
          className={fitPanorama ? styles.heroFillImgPanorama : styles.heroFillImg}
          sizes="100vw"
          quality={fitPanorama ? 90 : 80}
        />
      </div>
      <span className={styles.evsHeroGradient} aria-hidden />
      <div className={styles.evsHeroContent}>
        <div>
          <h1>{title}</h1>
          <p className={styles.evsHeroLead}>{lead}</p>
        </div>
      </div>
    </section>
  );
}
