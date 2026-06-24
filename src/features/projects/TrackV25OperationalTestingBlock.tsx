"use client";

import { useEffect } from "react";

import { trackV25OperationalTestingImages } from "@/data/project-page-images";
import { preloadStaticImage } from "@/shared/images/preload-static-image";
import { scheduleIdleWork } from "@/shared/images/network-preload";
import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

import {
  getProjectDetailSliderUi,
  getTrackV25OperationalTestingCopy,
  type ProjectDetailLocale,
} from "./project-detail-locale";
import { StagePhotoSlider } from "./StagePhotoSlider";
import styles from "./track-v25-operational-testing.module.scss";

type TrackV25OperationalTestingBlockProps = {
  locale?: ProjectDetailLocale;
};

export function TrackV25OperationalTestingBlock({
  locale = "ru",
}: TrackV25OperationalTestingBlockProps) {
  const copy = getTrackV25OperationalTestingCopy(locale);
  const sliderUi = getProjectDetailSliderUi(locale);

  useEffect(() => {
    scheduleIdleWork(() => {
      for (const image of trackV25OperationalTestingImages) {
        preloadStaticImage(image);
      }
    });
  }, []);

  return (
    <ScrollRevealSection
      className={styles.root}
      aria-labelledby="track-v25-operational-testing-heading"
    >
      <ScrollRevealBlock>
        <header className={styles.sectionHead}>
          <h2 id="track-v25-operational-testing-heading" className={styles.sectionTitle}>
            {copy.heading}
          </h2>
          <span className={styles.sectionTitleRule} aria-hidden />
        </header>
      </ScrollRevealBlock>

      <ScrollRevealBlock className={styles.contentReveal}>
        <div className={styles.contentPanel}>
          <div className={styles.sectionParagraphs}>
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.sectionParagraph}>
                {paragraph}
              </p>
            ))}
          </div>

          <StagePhotoSlider
            stageId="operational-testing"
            stageTitle={copy.heading}
            images={[...trackV25OperationalTestingImages]}
            sliderUi={sliderUi}
          />
        </div>
      </ScrollRevealBlock>
    </ScrollRevealSection>
  );
}
