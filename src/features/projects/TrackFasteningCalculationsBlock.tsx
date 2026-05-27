import { getTrackFasteningCalculationsCopy, type ProjectDetailLocale } from "./project-detail-locale";
import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import clampFrequencyChartSrc from "@/assets/evs360-calculations/clamp-frequency-chart.webp";
import clampFormSrc from "@/assets/evs360-calculations/clamp-form.webp";
import railFasteningNodeSrc from "@/assets/evs360-calculations/rail-fastening-node.webp";
import trackSuperstructureNodeSrc from "@/assets/evs360-calculations/track-superstructure-node.webp";
import trainTrackInteractionSrc from "@/assets/evs360-calculations/train-track-interaction.webp";
import wheelClampLoadSrc from "@/assets/evs360-calculations/wheel-clamp-load.webp";

import styles from "./evs360-report.module.scss";

const calculationImages = [
  [clampFormSrc, clampFrequencyChartSrc],
  [trainTrackInteractionSrc, wheelClampLoadSrc],
  [railFasteningNodeSrc],
  [trackSuperstructureNodeSrc],
] as const;

type TrackFasteningCalculationsBlockProps = {
  locale?: ProjectDetailLocale;
};

export function TrackFasteningCalculationsBlock({ locale = "ru" }: TrackFasteningCalculationsBlockProps) {
  const copy = getTrackFasteningCalculationsCopy(locale);

  return (
    <div className={styles.root}>
      <section className={styles.section} aria-labelledby="track-calculations-heading">
        <div className={styles.reportSectionHead}>
          <h2 id="track-calculations-heading" className={styles.reportTitle}>
            {copy.heading}
          </h2>
          <span className={styles.reportTitleRule} aria-hidden />
          <p className={styles.reportDeck}>{copy.intro}</p>
        </div>
        <div className={styles.calculationSeries}>
          {copy.directions.map((item, itemIndex) => (
            <article
              key={item.title}
              className={`${styles.calculationEntry} ${itemIndex % 2 === 1 ? styles.calculationEntryReverse : ""}`}
            >
              <div className={styles.calculationMedia}>
                {(calculationImages[itemIndex] ?? []).map((image, index) => (
                  <AssetImage
                    key={`${item.title}-${index}`}
                    src={image}
                    alt=""
                    className={styles.calculationImg}
                    sizes="(max-width: 900px) 50vw, 260px"
                  />
                ))}
              </div>
              <div className={styles.calculationBody}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
