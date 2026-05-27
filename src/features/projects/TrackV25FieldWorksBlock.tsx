"use client";

import { useState } from "react";

import imgAssemblyYard from "@/assets/track-v25-field/01-assembly-pms-yard.webp";
import imgAssemblyCrane from "@/assets/track-v25-field/02-assembly-crane-sleepers.webp";
import imgAssemblyWorkers from "@/assets/track-v25-field/03-assembly-workers.webp";
import imgLayingRail from "@/assets/track-v25-field/04-laying-rail-on-sleepers.webp";
import imgStage2Prep from "@/assets/track-v25-field/этап2_Подготовка_к_снятию_старой_РШР.webp";
import imgStage2Pzs from "@/assets/track-v25-field/этап2_устройство_ПЗС.webp";
import imgStage2Pzs2 from "@/assets/track-v25-field/этап2_устройство_ПЗС2.webp";
import imgStage2Pzs3 from "@/assets/track-v25-field/этап2_устройство_ПЗС3.webp";
import imgStage3Pzs from "@/assets/track-v25-field/этап3-07а_устройство_ПЗС.webp";
import imgStage3Laying1 from "@/assets/track-v25-field/этап3-08_Укладка_РШР.webp";
import imgStage3Laying2 from "@/assets/track-v25-field/этап3-10_Укладка_РШР.webp";

import tabStyles from "@/shared/ui/StageTabs/stage-tabs.module.scss";

import {
  getProjectDetailSliderUi,
  getTrackV25FieldCopy,
  getTrackV25FieldUi,
  type ProjectDetailLocale,
} from "./project-detail-locale";
import { StagePhotoSlider } from "./StagePhotoSlider";
import styles from "./track-v25-field-works.module.scss";

const stageImages = {
  assembly: [imgAssemblyCrane, imgAssemblyYard, imgAssemblyWorkers, imgLayingRail],
  "sub-ballast": [imgStage2Prep, imgStage2Pzs, imgStage2Pzs2, imgStage2Pzs3],
  laying: [imgStage3Pzs, imgStage3Laying1, imgStage3Laying2],
} as const;

type TrackV25FieldWorksBlockProps = {
  locale?: ProjectDetailLocale;
};

export function TrackV25FieldWorksBlock({ locale = "ru" }: TrackV25FieldWorksBlockProps) {
  const fieldCopy = getTrackV25FieldCopy(locale);
  const fieldUi = getTrackV25FieldUi(locale);
  const sliderUi = getProjectDetailSliderUi(locale);

  const fieldWorkStages = fieldCopy.stages.map((stage) => ({
    ...stage,
    images: [...(stageImages[stage.id as keyof typeof stageImages] ?? [])],
  }));

  const [activeStageId, setActiveStageId] = useState(fieldWorkStages[0]?.id ?? "");
  const activeStage =
    fieldWorkStages.find((stage) => stage.id === activeStageId) ?? fieldWorkStages[0];

  if (!activeStage) return null;

  return (
    <section className={styles.root} aria-labelledby="track-v25-field-works-heading">
      <header className={styles.sectionHead}>
        <h2 id="track-v25-field-works-heading" className={styles.sectionTitle}>
          {fieldCopy.heading}
        </h2>
        <span className={styles.sectionTitleRule} aria-hidden />
        <p className={styles.sectionDeck}>{fieldCopy.intro}</p>
      </header>

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
    </section>
  );
}
