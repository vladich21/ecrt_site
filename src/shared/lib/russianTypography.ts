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
] as const;

/** Нормализация RU-текста: е вместо ё, дефис вместо длинного тире, неразрывный пробел после предлогов. */
export function normalizeRussianTypography(text: string): string {
  const withoutYoAndDash = text
    .replace(/\u0451/g, "\u0435")
    .replace(/\u0401/g, "\u0415")
    .replace(/\u2014/g, "-")
    .replace(/\u2013/g, "-");

  let result = withoutYoAndDash;
  for (const prep of PREPOSITIONS) {
    const escaped = prep.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(`(^|[\\s(\\[«"'\\u00ab])(${escaped}) ([\\p{L}\\d«"'])`, "giu");
    result = result.replace(re, (_, before: string, matchedPrep: string, nextChar: string) => {
      return `${before}${matchedPrep}\u00A0${nextChar}`;
    });
  }
  return result;
}
