import { getDirectionSectionHeadings, getTechnologiesSectionHeading, type DirectionLocale } from "./direction-detail-locale";

export type DirectionContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function splitInlineListItems(value: string): string[] {
  const cleaned = value.replace(/[.;]\s*$/u, "").trim();
  return cleaned
    .split(/,\s*/)
    .flatMap((part) => part.split(/\s+(?:и|and)\s+/iu))
    .map((item) => item.trim())
    .filter(Boolean);
}

function tryParseInlineColonList(text: string): { intro: string; items: string[] } | null {
  const colonIndex = text.indexOf(":");
  if (colonIndex <= 0) return null;

  const intro = text.slice(0, colonIndex + 1).trim();
  const rest = text.slice(colonIndex + 1).trim();
  if (!rest) return null;

  const items = splitInlineListItems(rest);
  if (items.length < 2) return null;

  return { intro, items };
}

function isNumberedTechnologiesParagraph(text: string): boolean {
  return /^\d+\.\s/.test(text);
}

function collectListItems(
  raw: string[],
  startIndex: number,
  sectionHeadingSet: Set<string>,
): { items: string[]; nextIndex: number } {
  const items: string[] = [];
  let index = startIndex;

  while (index < raw.length) {
    const next = raw[index];
    if (sectionHeadingSet.has(next)) break;
    if (isNumberedTechnologiesParagraph(next)) break;
    items.push(next);
    index += 1;
  }

  return { items, nextIndex: index };
}

function parseTechnologiesParagraph(
  raw: string[],
  startIndex: number,
  sectionHeadingSet: Set<string>,
): { blocks: DirectionContentBlock[]; nextIndex: number } {
  const text = raw[startIndex];

  if (text.endsWith(":")) {
    const { items, nextIndex } = collectListItems(raw, startIndex + 1, sectionHeadingSet);
    if (items.length > 0) {
      return {
        blocks: [{ type: "paragraph", text }, { type: "list", items }],
        nextIndex,
      };
    }
  }

  const inlineList = tryParseInlineColonList(text);
  if (inlineList) {
    return {
      blocks: [
        { type: "paragraph", text: inlineList.intro },
        { type: "list", items: inlineList.items },
      ],
      nextIndex: startIndex + 1,
    };
  }

  return {
    blocks: [{ type: "paragraph", text }],
    nextIndex: startIndex + 1,
  };
}

export function parseDirectionDetailContent(
  detail: string,
  locale: DirectionLocale = "ru",
): DirectionContentBlock[] {
  const sectionHeadings = getDirectionSectionHeadings(locale);
  const sectionHeadingSet = new Set<string>(sectionHeadings);
  const technologiesHeading = getTechnologiesSectionHeading(locale);

  const raw = detail
    .trim()
    .split(/\n\n+/)
    .map((chunk) => chunk.trim())
    .filter(Boolean);

  const blocks: DirectionContentBlock[] = [];
  let section = "";

  for (let index = 0; index < raw.length; index += 1) {
    const text = raw[index];

    if (sectionHeadingSet.has(text)) {
      section = text;
      blocks.push({ type: "heading", text });
      continue;
    }

    if (section === technologiesHeading) {
      const parsed = parseTechnologiesParagraph(raw, index, sectionHeadingSet);
      blocks.push(...parsed.blocks);
      index = parsed.nextIndex - 1;
      continue;
    }

    blocks.push({ type: "paragraph", text });
  }

  return blocks;
}
