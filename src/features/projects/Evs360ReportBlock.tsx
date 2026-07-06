import {
  getEvs360ReportCopy,
  type ProjectDetailLocale,
} from "./project-detail-locale";

import detailStyles from "./project-detail.module.scss";
import styles from "./evs360-report.module.scss";

type Evs360Copy = ReturnType<typeof getEvs360ReportCopy>;

function ServiceClassesBlock({
  heading,
  intro,
  serviceClassLabel,
  serviceClasses,
}: {
  heading: string;
  intro: string;
  serviceClassLabel: string;
  serviceClasses: Evs360Copy["serviceClasses"];
}) {
  return (
    <div className={styles.serviceClassesBlock}>
      <h3 className={styles.serviceClassesHeading}>{heading}</h3>
      <p className={styles.serviceClassesIntro}>{intro}</p>
      <ul className={`${detailStyles.strMetricsGrid} ${styles.serviceClassesGrid}`}>
        {serviceClasses.map((serviceClass) => (
          <li key={serviceClass.name} className={`${detailStyles.strMetricItem} ${styles.serviceClassItem}`}>
            <p className={detailStyles.strMetricValue}>
              <span className={detailStyles.strMetricNumber}>{serviceClass.name}</span>
            </p>
            <p className={detailStyles.strMetricLabel}>{serviceClassLabel}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricsGrid({
  metrics,
  fourColumns = false,
}: {
  metrics: Evs360Copy["characteristicsMetrics"];
  fourColumns?: boolean;
}) {
  return (
    <ul
      className={`${detailStyles.strMetricsGrid}${fourColumns ? ` ${styles.metricsGridFour}` : ""}`}
    >
      {metrics.map((metric) => (
        <li key={metric.label} className={detailStyles.strMetricItem}>
          <p className={detailStyles.strMetricValue}>
            <span className={detailStyles.strMetricNumber}>{metric.value}</span>
            {metric.unit ? <span className={detailStyles.strMetricUnit}>{metric.unit}</span> : null}
          </p>
          <p className={detailStyles.strMetricLabel}>{metric.label}</p>
        </li>
      ))}
    </ul>
  );
}

type Evs360ReportBlockProps = {
  locale?: ProjectDetailLocale;
};

export function Evs360ReportBlock({ locale = "ru" }: Evs360ReportBlockProps) {
  const copy = getEvs360ReportCopy(locale);

  return (
    <div className={styles.root}>
      <div className={`${detailStyles.strReportShell} ${styles.reportShell}`}>
        <section className={detailStyles.strReportSection} aria-labelledby="evs-characteristics-heading">
          <header className={detailStyles.strReportSectionHead}>
            <h2 id="evs-characteristics-heading" className={detailStyles.strReportTitle}>
              {copy.characteristicsHeading}
            </h2>
            <span className={detailStyles.strReportTitleRule} aria-hidden />
            {copy.characteristicsIntro ? (
              <p className={detailStyles.strReportDeck}>{copy.characteristicsIntro}</p>
            ) : null}
          </header>
          <MetricsGrid metrics={copy.characteristicsMetrics} />
          <ServiceClassesBlock
            heading={copy.serviceClassesHeading}
            intro={copy.serviceClassesIntro}
            serviceClassLabel={copy.serviceClassLabel}
            serviceClasses={copy.serviceClasses}
          />
          {copy.characteristicsBullets.length > 0 ? (
            <ul className={detailStyles.strReportList}>
              {copy.characteristicsBullets.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className={detailStyles.strReportSection} aria-labelledby="evs-schedule-heading">
          <header className={detailStyles.strReportSectionHead}>
            <h2 id="evs-schedule-heading" className={detailStyles.strReportTitle}>
              {copy.scheduleHeading}
            </h2>
            <span className={detailStyles.strReportTitleRule} aria-hidden />
            <p className={detailStyles.strReportDeck}>{copy.scheduleIntro}</p>
          </header>
          {copy.scheduleParagraphs.length > 0
            ? copy.scheduleParagraphs.map((paragraph) => (
                <p key={paragraph} className={detailStyles.strReportParagraph}>
                  {paragraph}
                </p>
              ))
            : null}
          <MetricsGrid metrics={copy.scheduleMetrics} fourColumns />
        </section>

        <section className={detailStyles.strReportSection} aria-labelledby="evs-scale-heading">
          <header className={detailStyles.strReportSectionHead}>
            <h2 id="evs-scale-heading" className={detailStyles.strReportTitle}>
              {copy.scaleHeading}
            </h2>
            <span className={detailStyles.strReportTitleRule} aria-hidden />
            <p className={detailStyles.strReportDeck}>{copy.scaleIntro}</p>
          </header>
          <MetricsGrid metrics={copy.scaleMetrics} />
          <p className={detailStyles.strReportParagraph}>{copy.sourceNote}</p>
        </section>
      </div>
    </div>
  );
}
