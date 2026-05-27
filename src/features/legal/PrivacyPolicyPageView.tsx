import { Fragment, type ReactNode } from "react";

import privacyEn from "@/locales/en/privacy-policy.json";
import privacyRu from "@/locales/ru/privacy-policy.json";

import styles from "./privacy-policy-page.module.scss";

type Locale = "ru" | "en";

type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

type PrivacySection = {
  heading: string;
  blocks: PrivacyBlock[];
};

type PrivacyCopy = {
  title: string;
  updated: string;
  intro: string;
  sections: PrivacySection[];
};

function getPrivacyCopy(locale: Locale): PrivacyCopy {
  return (locale === "en" ? privacyEn : privacyRu) as PrivacyCopy;
}

const LINK_PATTERN =
  /(https?:\/\/[^\s,)]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}|\+7\s?\(?\d{3}\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2})/g;

function linkifyText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(LINK_PATTERN.source, "g");

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const value = match[0];

    if (/^https?:\/\//.test(value)) {
      nodes.push(
        <a key={`${match.index}-url`} href={value} target="_blank" rel="noopener noreferrer">
          {value}
        </a>,
      );
    } else if (value.includes("@")) {
      nodes.push(
        <a key={`${match.index}-mail`} href={`mailto:${value}`}>
          {value}
        </a>,
      );
    } else {
      const tel = value.replace(/[^\d+]/g, "");
      nodes.push(
        <a key={`${match.index}-tel`} href={`tel:${tel}`}>
          {value}
        </a>,
      );
    }

    lastIndex = match.index + value.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

function renderBlock(block: PrivacyBlock, index: number) {
  if (block.type === "ul") {
    return (
      <ul key={`ul-${index}`} className={styles.list}>
        {block.items.map((item: string) => (
          <li key={item} className={styles.listItem}>
            {linkifyText(item)}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p key={`p-${index}`} className={styles.paragraph}>
      {linkifyText(block.text)}
    </p>
  );
}

export function PrivacyPolicyPageView({ locale = "ru" }: { locale?: Locale }) {
  const copy = getPrivacyCopy(locale);

  return (
    <article className={styles.page}>
      <header className={styles.head}>
        <h1 className={styles.title}>{copy.title}</h1>
        <span className={styles.titleRule} aria-hidden />
        <p className={styles.updated}>{copy.updated}</p>
        <p className={styles.intro}>{copy.intro}</p>
      </header>

      <div className={styles.sections}>
        {copy.sections.map((section: PrivacySection) => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.heading}</h2>
            {section.blocks.map((block: PrivacyBlock, index: number) => (
              <Fragment key={`${section.heading}-${index}`}>{renderBlock(block, index)}</Fragment>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}
