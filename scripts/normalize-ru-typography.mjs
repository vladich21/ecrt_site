/**
 * Normalizes RU copy in locale/data/feature files.
 * Skips import/require paths so asset filenames stay intact.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..", "src");

const PREPOSITIONS = [
  "без",
  "вне",
  "вокруг",
  "вместо",
  "внутри",
  "вследствие",
  "ввиду",
  "вроде",
  "насчет",
  "после",
  "перед",
  "через",
  "между",
  "среди",
  "около",
  "против",
  "ради",
  "согласно",
  "благодаря",
  "для",
  "при",
  "про",
  "над",
  "под",
  "из",
  "от",
  "до",
  "за",
  "на",
  "по",
  "со",
  "во",
  "обо",
  "об",
  "не",
  "ни",
  "ко",
  "к",
  "у",
  "о",
  "с",
  "в",
  "а",
  "и",
  "но",
  "или",
  "как",
  "что",
  "ли",
  "же",
  "бы",
];

function isImportPathLine(line) {
  return /^\s*import\s.+from\s+["']/.test(line) || /^\s*export\s.+from\s+["']/.test(line);
}

function normalizeDashesAndYo(text) {
  return text
    .replace(/\u0451/g, "\u0435")
    .replace(/\u0401/g, "\u0415")
    .replace(/\u2014/g, "-")
    .replace(/\u2013/g, "-");
}

function fixHangingPrepositions(text) {
  let result = text;
  for (const prep of PREPOSITIONS) {
    const escaped = prep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(^|[\\s(\\[«"'\\u00ab])(${escaped}) ([\\p{L}\\d«"'])`, "giu");
    result = result.replace(re, (_, before, matchedPrep, nextChar) => {
      return `${before}${matchedPrep}\u00A0${nextChar}`;
    });
  }
  return result;
}

function normalizeLine(line) {
  if (isImportPathLine(line)) return line;
  return fixHangingPrepositions(normalizeDashesAndYo(line));
}

function normalizeFileContent(content) {
  return content
    .split("\n")
    .map((line) => normalizeLine(line))
    .join("\n");
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules") continue;
      walk(full, acc);
      continue;
    }
    if (/\.(json|ts|tsx)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

function shouldSkip(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  if (rel.endsWith(".d.ts")) return true;
  if (rel.includes("/scripts/")) return true;
  return false;
}

const files = walk(ROOT).filter((filePath) => !shouldSkip(filePath));
let changedFiles = 0;

for (const filePath of files) {
  const original = fs.readFileSync(filePath, "utf8");
  const normalized = normalizeFileContent(original);
  if (normalized !== original) {
    fs.writeFileSync(filePath, normalized, "utf8");
    changedFiles += 1;
    console.log("updated:", path.relative(ROOT, filePath));
  }
}

console.log(`Done. ${changedFiles} file(s) updated.`);
