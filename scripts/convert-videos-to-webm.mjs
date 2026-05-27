/**
 * Converts MP4 assets in public/videos to WebM (VP9).
 * Source MP4 files are never modified — crop is applied only in output.
 *
 * Usage: node scripts/convert-videos-to-webm.mjs
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const videosDir = path.join(__dirname, "..", "public", "videos");
const ffmpeg = ffmpegInstaller.path;

const VP9_CRF = 28;

const INPUTS = [
  { file: "hero-magnific.mp4" },
  { file: "City%20Animation.mp4", cropBottomPx: 50 },
];

function runFfmpeg(args) {
  const result = spawnSync(ffmpeg, args, { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed: ${args.join(" ")}`);
  }
}

function cropFilter(cropBottomPx) {
  return `crop=iw:ih-${cropBottomPx}:0:0`;
}

function convert({ file, cropBottomPx = 0 }) {
  const inputPath = path.join(videosDir, file);
  const outputName = file.replace(/\.mp4$/i, ".webm");
  const outputPath = path.join(videosDir, outputName);

  if (!fs.existsSync(inputPath)) {
    console.warn(`Skip: ${inputPath} not found`);
    return null;
  }

  const args = ["-y", "-i", inputPath];

  if (cropBottomPx > 0) {
    args.push("-vf", cropFilter(cropBottomPx));
  }

  args.push(
    "-c:v",
    "libvpx-vp9",
    "-crf",
    String(VP9_CRF),
    "-b:v",
    "0",
    "-an",
    outputPath,
  );

  runFfmpeg(args);

  const inputSize = fs.statSync(inputPath).size;
  const outputSize = fs.statSync(outputPath).size;
  const saved = ((1 - outputSize / inputSize) * 100).toFixed(1);

  return { inputName: file, outputName, inputSize, outputSize, saved, cropBottomPx };
}

const converted = INPUTS.map(convert).filter(Boolean);

for (const item of converted) {
  const cropNote = item.cropBottomPx ? `, crop bottom ${item.cropBottomPx}px in output` : "";
  console.log(
    `${item.inputName} → ${item.outputName}: ${(item.inputSize / 1024 / 1024).toFixed(2)} MB → ${(item.outputSize / 1024 / 1024).toFixed(2)} MB (−${item.saved}%${cropNote})`,
  );
}

console.log(`Converted ${converted.length} video(s). Source MP4 files were not modified.`);
