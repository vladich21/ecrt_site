import { HeroImage } from "@/shared/ui/HeroImage/HeroImage";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";

import styles from "./strategic-project-hero.module.scss";

type StrategicProjectHeroProps = {
  coverImageUrl: string;
  phaseLabel?: string;
  heading: string;
  lead: string;
  imageAlt?: string;
  projectSlug: string;
};

export function StrategicProjectHero({
  coverImageUrl,
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
          src={coverImageUrl}
          alt={imageAlt ?? heading}
          fill
          className={styles.strHeroImg}
          sizes="100vw"
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
