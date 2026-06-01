import { getTrackV25ReportSections, type ProjectDetailLocale } from "./project-detail-locale";
import { ProjectReportSections } from "./ProjectReportSections";

type TrackV25ReportBlockProps = {
  group: "intro" | "details";
  sectionIds?: string[];
  locale?: ProjectDetailLocale;
};

export function TrackV25ReportBlock({
  group,
  sectionIds,
  locale = "ru",
}: TrackV25ReportBlockProps) {
  const sections = getTrackV25ReportSections(locale, group, sectionIds);

  return (
    <ProjectReportSections
      sections={sections}
      ariaIdPrefix="track-v25"
      continued={group === "details"}
    />
  );
}
