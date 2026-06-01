import fs from "fs";
import path from "path";
import os from "os";

const temp = os.tmpdir();
const projectsHtml = fs.readFileSync(path.join(temp, "ecrt-projects.html"), "utf8");

const ids = [
  "cab-displays-controls",
  "onboard-energy",
  "microclimate-passenger",
  "microclimate-driver",
  "traction-force",
  "traction-aero",
  "onboard-infotainment",
  "traction-drive",
  "braking",
  "onboard-diagnostics",
  "operational-safety",
  "emc",
  "electrical-safety",
  "tamper-protection",
  "human-machine-interface",
  "infrastructure-diagnosis",
  "air-sanitation",
  "thermal-monitoring-traction",
];

const prMap = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  null,
  "09",
  "10",
  "11",
  null,
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
];

function normalizeText(text) {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function stripHtml(html) {
  return normalizeText(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n\n")
      .replace(/<\/li>/gi, "\n")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " "),
  );
}

function extractSection(html, heading) {
  const re = new RegExp(
    `<h5>${heading}:<\\/h5>([\\s\\S]*?)(?=<h5>|<\\/div>\\s*<\\/div>\\s*<\\/section>|$)`,
    "i",
  );
  const m = html.match(re);
  if (!m) return "";
  return stripHtml(m[1]);
}

function extractDetailFromPr(html) {
  const start = html.indexOf('<div class="col-xs-12">');
  const end = html.indexOf("</section>", start);
  const chunk = html.slice(start, end);
  const parts = [];
  for (const h of ["Описание", "Цели и задачи", "Характеристики", "Применяемые технологии"]) {
    const text = extractSection(chunk, h);
    if (text) parts.push(`${h}\n\n${text}`);
  }
  return normalizeText(parts.join("\n\n"));
}

function extractListingItems(html) {
  const items = [];
  for (const match of html.matchAll(/<h5>([^<]+)<\/h5>\s*<p>([\s\S]*?)<\/p>/g)) {
    items.push({
      title: stripHtml(match[1]),
      summary: stripHtml(match[2]),
    });
  }
  return items;
}

function escapeTsString(value) {
  return JSON.stringify(value);
}

const listing = extractListingItems(projectsHtml);
const groups = ids.map((id, index) => {
  const { title, summary } = listing[index];
  const pr = prMap[index];
  let detail = summary;
  if (pr) {
    const file = path.join(temp, `ecrt-pr${pr}.html`);
    if (fs.existsSync(file)) {
      detail = extractDetailFromPr(fs.readFileSync(file, "utf8"));
    }
  }
  return { id, title, summary, detail };
});

const body = groups
  .map(
    (g) => `  {
    id: ${escapeTsString(g.id)},
    title: ${escapeTsString(g.title)},
    summary: ${escapeTsString(g.summary)},
    detail: ${escapeTsString(g.detail)},
  }`,
  )
  .join(",\n");

const ts = `/** Тексты направлений /projects - RU источник; EN - см. locales/en/projects.json → directions.groups. */
export type ActivityThemeGroup = {
  readonly id: string;
  readonly title: string;
  /** Краткий текст с главной страницы направлений (projects.php). */
  readonly summary: string;
  /** Полный текст со страницы «Подробнее» (prXX.php). */
  readonly detail: string;
};

export const activityGroups: readonly ActivityThemeGroup[] = [
${body},
];
`;

const out = path.join(process.cwd(), "src", "data", "activityDirectionsRu.ts");
fs.writeFileSync(out, ts, "utf8");
console.log(`Wrote ${groups.length} groups to ${out}`);
