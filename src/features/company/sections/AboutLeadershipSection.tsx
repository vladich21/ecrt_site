import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

import leadershipPhoto from "@/assets/about/kireytsev-general-director.webp";

import type { AboutCopy } from "../about-types";
import styles from "../about-page.module.scss";

export function AboutLeadershipSection({ aboutCopy }: { aboutCopy: AboutCopy }) {
  return (
    <ScrollRevealSection className={styles.leadership} aria-labelledby="about-leadership-heading">
      <div className={styles.leadershipInner}>
        <div className={styles.leadershipVisual}>
          <div className={styles.leadershipPhotoWrap}>
            <span className={styles.leadershipPhotoMesh} aria-hidden />
            <figure className={styles.leadershipPhotoFigure}>
              <AssetImage
                className={styles.leadershipPhoto}
                src={leadershipPhoto}
                alt={aboutCopy.leadership.photoAlt}
                width={leadershipPhoto.width}
                height={leadershipPhoto.height}
                priority
              />
            </figure>
          </div>
        </div>

        <ScrollRevealBlock className={styles.leadershipBody}>
          <h2 className={styles.leadershipName} id="about-leadership-heading">
            {aboutCopy.leadership.name}
          </h2>
          <span className={styles.pillarsHeadRule} aria-hidden />
          <p className={styles.leadershipRole}>{aboutCopy.leadership.role}</p>
          <div className={styles.pillarCard}>
            <p className={styles.pillarText}>{aboutCopy.leadership.quote}</p>
          </div>
        </ScrollRevealBlock>
      </div>
    </ScrollRevealSection>
  );
}
