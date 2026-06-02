import type { StaticImageData } from "next/image";

import { HeroImage } from "@/shared/ui/HeroImage/HeroImage";

import styles from "./page-hero.module.scss";

type PageHeroProps = {
  image: StaticImageData;
  title: string;
  lead?: string;
  headingId: string;
  imageAlt?: string;
  animateCopy?: boolean;
  copyMotion?: unknown;
  mediaClassName?: string;
  className?: string;
};

export function PageHero({
  image,
  title,
  lead,
  headingId,
  imageAlt,
  mediaClassName,
  className,
}: PageHeroProps) {
  const alt = imageAlt ?? title;

  const copyContent = (
    <>
      <h1 className={styles.heroTitle} id={headingId}>
        {title}
      </h1>
      {lead ? <p className={styles.heroLead}>{lead}</p> : null}
    </>
  );

  return (
    <section
      className={className ? `${styles.hero} ${className}` : styles.hero}
      aria-labelledby={headingId}
    >
      <div className={styles.stage}>
        <div className={styles.heroMediaShell}>
          <HeroImage
            src={image}
            alt={alt}
            fill
            className={
              mediaClassName
                ? `${styles.heroMedia} ${mediaClassName}`
                : styles.heroMedia
            }
          />
        </div>
        <div className={styles.scrim} aria-hidden />
        <div className={styles.overlay}>
          <header className={styles.heroCopy}>{copyContent}</header>
        </div>
      </div>
    </section>
  );
}
