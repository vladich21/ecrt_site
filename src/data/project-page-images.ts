import clampFrequencyChartSrc from "@/assets/evs360-calculations/clamp-frequency-chart.webp";
import clampFormSrc from "@/assets/evs360-calculations/clamp-form.webp";
import railFasteningNodeSrc from "@/assets/evs360-calculations/rail-fastening-node.webp";
import trackSuperstructureNodeSrc from "@/assets/evs360-calculations/track-superstructure-node.webp";
import trainTrackInteractionSrc from "@/assets/evs360-calculations/train-track-interaction.webp";
import wheelClampLoadSrc from "@/assets/evs360-calculations/wheel-clamp-load.webp";
import configurationsImage from "@/assets/low-intensity-0009/img11.webp";
import imgLoads from "@/assets/presentation/image.webp";
import imgPathStructure from "@/assets/presentation/Расчет кострукции пути.webp";
import imgNodes from "@/assets/presentation/Расчте узлов и элементов пути.webp";
import imgGeo from "@/assets/presentation/Геотехнические расчеты.webp";
import imgOptimize1 from "@/assets/presentation/Оптимизация параметров конструкции пути и его элементов1.webp";
import imgOptimize2 from "@/assets/presentation/Оптимизация параметров конструкции пути и его элементов2.webp";
import imgOptimize3 from "@/assets/presentation/Оптимизация параметров конструкции пути и его элементов3.webp";
import imgAssemblyYard from "@/assets/track-v25-field/этап-01.webp";
import imgAssemblyCrane from "@/assets/track-v25-field/02-assembly-crane-sleepers.webp";
import imgAssemblyWorkers from "@/assets/track-v25-field/этап-01.1.webp";
import imgLayingRail from "@/assets/track-v25-field/03-assembly-workers.webp";
import imgStage2Prep from "@/assets/track-v25-field/этап2_Подготовка_к_снятию_старой_РШР.webp";
import imgStage2Pzs from "@/assets/track-v25-field/этап2_устройство_ПЗС.webp";
import imgStage2Pzs2 from "@/assets/track-v25-field/этап2_устройство_ПЗС2.webp";
import imgStage2Pzs3 from "@/assets/track-v25-field/этап2_устройство_ПЗС3.webp";
import imgStage3Pzs from "@/assets/track-v25-field/этап3-07а_устройство_ПЗС.webp";
import imgStage3Laying1 from "@/assets/track-v25-field/этап3-08_Укладка_РШР.webp";
import imgStage3Laying2 from "@/assets/track-v25-field/этап3-10_Укладка_РШР.webp";
import imgOperationalTesting1 from "@/assets/track-v25-field/track-v25-filed_1.webp";
import imgOperationalTesting2 from "@/assets/track-v25-field/track-v25-filed_2.webp";
import imgOperationalTesting3 from "@/assets/track-v25-field/track-v25-filed_3.webp";
import imgOperationalTesting4 from "@/assets/track-v25-field/track-v25-filed_4.webp";
import imgOperationalTesting5 from "@/assets/track-v25-field/track-v25-filed_5.webp";
import imgOperationalTesting6 from "@/assets/track-v25-field/track-v25-filed_6.webp";
import imgOperationalTesting7 from "@/assets/track-v25-field/track-v25-filed_7.webp";
import imgOperationalTesting8 from "@/assets/track-v25-field/track-v25-filed_8.webp";
import imgOperationalTesting9 from "@/assets/track-v25-field/track-v25-filed_9.webp";
import imgOperationalTesting10 from "@/assets/track-v25-field/track-v25-filed_10.webp";
import { strategicProjects } from "@/data/ecrtSite";
import { projectCatalogHeroImages } from "@/data/projectMedia";
import { projectGalleryBySlug } from "@/features/projects/project-galleries";
import type { StaticImageData } from "next/image";
import type { StaticImageLike } from "@/shared/images/preload-static-image";
import { staticImageUrl } from "@/shared/images/preload-static-image";

/** Фото этапов «Технологическое внедрение» (track-resource-2-5b). */
export const trackV25FieldStageImages = {
  assembly: [imgAssemblyCrane, imgAssemblyYard, imgAssemblyWorkers, imgLayingRail],
  "sub-ballast": [imgStage2Prep, imgStage2Pzs, imgStage2Pzs2, imgStage2Pzs3],
  laying: [imgStage3Laying1, imgStage3Laying2, imgStage3Pzs],
} as const;

export const trackV25FieldAllImages: StaticImageLike[] = Object.values(trackV25FieldStageImages).flat();

export const trackV25OperationalTestingImages: StaticImageData[] = [
  imgOperationalTesting1,
  imgOperationalTesting2,
  imgOperationalTesting3,
  imgOperationalTesting4,
  imgOperationalTesting5,
  imgOperationalTesting6,
  imgOperationalTesting7,
  imgOperationalTesting8,
  imgOperationalTesting9,
  imgOperationalTesting10,
];

export const trackV25ModelingImages: StaticImageLike[] = [
  imgLoads,
  imgPathStructure,
  imgNodes,
  imgGeo,
  imgOptimize1,
  imgOptimize2,
  imgOptimize3,
];

export const vsm1TrackCalculationImages: StaticImageLike[] = [
  clampFrequencyChartSrc,
  clampFormSrc,
  railFasteningNodeSrc,
  trackSuperstructureNodeSrc,
  trainTrackInteractionSrc,
  wheelClampLoadSrc,
];

export const lowIntensityReportImages: StaticImageLike[] = [configurationsImage];

const projectExtraImages: Record<string, StaticImageLike[]> = {
  "track-resource-2-5b": [
    ...trackV25FieldAllImages,
    ...trackV25OperationalTestingImages,
    ...trackV25ModelingImages,
  ],
  "vsm-1-track-elements": vsm1TrackCalculationImages,
  "project-0009-low-intensity": lowIntensityReportImages,
};

function dedupeImages(images: StaticImageLike[]): StaticImageLike[] {
  const seen = new Set<string>();
  const result: StaticImageLike[] = [];

  for (const image of images) {
    const url = staticImageUrl(image);
    if (seen.has(url)) continue;
    seen.add(url);
    result.push(image);
  }

  return result;
}

/** Все контентные изображения страницы проекта (hero — отдельно). */
export function getProjectPageImages(projectSlug: string): StaticImageLike[] {
  const images: StaticImageLike[] = [];

  const catalogHero = projectCatalogHeroImages[projectSlug];
  if (catalogHero) images.push(catalogHero);

  const strategic = strategicProjects.find((project) => project.slug === projectSlug);
  if (strategic) images.push(strategic.coverImage);

  for (const image of projectGalleryBySlug[projectSlug] ?? []) {
    images.push(image);
  }

  for (const image of projectExtraImages[projectSlug] ?? []) {
    images.push(image);
  }

  return dedupeImages(images);
}
