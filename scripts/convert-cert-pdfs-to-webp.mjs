import fs from "node:fs/promises";
import path from "node:path";

import { createCanvas } from "@napi-rs/canvas";
import sharp from "sharp";

const projectRoot = path.resolve(import.meta.dirname, "..");
const outputDir = path.join(projectRoot, "src/assets/documents/certificates");

const isoOutputs = [
  { webp: "iso-9001-icar-dqs-en.webp", pdf: "iso-9001-icar-dqs-en.pdf" },
  { webp: "iso-9001-icar-dqs-ru.webp", pdf: "iso-9001-icar-dqs-ru.pdf" },
  { webp: "iso-9001-gost-ru.webp", pdf: "iso-9001-gost-ru.pdf" },
];

const enOutputs = [
  { webp: "en-15085-2-en-1.webp", pdf: "en-15085-2-en.pdf" },
  { webp: "en-15085-2-gost-en.webp", pdf: "en-15085-2-gost-en.pdf" },
  { webp: "en-15085-2-ru-1.webp", pdf: "en-15085-2-ru.pdf" },
  { webp: "en-15085-2-gost-ru.webp", pdf: "en-15085-2-gost-ru.pdf" },
];

function isGostCertificateName(name) {
  return /гост|ѓЋ/i.test(name);
}

async function listIsoPdfFiles(dir) {
  const entries = await fs.readdir(dir);
  return entries
    .filter((entry) => entry.toLowerCase().endsWith(".pdf"))
    .sort((left, right) => left.localeCompare(right, "en"))
    .map((entry) => path.join(dir, entry));
}

async function listEnPdfFiles(dir) {
  const entries = await fs.readdir(dir);
  const pdfs = entries.filter((entry) => entry.toLowerCase().endsWith(".pdf"));

  const pick = (language, gost) => {
    const match = pdfs.find((name) => {
      const endsWithLanguage = name.endsWith(` ${language}.pdf`);
      const hasGost = isGostCertificateName(name);
      return endsWithLanguage && hasGost === gost;
    });

    if (!match) {
      throw new Error(`Missing EN 15085 PDF: language=${language}, gost=${gost}`);
    }

    return path.join(dir, match);
  };

  return [
    pick("EN", false),
    pick("EN", true),
    pick("RU", false),
    pick("RU", true),
  ];
}

async function renderPdfFirstPage(pdfPath, scale = 2) {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const data = new Uint8Array(await fs.readFile(pdfPath));
  const doc = await pdfjs.getDocument({ data, useSystemFonts: true }).promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale });
  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext("2d");

  await page.render({
    canvasContext: context,
    viewport,
  }).promise;

  return canvas.toBuffer("image/png");
}

async function convertDir(srcDir, outputs, listFiles = listIsoPdfFiles) {
  const pdfFiles = await listFiles(srcDir);
  const publicDocs = path.join(projectRoot, "public/documents");

  if (pdfFiles.length !== outputs.length) {
    throw new Error(`Expected ${outputs.length} PDFs in ${srcDir}, found ${pdfFiles.length}`);
  }

  for (const [index, output] of outputs.entries()) {
    const pdfPath = pdfFiles[index];
    const pngBuffer = await renderPdfFirstPage(pdfPath);
    const outPath = path.join(outputDir, output.webp);

    await sharp(pngBuffer).webp({ quality: 88 }).toFile(outPath);
    await fs.copyFile(pdfPath, path.join(publicDocs, output.pdf));

    console.log(`Wrote ${output.webp} and ${output.pdf} <= ${path.basename(pdfPath)}`);
  }
}

async function copyBundlePdfs() {
  const publicDocs = path.join(projectRoot, "public/documents");
  const bundles = [
    {
      src: "C:/Users/v-koval/Desktop/ИЦЖТ_ISO_9001_все.pdf",
      dest: "iczt-iso-9001-all.pdf",
    },
    {
      src: "C:/Users/v-koval/Desktop/ИЦЖТ_EN 15085-2_все.pdf",
      dest: "iczt-en-15085-2-all.pdf",
    },
  ];

  for (const bundle of bundles) {
    await fs.copyFile(bundle.src, path.join(publicDocs, bundle.dest));
    console.log(`Copied bundle ${bundle.dest}`);
  }
}

async function main() {
  await fs.mkdir(outputDir, { recursive: true });
  await copyBundlePdfs();

  await convertDir("C:/Users/v-koval/Desktop/_cert-iso-temp", isoOutputs, listIsoPdfFiles);
  await convertDir("C:/Users/v-koval/Desktop/_cert-en-temp", enOutputs, listEnPdfFiles);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
