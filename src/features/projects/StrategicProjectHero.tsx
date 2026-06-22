import { HeroImage } from "@/shared/ui/HeroImage/HeroImage";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";
import type { BundledImage } from "@/data/ecrtSite";

import styles from "./strategic-project-hero.module.scss";

type StrategicProjectHeroProps = {
  coverImage: BundledImage;
  phaseLabel?: string;
  heading: string;
  lead: string;
  imageAlt?: string;
  projectSlug: string;
};

export function StrategicProjectHero({
  coverImage,
  phaseLabel,
  heading,
  lead,
  imageAlt,
  projectSlug,
}: StrategicProjectHeroProps) {
  preloadRouteHeroImage(`/project/${projectSlug}`);

  return (
    <section className={styles.strHero} aria-label={heading}>
      <div className={styles.strHeroMedia}>
        <HeroImage
          src={coverImage}
          alt={imageAlt ?? heading}
          fill
          className={styles.strHeroImg}
        />
      </div>
      <span className={styles.strHeroGradient} aria-hidden />
      <div className={styles.strHeroText}>
        {phaseLabel ? <p className={styles.strHeroPhase}>{phaseLabel}</p> : null}
        <h1 className={styles.strHeroHeading}>{heading}</h1>
        <p className={styles.strHeroLead}>{lead}</p>
      </div>
    </section>
  );
}
