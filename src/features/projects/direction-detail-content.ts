import {
  getCharacteristicsSectionHeading,
  getDirectionSectionHeadings,
  getGoalsSectionHeading,
  getTechnologiesSectionHeading,
  isTechnologyTopicHeading,
  type DirectionLocale,
} from "./direction-detail-locale";

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

function isProseContinuationAfterList(text: string): boolean {
  // Standalone paragraphs after colon-led lists start with a capital letter.
  return /^[A-ZА-ЯЁ]/u.test(text) && text.length > 15;
}

type CollectListOptions = {
  sectionHeadingSet: Set<string>;
  locale: DirectionLocale;
  stopAtTechnologyTopics?: boolean;
};

function shouldStopListCollection(text: string, options: CollectListOptions): boolean {
  const { sectionHeadingSet, locale, stopAtTechnologyTopics = false } = options;

  if (sectionHeadingSet.has(text)) return true;
  if (isNumberedTechnologiesParagraph(text)) return true;
  if (stopAtTechnologyTopics && isTechnologyTopicHeading(text, locale)) return true;
  if (text.endsWith(":")) return true;
  if (isProseContinuationAfterList(text)) return true;

  return false;
}

function collectListItems(
  raw: string[],
  startIndex: number,
  options: CollectListOptions,
): { items: string[]; nextIndex: number } {
  const items: string[] = [];
  let index = startIndex;

  while (index < raw.length) {
    const next = raw[index];
    if (shouldStopListCollection(next, options)) break;
    items.push(next);
    index += 1;
  }

  return { items, nextIndex: index };
}

function collectSectionItems(
  raw: string[],
  startIndex: number,
  sectionHeadingSet: Set<string>,
): { items: string[]; nextIndex: number } {
  const items: string[] = [];
  let index = startIndex;

  while (index < raw.length) {
    const next = raw[index];
    if (sectionHeadingSet.has(next)) break;
    items.push(next);
    index += 1;
  }

  return { items, nextIndex: index };
}

function parseColonIntroList(
  raw: string[],
  startIndex: number,
  options: CollectListOptions,
): { blocks: DirectionContentBlock[]; nextIndex: number } {
  const text = raw[startIndex];
  const { items, nextIndex } = collectListItems(raw, startIndex + 1, options);

  if (items.length > 0) {
    return {
      blocks: [{ type: "paragraph", text }, { type: "list", items }],
      nextIndex,
    };
  }

  return {
    blocks: [{ type: "paragraph", text }],
    nextIndex: startIndex + 1,
  };
}

function parseTechnologiesParagraph(
  raw: string[],
  startIndex: number,
  options: CollectListOptions,
): { blocks: DirectionContentBlock[]; nextIndex: number } {
  const text = raw[startIndex];

  if (isTechnologyTopicHeading(text, options.locale)) {
    const blocks: DirectionContentBlock[] = [{ type: "heading", text }];
    let index = startIndex + 1;

    while (index < raw.length) {
      const next = raw[index];
      if (
        options.sectionHeadingSet.has(next) ||
        isTechnologyTopicHeading(next, options.locale) ||
        isNumberedTechnologiesParagraph(next)
      ) {
        break;
      }

      blocks.push({ type: "paragraph", text: next });
      index += 1;
    }

    return { blocks, nextIndex: index };
  }

  if (text.endsWith(":")) {
    return parseColonIntroList(raw, startIndex, options);
  }

  if (isNumberedTechnologiesParagraph(text) && !text.endsWith(":")) {
    return {
      blocks: [{ type: "paragraph", text }],
      nextIndex: startIndex + 1,
    };
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
  const goalsHeading = getGoalsSectionHeading(locale);
  const characteristicsHeading = getCharacteristicsSectionHeading(locale);
  const listOptions: CollectListOptions = { sectionHeadingSet, locale };

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

      if (text === goalsHeading) {
        const { items, nextIndex } = collectSectionItems(raw, index + 1, sectionHeadingSet);
        if (items.length >= 2) {
          blocks.push({ type: "list", items });
          index = nextIndex - 1;
        } else if (items.length === 1) {
          blocks.push({ type: "paragraph", text: items[0] });
          index = nextIndex - 1;
        }
      }

      continue;
    }

    if (section === technologiesHeading) {
      const parsed = parseTechnologiesParagraph(raw, index, listOptions);
      blocks.push(...parsed.blocks);
      index = parsed.nextIndex - 1;
      continue;
    }

    if (section !== technologiesHeading && text.endsWith(":")) {
      const parsed = parseColonIntroList(raw, index, {
        ...listOptions,
        stopAtTechnologyTopics: section === characteristicsHeading,
      });
      blocks.push(...parsed.blocks);
      index = parsed.nextIndex - 1;
      continue;
    }

    blocks.push({ type: "paragraph", text });
  }

  return blocks;
}
