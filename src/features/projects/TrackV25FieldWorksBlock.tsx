"use client";

import { useEffect, useState } from "react";

import { trackV25FieldAllImages, trackV25FieldStageImages } from "@/data/project-page-images";
import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";
import { preloadStaticImage } from "@/shared/images/preload-static-image";
import { scheduleIdleWork } from "@/shared/images/network-preload";
import tabStyles from "@/shared/ui/StageTabs/stage-tabs.module.scss";

import {
  getProjectDetailSliderUi,
  getTrackV25FieldCopy,
  getTrackV25FieldUi,
  type ProjectDetailLocale,
} from "./project-detail-locale";
import { StagePhotoSlider } from "./StagePhotoSlider";
import styles from "./track-v25-field-works.module.scss";

type TrackV25FieldWorksBlockProps = {
  locale?: ProjectDetailLocale;
};

export function TrackV25FieldWorksBlock({ locale = "ru" }: TrackV25FieldWorksBlockProps) {
  const fieldCopy = getTrackV25FieldCopy(locale);
  const fieldUi = getTrackV25FieldUi(locale);
  const sliderUi = getProjectDetailSliderUi(locale);

  const fieldWorkStages = fieldCopy.stages.map((stage) => ({
    ...stage,
    images: [...(trackV25FieldStageImages[stage.id as keyof typeof trackV25FieldStageImages] ?? [])],
  }));

  useEffect(() => {
    scheduleIdleWork(() => {
      for (const image of trackV25FieldAllImages) {
        preloadStaticImage(image);
      }
    });
  }, []);

  const [activeStageId, setActiveStageId] = useState(fieldWorkStages[0]?.id ?? "");
  const activeStage =
    fieldWorkStages.find((stage) => stage.id === activeStageId) ?? fieldWorkStages[0];

  if (!activeStage) return null;

  return (
    <ScrollRevealSection className={styles.root} aria-labelledby="track-v25-field-works-heading">
      <ScrollRevealBlock>
        <header className={styles.sectionHead}>
          <h2 id="track-v25-field-works-heading" className={styles.sectionTitle}>
            {fieldCopy.heading}
          </h2>
          <span className={styles.sectionTitleRule} aria-hidden />
          <p className={styles.sectionDeck}>{fieldCopy.intro}</p>
        </header>
      </ScrollRevealBlock>

      <ScrollRevealBlock>
      <div className={styles.stageSwitcher}>
        <div className={tabStyles.stageTabList} role="tablist" aria-label={fieldUi.tabListLabel}>
          {fieldWorkStages.map((stage, stageIndex) => {
            const isActive = stage.id === activeStageId;
            const stageNumber = (stageIndex + 1).toString().padStart(2, "0");
            const tabId = `track-v25-tab-${stage.id}`;
            const panelId = `track-v25-panel-${stage.id}`;

            return (
              <button
                key={stage.id}
                id={tabId}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId}
                className={`${tabStyles.stageTab} ${isActive ? tabStyles.stageTabActive : ""}`}
                onClick={() => setActiveStageId(stage.id)}
              >
                <span className={tabStyles.stageTabLabel}>
                  {fieldUi.stageTabLabel.replace("{number}", stageNumber)}
                </span>
              </button>
            );
          })}
        </div>

        <article
          id={`track-v25-panel-${activeStage.id}`}
          role="tabpanel"
          aria-labelledby={`track-v25-tab-${activeStage.id}`}
          className={styles.stagePanel}
        >
          <div className={styles.stagePanelInner}>
            <div className={styles.stagePanelCopy}>
              <h3 className={styles.stagePanelTitle}>{activeStage.title}</h3>
              <p className={styles.stagePanelDescription}>{activeStage.description}</p>
              {activeStage.locationNote ? (
                <p className={styles.stagePanelLocation}>{activeStage.locationNote}</p>
              ) : null}
            </div>

            {activeStage.images.length > 0 ? (
              <StagePhotoSlider
                stageId={activeStage.id}
                stageTitle={activeStage.title}
                images={activeStage.images}
                sliderUi={sliderUi}
              />
            ) : (
              <p className={styles.stagePhotosPlaceholder}>{fieldUi.photosPlaceholder}</p>
            )}
          </div>
        </article>
      </div>
      </ScrollRevealBlock>
    </ScrollRevealSection>
  );
}
