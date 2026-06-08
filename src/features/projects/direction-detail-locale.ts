import {
  activityGroups,
  type ActivityThemeGroup,
} from "@/data/activityDirectionsRu";
import { getActivityDirectionEn } from "@/data/activityDirectionsEn";
import projectsEn from "@/locales/en/projects.json";

export type DirectionLocale = "ru" | "en";

export const DIRECTION_SECTION_HEADINGS_RU = [
  "Описание",
  "Цели и задачи",
  "Характеристики",
  "Применяемые технологии",
] as const;

export const DIRECTION_SECTION_HEADINGS_EN = [
  "Description",
  "Goals and objectives",
  "Characteristics",
  "Applied technologies",
] as const;

/** @deprecated Use getDirectionSectionHeadings(locale) */
export const DIRECTION_SECTION_HEADINGS = DIRECTION_SECTION_HEADINGS_RU;

export function getDirectionSectionHeadings(
  locale: DirectionLocale,
): readonly string[] {
  return locale === "en"
    ? DIRECTION_SECTION_HEADINGS_EN
    : DIRECTION_SECTION_HEADINGS_RU;
}

export function getTechnologiesSectionHeading(locale: DirectionLocale): string {
  return locale === "en" ? "Applied technologies" : "Применяемые технологии";
}

export function getGoalsSectionHeading(locale: DirectionLocale): string {
  return locale === "en" ? "Goals and objectives" : "Цели и задачи";
}

export function getCharacteristicsSectionHeading(locale: DirectionLocale): string {
  return locale === "en" ? "Characteristics" : "Характеристики";
}

export const TECHNOLOGY_TOPIC_HEADINGS_RU = [
  "Интеграция",
  "Безопасность",
  "Надежность",
  "Модульность",
  "Всесторонняя диагностика",
  "Предиктивность",
  "Адаптивность",
] as const;

export const TECHNOLOGY_TOPIC_HEADINGS_EN = [
  "Integration",
  "Safety",
  "Reliability",
  "Modularity",
  "Comprehensive diagnostics",
  "Predictability",
  "Adaptability",
] as const;

export function getTechnologyTopicHeadings(locale: DirectionLocale): readonly string[] {
  return locale === "en" ? TECHNOLOGY_TOPIC_HEADINGS_EN : TECHNOLOGY_TOPIC_HEADINGS_RU;
}

export function isTechnologyTopicHeading(text: string, locale: DirectionLocale): boolean {
  return getTechnologyTopicHeadings(locale).includes(text);
}

export function getAllDirectionIds(): string[] {
  return activityGroups.map((group) => group.id);
}

export function getDirectionIdsWithDetailPage(): string[] {
  return activityGroups.filter(directionHasDetailPage).map((group) => group.id);
}

export function directionHasDetailPage(group: ActivityThemeGroup): boolean {
  return group.detail.trim() !== group.summary.trim();
}

export function getLocalizedDirection(
  id: string,
  locale: DirectionLocale,
): ActivityThemeGroup | null {
  const base = activityGroups.find((group) => group.id === id);
  if (!base) return null;
  if (locale === "ru") return base;

  const en = getActivityDirectionEn(id);
  const groups = projectsEn.directions.groups as Record<
    string,
    { title: string; detail: string }
  >;
  const enMeta = groups[id];

  return {
    ...base,
    title: enMeta?.title ?? base.title,
    summary: en?.summary ?? enMeta?.detail ?? base.summary,
    detail: en?.detail ?? base.detail,
  };
}

export function directionDetailPath(id: string, locale: DirectionLocale): string {
  return locale === "en"
    ? `/en/projects/direction/${id}`
    : `/projects/direction/${id}`;
}

export function resolveDirectionTitle(id: string, locale: DirectionLocale): string {
  return getLocalizedDirection(id, locale)?.title ?? id;
}
