import purchaseEn from "@/locales/en/purchase.json";
import purchaseRu from "@/locales/ru/purchase.json";
import purchaseHeroImage from "@/assets/presentation/закупки-hero1.webp";
import { PageHero } from "@/shared/ui/PageHero/PageHero";

import styles from "./purchase-page.module.scss";

type Locale = "ru" | "en";

type PurchaseCopy = typeof purchaseRu;

export function PurchasePageView({ locale = "ru" }: { locale?: Locale }) {
  const copy: PurchaseCopy = locale === "en" ? purchaseEn : purchaseRu;

  return (
    <div className={styles.root} lang={locale === "en" ? "en" : undefined}>
      <PageHero
        image={purchaseHeroImage}
        title={copy.hero.title}
        lead={copy.hero.lead}
        headingId="purchase-hero-heading"
      />

      <div className={styles.page}>
        <div className={styles.content}>
          <section className={styles.section} aria-labelledby="purchase-goal-heading">
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle} id="purchase-goal-heading">
                {copy.goal.title}
              </h2>
              <span className={styles.sectionTitleRule} aria-hidden />
            </header>
            <p className={styles.sectionLead}>{copy.goal.body}</p>
            <ul className={styles.focusGrid}>
              {copy.goal.items.map((item, itemIndex) => (
                <li key={item} className={styles.focusItem}>
                  <span className={styles.focusDigit} aria-hidden>
                    {(itemIndex + 1).toString().padStart(2, "0")}
                  </span>
                  <p className={styles.focusItemText}>{item}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className={styles.section} aria-labelledby="purchase-legal-heading">
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle} id="purchase-legal-heading">
                {copy.legal.title}
              </h2>
              <span className={styles.sectionTitleRule} aria-hidden />
            </header>
            <p className={styles.sectionLead}>{copy.legal.body}</p>
          </section>

          <section className={styles.section} aria-labelledby="purchase-platforms-heading">
            <header className={styles.sectionHead}>
              <h2 className={styles.sectionTitle} id="purchase-platforms-heading">
                {copy.platforms.title}
              </h2>
              <span className={styles.sectionTitleRule} aria-hidden />
            </header>
            <p className={styles.sectionLead}>{copy.platforms.lead}</p>
            <div className={styles.platformGrid}>
              <a
                className={styles.platformCard}
                href={copy.platforms.eis.href}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className={styles.platformTitle}>{copy.platforms.eis.title}</h3>
                <p className={styles.platformBody}>{copy.platforms.eis.body}</p>
                <span className={styles.platformCta}>{copy.platforms.eis.cta}</span>
              </a>
              <a
                className={styles.platformCard}
                href={copy.platforms.rts.href}
                target="_blank"
                rel="noreferrer"
              >
                <h3 className={styles.platformTitle}>{copy.platforms.rts.title}</h3>
                <p className={styles.platformBody}>{copy.platforms.rts.body}</p>
                <span className={styles.platformCta}>{copy.platforms.rts.cta}</span>
              </a>
            </div>
          </section>

          <section className={styles.complianceCard} aria-label={copy.competitive.body}>
            <p className={styles.sectionLead}>{copy.competitive.body}</p>
            <a className={styles.complianceEmail} href={`mailto:${copy.compliance.email}`}>
              {copy.compliance.emailLabel}
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}
