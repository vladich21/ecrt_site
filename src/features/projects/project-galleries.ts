import img2 from "@/assets/presentation/img-2.webp";
import ks400ModelCover from "@/assets/mat-model_ks/Заставка.webp";
import ks1 from "@/assets/presentation/ks-test.webp";
import ks2 from "@/assets/presentation/кс-2.webp";
import ks3 from "@/assets/presentation/кс-3.webp";
import ks4 from "@/assets/presentation/кс-4.webp";
import ks5 from "@/assets/presentation/кс-5.webp";
import img35 from "@/assets/presentation/img-35.webp";
import img36 from "@/assets/presentation/img-36.webp";
import evsRailFasteningNode from "@/assets/evs360-calculations/rail-fastening-node.webp";
import evsFactory from "@/assets/evs360-calculations/evs-factory.webp";
import evsTrackInteraction from "@/assets/evs360-calculations/train-track-interaction.webp";

type BundledImage = string | { src: string };

export const projectGalleryBySlug: Record<string, BundledImage[]> = {
  "evs-360": [evsRailFasteningNode, evsFactory, evsTrackInteraction, img35, img36],
  "project-0009-low-intensity": [img2],
  "project-0007-hydrogen": [img35],
  "track-resource-2-5b": [img36],
  "ks-400-model": [ks400ModelCover, ks2, ks3, ks4, ks5],
  "ks-400-catenary": [ks1, ks2, ks3, ks4, ks5],
};
