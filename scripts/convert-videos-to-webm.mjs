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
  { file: "train_in_v6.mp4", maxDurationSec: 8, writeTrimmedMp4: true },
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

function convertToWebm({ inputPath, outputPath, cropBottomPx = 0, maxDurationSec = 0 }) {
  const args = ["-y", "-i", inputPath];

  if (maxDurationSec > 0) {
    args.push("-t", String(maxDurationSec));
  }

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
}

function createTrimmedMp4File({ inputPath, outputPath, maxDurationSec }) {
  const tmpPath = `${outputPath.replace(/\.mp4$/i, "")}.trim.tmp.mp4`;
  const args = [
    "-y",
    "-i",
    inputPath,
    "-t",
    String(maxDurationSec),
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "slow",
    "-an",
    "-movflags",
    "+faststart",
    tmpPath,
  ];

  runFfmpeg(args);
  fs.renameSync(tmpPath, outputPath);
}

function convert({ file, cropBottomPx = 0, maxDurationSec = 0, writeTrimmedMp4 = false }) {
  const inputPath = path.join(videosDir, file);
  const outputName = file.replace(/\.mp4$/i, ".webm");
  const outputPath = path.join(videosDir, outputName);

  if (!fs.existsSync(inputPath)) {
    console.warn(`Skip: ${inputPath} not found`);
    return null;
  }

  const inputSize = fs.statSync(inputPath).size;

  convertToWebm({ inputPath, outputPath, cropBottomPx, maxDurationSec });

  const outputSize = fs.statSync(outputPath).size;
  const saved = ((1 - outputSize / inputSize) * 100).toFixed(1);

  let trimmedMp4Size = null;
  if (writeTrimmedMp4 && maxDurationSec > 0) {
    const mp4Path = path.join(videosDir, file);
    const backupPath = mp4Path.replace(/\.mp4$/i, ".source.mp4");
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(inputPath, backupPath);
    }
    createTrimmedMp4File({ inputPath, outputPath: mp4Path, maxDurationSec });
    trimmedMp4Size = fs.statSync(mp4Path).size;
  }

  return {
    inputName: file,
    outputName,
    inputSize,
    outputSize,
    saved,
    cropBottomPx,
    maxDurationSec,
    trimmedMp4Size,
  };
}

const converted = INPUTS.map(convert).filter(Boolean);

for (const item of converted) {
  const cropNote = item.cropBottomPx ? `, crop bottom ${item.cropBottomPx}px in output` : "";
  const trimNote = item.maxDurationSec ? `, first ${item.maxDurationSec}s` : "";
  console.log(
    `${item.inputName} → ${item.outputName}: ${(item.inputSize / 1024 / 1024).toFixed(2)} MB → ${(item.outputSize / 1024 / 1024).toFixed(2)} MB (−${item.saved}%${cropNote}${trimNote})`,
  );
  if (item.trimmedMp4Size != null) {
    console.log(
      `${item.inputName} → ${item.inputName} (trimmed): ${(item.inputSize / 1024 / 1024).toFixed(2)} MB → ${(item.trimmedMp4Size / 1024 / 1024).toFixed(2)} MB`,
    );
  }
}

console.log(`Converted ${converted.length} video(s).`);
