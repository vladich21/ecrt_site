/**
 * Уменьшает слишком большие webp в src/assets (для меньшего бандла и fallback без /_next/image).
 *
 * Usage: node scripts/resize-large-webp.mjs
 *        node scripts/resize-large-webp.mjs --dry-run
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsRoot = path.join(__dirname, "..", "src", "assets");

const MAX_WIDTH = 1920;
const MIN_BYTES_TO_TOUCH = 200 * 1024;
const WEBP_QUALITY = 85;
const WRITE_RETRIES = 3;
const WRITE_RETRY_DELAY_MS = 250;

const dryRun = process.argv.includes("--dry-run");

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function writeOptimizedFile(filePath, buffer) {
  const tempPath = `${filePath}.tmp-${process.pid}`;
  let lastError = null;

  for (let attempt = 1; attempt <= WRITE_RETRIES; attempt += 1) {
    try {
      await fs.writeFile(filePath, buffer);
      return true;
    } catch (error) {
      lastError = error;
      await sleep(WRITE_RETRY_DELAY_MS);
    }
  }

  for (let attempt = 1; attempt <= WRITE_RETRIES; attempt += 1) {
    try {
      await fs.writeFile(tempPath, buffer);
      await fs.copyFile(tempPath, filePath);
      await fs.rm(tempPath, { force: true });
      return true;
    } catch (error) {
      lastError = error;
      await fs.rm(tempPath, { force: true });
      await sleep(WRITE_RETRY_DELAY_MS);
    }
  }

  const code = lastError && typeof lastError === "object" && "code" in lastError ? lastError.code : "UNKNOWN";
  return code;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (path.extname(entry.name).toLowerCase() === ".webp") {
      files.push(fullPath);
    }
  }
  return files;
}

async function processFile(filePath) {
  const stat = await fs.stat(filePath);
  if (stat.size < MIN_BYTES_TO_TOUCH) return null;

  const sourceBuffer = await fs.readFile(filePath);
  const image = sharp(sourceBuffer);
  const meta = await image.metadata();
  const width = meta.width ?? 0;

  if (width <= MAX_WIDTH && stat.size < 400 * 1024) return null;

  const targetWidth = Math.min(width, MAX_WIDTH);
  const buffer = await image
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY, effort: 4 })
    .toBuffer();

  if (buffer.length >= stat.size) return null;

  const savedKiB = ((stat.size - buffer.length) / 1024).toFixed(1);
  const rel = path.relative(assetsRoot, filePath);

  if (dryRun) {
    console.log(`[dry-run] ${rel}: ${(stat.size / 1024).toFixed(0)} KiB → ~${(buffer.length / 1024).toFixed(0)} KiB (−${savedKiB} KiB)`);
    return { rel, savedKiB };
  }

  const writeResult = await writeOptimizedFile(filePath, buffer);
  if (writeResult !== true) {
    console.warn(`Skipped ${rel}: could not replace file after retries (${writeResult}). Close image previews/editors and rerun.`);
    return null;
  }

  console.log(`${rel}: ${(stat.size / 1024).toFixed(0)} KiB → ${(buffer.length / 1024).toFixed(0)} KiB (−${savedKiB} KiB)`);
  return { rel, savedKiB };
}

const files = await walk(assetsRoot);
let touched = 0;

for (const file of files) {
  const result = await processFile(file);
  if (result) touched += 1;
}

console.log(dryRun ? `Would update ${touched} file(s).` : `Updated ${touched} file(s).`);
