"use client";

import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import imgLoads from "@/assets/presentation/image.webp";
import imgPathStructure from "@/assets/presentation/Расчет кострукции пути.webp";
import imgNodes from "@/assets/presentation/Расчте узлов и элементов пути.webp";
import imgGeo from "@/assets/presentation/Геотехнические расчеты.webp";
import imgOptimize1 from "@/assets/presentation/Оптимизация параметров конструкции пути и его элементов1.webp";
import imgOptimize2 from "@/assets/presentation/Оптимизация параметров конструкции пути и его элементов2.webp";
import imgOptimize3 from "@/assets/presentation/Оптимизация параметров конструкции пути и его элементов3.webp";
import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

import { getTrackV25ModelingCopy, type ProjectDetailLocale } from "./project-detail-locale";
import styles from "./evs360-report.module.scss";

const modelingImages = [
  [imgLoads],
  [imgPathStructure],
  [imgNodes],
  [imgGeo],
  [imgOptimize1, imgOptimize2, imgOptimize3],
] as const;

type TrackV25ModelingBlockProps = {
  locale?: ProjectDetailLocale;
};

export function TrackV25ModelingBlock({ locale = "ru" }: TrackV25ModelingBlockProps) {
  const copy = getTrackV25ModelingCopy(locale);

  return (
    <div className={styles.root}>
      <ScrollRevealSection className={styles.section} aria-labelledby="track-v25-modeling-heading">
        <ScrollRevealBlock>
          <div className={styles.reportSectionHead}>
            <h2 id="track-v25-modeling-heading" className={styles.reportTitle}>
              {copy.heading}
            </h2>
            <span className={styles.reportTitleRule} aria-hidden />
            <p className={styles.reportDeck}>{copy.intro}</p>
          </div>
        </ScrollRevealBlock>
        <div className={styles.calculationSeries}>
          {copy.blocks.map((item, itemIndex) => (
            <ScrollRevealBlock
              key={item.title}
              inView
              className={`${styles.calculationEntry} ${itemIndex % 2 === 1 ? styles.calculationEntryReverse : ""}`}
            >
              <div className={styles.calculationMedia}>
                {(modelingImages[itemIndex] ?? []).map((image, index) => (
                  <AssetImage
                    key={`${item.title}-${index}`}
                    src={image}
                    alt=""
                    className={styles.calculationImg}
                    sizes="(max-width: 900px) 50vw, 280px"
                  />
                ))}
              </div>
              <div className={styles.calculationBody}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </ScrollRevealBlock>
          ))}
        </div>
      </ScrollRevealSection>
    </div>
  );
}
