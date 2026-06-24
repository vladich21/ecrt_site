import { HeroImage } from "@/shared/ui/HeroImage/HeroImage";

import type { BundledImage } from "@/data/ecrtSite";

import styles from "./project-detail.module.scss";

type ProjectCatalogHeroProps = {
  image: BundledImage;
  title: string;
  lead: string;
  imageAlt: string;
  projectSlug: string;
  imageFit?: "cover" | "panorama";
};

export function ProjectCatalogHero({
  image,
  title,
  lead,
  imageAlt,
  imageFit = "cover",
}: ProjectCatalogHeroProps) {
  const fitPanorama = imageFit === "panorama";

  return (
    <section className={styles.evsHero}>
      <div className={fitPanorama ? styles.evsHeroMediaPanorama : styles.evsHeroMedia}>
        <HeroImage
          src={image}
          alt={imageAlt}
          fill
          className={fitPanorama ? styles.heroFillImgPanorama : styles.heroFillImg}
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
