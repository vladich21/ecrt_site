import heroMedia from "@/assets/presentation/проекты.webp";
import { getCopy, type Locale } from "@/content/i18n";
import { CAREERS_EMAIL, HH_EMPLOYER_URL } from "@/data/careersLinks";
import { PageHero } from "@/shared/ui/PageHero/PageHero";
import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

import { CareerBenefitIcon, type CareerBenefitIconId } from "./CareerBenefitIcon";

import styles from "./careers-page.module.scss";

type BenefitItem = {
  icon: CareerBenefitIconId;
  title: string;
  body: string;
};

function ExternalArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  );
}

export function CareersPageView({ locale = "ru" }: { locale?: Locale }) {
  const careersCopy = getCopy("careers", locale);
  const benefits = careersCopy.benefits.items as BenefitItem[];

  return (
    <div className={styles.careersRoot}>
      <PageHero
        image={heroMedia}
        title={careersCopy.hero.title}
        lead={careersCopy.hero.lead}
        headingId="careers-hero-heading"
      />

      <div className={styles.contentShell}>
        <div className={styles.wrap}>
          <ScrollRevealSection className={styles.section} aria-labelledby="careers-culture-heading">
            <ScrollRevealBlock className={styles.culturePanel}>
              <h2 className={styles.culturePanelTitle} id="careers-culture-heading">
                {careersCopy.culture.title}
              </h2>
              <span className={styles.culturePanelRule} aria-hidden />
              <ol className={styles.cultureSteps}>
                {careersCopy.culture.bullets.map((line, index) => (
                  <li key={line} className={styles.cultureStep}>
                    <ScrollRevealBlock inView fadeOnly>
                      <span className={styles.cultureStepIndex} aria-hidden>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={styles.cultureStepText}>{line}</p>
                    </ScrollRevealBlock>
                  </li>
                ))}
              </ol>
            </ScrollRevealBlock>
          </ScrollRevealSection>

          <section
            className={styles.section}
            id="benefits"
            aria-labelledby="careers-benefits-heading"
          >
            <ScrollRevealBlock revealEarly className={styles.sectionHeadCenter}>
              <h2 className={styles.sectionTitleMain} id="careers-benefits-heading">
                {careersCopy.benefits.titleBefore}
                <span className={styles.titleAccent}>{careersCopy.benefits.titleAccent}</span>
              </h2>
              <span className={styles.sectionRule} aria-hidden />
            </ScrollRevealBlock>
            <div className={styles.benefitsGrid}>
              {benefits.map((item, index) => (
                <ScrollRevealBlock key={`${item.icon}-${index}`} inView className={styles.benefitGridCell}>
                  <article className={styles.benefitCard}>
                    <div className={styles.benefitIcon} aria-hidden>
                      <CareerBenefitIcon name={item.icon} />
                    </div>
                    <p className={styles.benefitCardTitle}>{item.title}</p>
                    <p className={styles.benefitCardBody}>{item.body}</p>
                  </article>
                </ScrollRevealBlock>
              ))}
            </div>
          </section>

          <ScrollRevealSection className={styles.section} id="vacancies">
            <ScrollRevealBlock className={styles.sectionHeadCenter}>
              <h2 className={styles.sectionTitleMain}>
                {careersCopy.vacancies.titleBefore}
                <span className={styles.titleAccent}>{careersCopy.vacancies.titleAccent}</span>
              </h2>
              <span className={styles.sectionRule} aria-hidden />
            </ScrollRevealBlock>
            <ScrollRevealBlock className={styles.vacanciesCtaWrap}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href={HH_EMPLOYER_URL} target="_blank" rel="noreferrer">
                <span>{careersCopy.vacancies.hhCta}</span>
                <ExternalArrow className={styles.externalIcon} />
              </a>
            </ScrollRevealBlock>
          </ScrollRevealSection>

          <ScrollRevealSection className={styles.section}>
            <ScrollRevealBlock className={styles.ctaCard}>
              <div>
                <h2 className={styles.ctaTitle}>{careersCopy.cta.title}</h2>
                {careersCopy.cta.body.trim().length > 0 ? (
                  <p className={styles.ctaBody}>{careersCopy.cta.body}</p>
                ) : null}
              </div>
              <div className={styles.ctaActions}>
                <a
                  className={`${styles.btn} ${styles.btnPrimary}`}
                  href={`mailto:${CAREERS_EMAIL}`}
                  aria-label={`${careersCopy.cta.emailCta}: ${CAREERS_EMAIL}`}
                >
                  <span>{careersCopy.cta.emailCta}</span>
                  <svg
                    className={styles.externalIcon}
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </ScrollRevealBlock>
          </ScrollRevealSection>
        </div>
      </div>
    </div>
  );
}
