/**
 * Crude audit: compares top-of-line `.className {` in *.module.scss
 * against `styles.className` in files that import that module.
 * Misses nested-only classes (&__foo etc.) — use as a hint, not truth.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcRoot = path.join(__dirname, '..', 'src');

function walkDir(dir, exts, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory() && ent.name !== 'node_modules') walkDir(p, exts, out);
    else if (exts.some((e) => ent.name.endsWith(e))) out.push(p);
  }
  return out;
}

const jsFiles = walkDir(srcRoot, ['.tsx', '.jsx', '.ts', '.js']);
const moduleScssFiles = walkDir(srcRoot, ['.module.scss']);

const importLineRe =
  /from\s+['"](?<spec>(?:@\/)?[^'"]+\.module\.scss)['"]/g;

/** @type {Map<string, Set<string>>} */
const usedByRelative = new Map();

for (const file of jsFiles) {
  let text;
  try {
    text = fs.readFileSync(file, 'utf8');
  } catch {
    continue;
  }

  /** @type {string[]} */
  const moduleImports = [];
  let m;
  importLineRe.lastIndex = 0;
  while ((m = importLineRe.exec(text))) moduleImports.push(m.groups.spec);

  if (!moduleImports.length) continue;

  /** @type {Set<string>} */
  const refs = new Set();
  const styleRe = /\bstyles\.([a-zA-Z_][a-zA-Z0-9_]*)\b/g;
  styleRe.lastIndex = 0;
  while ((m = styleRe.exec(text))) refs.add(m[1]);
  if (!refs.size) continue;

  const dir = path.dirname(file);

  for (const spec of moduleImports) {
    const resolved = spec.startsWith('@/')
      ? path.join(srcRoot, spec.slice(2))
      : path.resolve(dir, spec);
    const rel = path.relative(srcRoot, resolved).replace(/\\/g, '/');
    if (!usedByRelative.has(rel)) usedByRelative.set(rel, new Set());
    for (const r of refs) usedByRelative.get(rel).add(r);
  }
}

function stripComments(scss) {
  return scss
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*$/gm, '');
}

/** Top-level line classes: `  .foo {` */
function naiveTopClasses(scss) {
  const set = new Set();
  const re = /^\s*\.([a-zA-Z_-][a-zA-Z0-9_-]*)\s*[,{]/gm;
  let m;
  while ((m = re.exec(scss))) set.add(m[1]);
  return set;
}

console.log(
  'CSS modules audit (naive parser — nested BEM &-classes not counted)\n',
);
for (const p of moduleScssFiles.sort()) {
  const rel = path.relative(srcRoot, p).replace(/\\/g, '/');
  let text = fs.readFileSync(p, 'utf8');
  text = stripComments(text);
  const defs = naiveTopClasses(text);
  const used = usedByRelative.get(rel);

  if (!used) continue;

  const maybeUnused = [...defs].filter((c) => !used.has(c));
  const missingInScss = [...used].filter((c) => !defs.has(c));

  if (maybeUnused.length || missingInScss.length) {
    console.log(rel);
    if (maybeUnused.length)
      console.log(
        `  possibly unused (top-level only): ${maybeUnused.sort().join(', ')}`,
      );
    if (missingInScss.length)
      console.log(
        `  used but not naive top-level defs: ${missingInScss.sort().join(', ')}`,
      );
    console.log('');
  }
}
