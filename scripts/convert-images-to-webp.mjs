/**
 * Converts PNG/JPEG assets to WebP and updates imports in src/.
 * Skips favicon/OG icons (keep PNG for broad crawler/browser support).
 *
 * Usage: node scripts/convert-images-to-webp.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const IMAGE_DIRS = [
  path.join(root, "src", "assets"),
  path.join(root, "public", "images"),
];

const SKIP_BASENAMES = new Set([
  "favicon.png",
  "apple-icon.png",
  "og-default.png",
]);

const SOURCE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".JPG", ".JPEG", ".PNG"]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
      continue;
    }
    if (!SOURCE_EXTENSIONS.has(path.extname(entry.name))) continue;
    if (SKIP_BASENAMES.has(entry.name)) continue;
    files.push(fullPath);
  }

  return files;
}

async function convertFile(filePath) {
  const ext = path.extname(filePath);
  const webpPath = `${filePath.slice(0, -ext.length)}.webp`;

  if (ext.toLowerCase() === ".webp") {
    return null;
  }

  try {
    await fs.access(webpPath);
    return { from: filePath, to: webpPath, skipped: true };
  } catch {
    // create webp
  }

  await sharp(filePath)
    .webp({ quality: 85, effort: 4 })
    .toFile(webpPath);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "EBUSY") {
      console.warn(`Could not remove ${filePath} (file in use). WebP created alongside original.`);
    } else {
      throw error;
    }
  }

  return { from: filePath, to: webpPath };
}

async function updateImports() {
  const srcDir = path.join(root, "src");
  const appDir = path.join(root, "app");
  const targets = [];

  async function collect(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await collect(fullPath);
        continue;
      }
      if (/\.(tsx?|jsx?)$/.test(entry.name)) targets.push(fullPath);
    }
  }

  await collect(srcDir);
  await collect(appDir);

  const replacements = [
    [/\.png(?=['"])/g, ".webp"],
    [/\.jpe?g(?=['"])/gi, ".webp"],
    [/\.JPG(?=['"])/g, ".webp"],
  ];

  let updatedFiles = 0;
  for (const filePath of targets) {
    const original = await fs.readFile(filePath, "utf8");
    let next = original;
    for (const [pattern, value] of replacements) {
      next = next.replace(pattern, value);
    }
    if (next !== original) {
      await fs.writeFile(filePath, next, "utf8");
      updatedFiles += 1;
    }
  }

  return updatedFiles;
}

async function main() {
  const converted = [];

  for (const dir of IMAGE_DIRS) {
    try {
      await fs.access(dir);
    } catch {
      continue;
    }

    const files = await walk(dir);
    for (const filePath of files) {
      const result = await convertFile(filePath);
      if (result) converted.push(result);
    }
  }

  const updatedFiles = await updateImports();

  console.log(`Converted ${converted.length} image(s) to WebP.`);
  console.log(`Updated imports in ${updatedFiles} source file(s).`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
