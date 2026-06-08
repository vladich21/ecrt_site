import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument, degrees } from "pdf-lib";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const targets = ["perechen.pdf", "vedomost.pdf"];
const rotationDelta = 180;

for (const filename of targets) {
  const path = join(root, "public", "documents", filename);
  const bytes = readFileSync(path);
  const pdf = await PDFDocument.load(bytes);
  const pages = pdf.getPages();

  for (const page of pages) {
    const current = page.getRotation().angle;
    page.setRotation(degrees(current + rotationDelta));
  }

  writeFileSync(path, await pdf.save());
  console.log(`Rotated ${filename} (+${rotationDelta}° on ${pages.length} page(s))`);
}
