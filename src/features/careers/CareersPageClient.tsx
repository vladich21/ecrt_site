"use client";

import { motion } from "framer-motion";
import heroMedia from "@/assets/presentation/эвс-02.webp";
import careersEn from "@/locales/en/careers.json";
import careersRu from "@/locales/ru/careers.json";
import { CAREERS_EMAIL, HH_EMPLOYER_URL } from "@/data/careersLinks";
import { fadeUp, sectionReveal } from "@/shared/motion/presets";
import { PageHero } from "@/shared/ui/PageHero/PageHero";

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

export function CareersPageView({ locale = "ru" }: { locale?: "ru" | "en" }) {
  const careersCopy = locale === "en" ? careersEn : careersRu;
  const benefits = careersCopy.benefits.items as BenefitItem[];

  return (
    <div className={styles.careersRoot}>
      <PageHero
        image={heroMedia}
        title={careersCopy.hero.title}
        lead={careersCopy.hero.lead}
        headingId="careers-hero-heading"
        animateCopy
      />

      <div className={styles.contentShell}>
        <motion.div
          className={styles.wrap}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px", amount: 0.08 }}
          variants={sectionReveal}
        >
          <motion.section className={styles.section} variants={fadeUp} aria-labelledby="careers-culture-heading">
            <div className={styles.culturePanel}>
              <h2 className={styles.culturePanelTitle} id="careers-culture-heading">
                {careersCopy.culture.title}
              </h2>
              <span className={styles.culturePanelRule} aria-hidden />
              <ol className={styles.cultureSteps}>
                {careersCopy.culture.bullets.map((line, index) => (
                  <li key={line} className={styles.cultureStep}>
                    <span className={styles.cultureStepIndex} aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className={styles.cultureStepText}>{line}</p>
                  </li>
                ))}
              </ol>
            </div>
          </motion.section>

          <motion.section
            className={styles.section}
            id="benefits"
            variants={fadeUp}
            aria-labelledby="careers-benefits-heading"
          >
            <div className={styles.sectionHeadCenter}>
              <h2 className={styles.sectionTitleMain} id="careers-benefits-heading">
                {careersCopy.benefits.titleBefore}
                <span className={styles.titleAccent}>{careersCopy.benefits.titleAccent}</span>
              </h2>
              <span className={styles.sectionRule} aria-hidden />
            </div>
            <div className={styles.benefitsGrid}>
              {benefits.map((item, index) => (
                <article key={`${item.icon}-${index}`} className={styles.benefitCard}>
                  <div className={styles.benefitIcon} aria-hidden>
                    <CareerBenefitIcon name={item.icon} />
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </article>
              ))}
            </div>
          </motion.section>

          <motion.section className={styles.section} variants={fadeUp} id="vacancies">
            <div className={styles.sectionHeadCenter}>
              <h2 className={styles.sectionTitleMain}>
                {careersCopy.vacancies.titleBefore}
                <span className={styles.titleAccent}>{careersCopy.vacancies.titleAccent}</span>
              </h2>
              <span className={styles.sectionRule} aria-hidden />
            </div>
            <div className={styles.vacanciesCtaWrap}>
              <a className={`${styles.btn} ${styles.btnPrimary}`} href={HH_EMPLOYER_URL} target="_blank" rel="noreferrer">
                <span>{careersCopy.vacancies.hhCta}</span>
                <ExternalArrow className={styles.externalIcon} />
              </a>
            </div>
          </motion.section>

          <motion.section className={styles.section} variants={fadeUp}>
            <div className={styles.ctaCard}>
              <div>
                <h2 className={styles.ctaTitle}>{careersCopy.cta.title}</h2>
                <p className={styles.ctaBody}>{careersCopy.cta.body}</p>
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
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
