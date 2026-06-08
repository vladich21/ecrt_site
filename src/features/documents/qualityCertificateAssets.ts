import type { StaticImageData } from "next/image";

import en15085En1 from "@/assets/documents/certificates/en-15085-2-en-1.webp";
import en15085GostEn from "@/assets/documents/certificates/en-15085-2-gost-en.webp";
import en15085GostRu from "@/assets/documents/certificates/en-15085-2-gost-ru.webp";
import en15085Ru1 from "@/assets/documents/certificates/en-15085-2-ru-1.webp";
import iso9001En from "@/assets/documents/certificates/iso-9001-icar-dqs-en.webp";
import iso9001GostRu from "@/assets/documents/certificates/iso-9001-gost-ru.webp";
import iso9001Ru from "@/assets/documents/certificates/iso-9001-icar-dqs-ru.webp";

export type QualityCertificateSlide = {
  image: StaticImageData;
  pdfUrl: string;
  altRu: string;
  altEn: string;
};

const documentBase = "/documents";

export const iso9001CertificateSlides: readonly QualityCertificateSlide[] = [
  {
    image: iso9001En,
    pdfUrl: `${documentBase}/iso-9001-icar-dqs-en.pdf`,
    altRu: "Сертификат ISO 9001 (ICAR+DQS), английская версия",
    altEn: "ISO 9001 certificate (ICAR+DQS), English edition",
  },
  {
    image: iso9001Ru,
    pdfUrl: `${documentBase}/iso-9001-icar-dqs-ru.pdf`,
    altRu: "Сертификат ISO 9001 (ICAR+DQS), русская версия",
    altEn: "ISO 9001 certificate (ICAR+DQS), Russian edition",
  },
  {
    image: iso9001GostRu,
    pdfUrl: `${documentBase}/iso-9001-gost-ru.pdf`,
    altRu: "Сертификат ГОСТ Р ИСО 9001, русская версия",
    altEn: "GOST R ISO 9001 certificate, Russian edition",
  },
];

export const en15085CertificateSlides: readonly QualityCertificateSlide[] = [
  {
    image: en15085En1,
    pdfUrl: `${documentBase}/en-15085-2-en.pdf`,
    altRu: "Сертификат EN 15085-2, английская версия",
    altEn: "EN 15085-2 certificate, English edition",
  },
  {
    image: en15085GostEn,
    pdfUrl: `${documentBase}/en-15085-2-gost-en.pdf`,
    altRu: "Сертификат ГОСТ EN 15085-2, английская версия",
    altEn: "GOST EN 15085-2 certificate, English edition",
  },
  {
    image: en15085Ru1,
    pdfUrl: `${documentBase}/en-15085-2-ru.pdf`,
    altRu: "Сертификат EN 15085-2, русская версия",
    altEn: "EN 15085-2 certificate, Russian edition",
  },
  {
    image: en15085GostRu,
    pdfUrl: `${documentBase}/en-15085-2-gost-ru.pdf`,
    altRu: "Сертификат ГОСТ EN 15085-2, русская версия",
    altEn: "GOST EN 15085-2 certificate, Russian edition",
  },
];

export const iso9001BundleUrl = "/documents/iczt-iso-9001-all.pdf";
export const en15085BundleUrl = "/documents/iczt-en-15085-2-all.pdf";
