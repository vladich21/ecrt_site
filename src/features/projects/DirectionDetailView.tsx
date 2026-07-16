import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

import {
  getLocalizedDirection,
  type DirectionLocale,
} from "./direction-detail-locale";
import { parseDirectionDetailContent } from "./direction-detail-content";

import styles from "./direction-detail.module.scss";

type Props = {
  directionId: string;
  locale?: DirectionLocale;
};

export function DirectionDetailView({ directionId, locale = "ru" }: Props) {
  const direction = getLocalizedDirection(directionId, locale);
  if (!direction) return null;

  const blocks = parseDirectionDetailContent(direction.detail, locale);

  return (
    <div className={styles.root}>
      <article className={styles.page}>
        <ScrollRevealSection>
          <ScrollRevealBlock>
            <header className={styles.pageIntro}>
              <h1 className={styles.title}>{direction.title}</h1>
            </header>
          </ScrollRevealBlock>
        </ScrollRevealSection>

        <div className={styles.prose}>
          {blocks.map((block, index) => {
            if (block.type === "heading") {
              return (
                <ScrollRevealSection key={`${directionId}-heading-${index}`}>
                  <ScrollRevealBlock>
                    <h2 className={styles.sectionHeading}>{block.text}</h2>
                  </ScrollRevealBlock>
                </ScrollRevealSection>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={`${directionId}-list-${index}`} className={styles.list}>
                  {block.items.map((item, itemIndex) => (
                    <li key={`${directionId}-list-${index}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              );
            }

            const spaced =
              block.text.includes("drag-and-drop") &&
              (block.text.includes("графических сред разработки") ||
                block.text.includes("graphical development environments"));

            return (
              <p
                key={`${directionId}-para-${index}`}
                className={spaced ? styles.paragraphSectionSpaced : undefined}
              >
                {block.text}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
