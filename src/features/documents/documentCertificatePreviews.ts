import type { StaticImageData } from "next/image";

import certIso9001En from "@/assets/presentation/QM15_31102197_QM15_EN.webp";
import certIso9001Ru from "@/assets/presentation/ser-2QM15_31102197_QM15_RU.webp";
import certGostIso9001Ru from "@/assets/presentation/ser-3QMS15_ISO_9001_RU.webp";

export type CertificatePreview = {
  pdfUrl: string;
  image: StaticImageData;
};

export const certificatePreviews: readonly CertificatePreview[] = [
  {
    pdfUrl: "https://ecrt.ru/QM15_31102197_QM15_EN.pdf",
    image: certIso9001En,
  },
  {
    pdfUrl: "https://ecrt.ru/QM15_31102197_QM15_RU.pdf",
    image: certIso9001Ru,
  },
  {
    pdfUrl: "https://ecrt.ru/QMS15_ISO_9001_RU.pdf",
    image: certGostIso9001Ru,
  },
];

const previewByPdfUrl = new Map(certificatePreviews.map((entry) => [entry.pdfUrl, entry.image]));

export function certificatePreviewImage(pdfUrl: string): StaticImageData | undefined {
  return previewByPdfUrl.get(pdfUrl);
}

export function hasCertificatePreview(pdfUrl: string): boolean {
  return previewByPdfUrl.has(pdfUrl);
}
