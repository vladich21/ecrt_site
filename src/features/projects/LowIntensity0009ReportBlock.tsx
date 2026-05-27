import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";

import configurationsImage from "@/assets/low-intensity-0009/img11.webp";

import {
  getLowIntensityConfigurationAlt,
  getLowIntensityReportSections,
  type ProjectDetailLocale,
} from "./project-detail-locale";
import { ProjectReportSections } from "./ProjectReportSections";
import styles from "./project-detail.module.scss";

type LowIntensity0009ReportBlockProps = {
  group: "intro" | "details";
  locale?: ProjectDetailLocale;
};

function LowIntensityConfigurationsSplit({
  bullets,
  imageAlt,
}: {
  bullets: string[];
  imageAlt: string;
}) {
  return (
    <div className={styles.strConfigurationsSplit}>
      <figure className={styles.strConfigurationsMedia}>
        <div className={styles.strConfigurationsMediaFrame}>
          <AssetImage
            src={configurationsImage}
            alt={imageAlt}
            fill
            className={styles.strConfigurationsMediaImg}
            sizes="(max-width: 980px) 100vw, min(56vw, 820px)"
          />
        </div>
      </figure>

      <ul className={styles.strConfigurationsFocusList}>
        {bullets.map((bullet, pillarIndex) => (
          <li key={bullet} className={styles.strFocusItem}>
            <span className={styles.strFocusDigit} aria-hidden>
              {(pillarIndex + 1).toString().padStart(2, "0")}
            </span>
            <p className={styles.strFocusItemText}>{bullet}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function LowIntensity0009ReportBlock({
  group,
  locale = "ru",
}: LowIntensity0009ReportBlockProps) {
  const sections = getLowIntensityReportSections(locale, group);
  const configurationSection = getLowIntensityReportSections(locale, "details").find(
    (section) => section.id === "configurations",
  );
  const configurationBullets = configurationSection?.bullets ?? [];

  return (
    <ProjectReportSections
      sections={sections}
      ariaIdPrefix="low-intensity-0009"
      continued={group === "details"}
      sectionSlots={
        group === "details"
          ? {
              configurations: (
                <LowIntensityConfigurationsSplit
                  bullets={configurationBullets}
                  imageAlt={getLowIntensityConfigurationAlt(locale)}
                />
              ),
            }
          : undefined
      }
    />
  );
}
