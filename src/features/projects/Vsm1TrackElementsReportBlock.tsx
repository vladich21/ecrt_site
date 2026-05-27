import { getVsm1TrackReportSections, type ProjectDetailLocale } from "./project-detail-locale";
import { ProjectReportSections } from "./ProjectReportSections";

type Vsm1TrackElementsReportBlockProps = {
  locale?: ProjectDetailLocale;
};

export function Vsm1TrackElementsReportBlock({ locale = "ru" }: Vsm1TrackElementsReportBlockProps) {
  const reportSections = getVsm1TrackReportSections(locale);
  return <ProjectReportSections sections={reportSections} ariaIdPrefix="vsm-1-track" />;
}
