import { HeroImage } from "@/shared/ui/HeroImage/HeroImage";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";

import type { BundledImage } from "@/data/ecrtSite";

import { imageSrc } from "./image-src";
import styles from "./project-detail.module.scss";

type ProjectCatalogHeroProps = {
  image: BundledImage;
  title: string;
  lead: string;
  imageAlt: string;
  projectSlug: string;
};

export function ProjectCatalogHero({
  image,
  title,
  lead,
  imageAlt,
  projectSlug,
}: ProjectCatalogHeroProps) {
  preloadRouteHeroImage(`/project/${projectSlug}`);

  return (
    <section className={styles.evsHero}>
      <div className={styles.evsHeroMedia}>
        <HeroImage
          src={imageSrc(image)}
          alt={imageAlt}
          fill
          className={styles.heroFillImg}
          sizes="(max-width: 900px) 100vw, 1200px"
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
