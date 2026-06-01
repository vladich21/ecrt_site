import Link from "next/link";

import contactsCopyEn from "@/locales/en/contacts.json";
import contactsCopyRu from "@/locales/ru/contacts.json";
import { buildYandexMapEmbedSrc } from "@/data/contactsOfficeMap";
import { withLocalePath } from "@/shared/layout/SiteShell/site-shell-utils";

import type { HomeLocale } from "@/features/home/home-types";

import { LazyYandexMapEmbed } from "./LazyYandexMapEmbed";
import styles from "./contacts-page.module.scss";

type ContactsCopy = typeof contactsCopyRu;

const MAIL_INFO = "info@ecrt.ru";
const PHONE_DIGITS_HREF = "tel:+74959091799";

type ContactsPageContentProps = {
  locale: HomeLocale;
};

export function ContactsPageContent({ locale }: ContactsPageContentProps) {
  const copy: ContactsCopy = locale === "en" ? contactsCopyEn : contactsCopyRu;
  const mapEmbedSrc = buildYandexMapEmbedSrc(locale);

  return (
    <div id="contact-feedback" className={`${styles.contactRoot} ${styles.layout}`}>
      <header className={styles.introBlock}>
        <h1 className={styles.heading}>{copy.formHeading}</h1>
      </header>

      <div className={styles.columns}>
        <aside className={styles.asideCard} aria-label={copy.formAsideA11y}>
          <div className={styles.infoList}>
            <div className={styles.group}>
              <span className={styles.groupLabel}>{copy.phoneLabel}</span>
              <a className={styles.heroLink} href={PHONE_DIGITS_HREF}>
                {copy.phoneDisplay}
              </a>
            </div>

            <div className={styles.group}>
              <span className={styles.groupLabel}>{copy.mailLabel}</span>
              <a className={styles.heroLink} href={`mailto:${MAIL_INFO}`}>
                {copy.mailDisplay}
              </a>
            </div>

            <div className={styles.addressBlockSpaced}>
              <span className={styles.addrLabel}>{copy.legalHeading}</span>
              {copy.legalLines.map((line, index) => (
                <p key={`legal-${String(index)}`} className={styles.addrLine}>
                  {line}
                </p>
              ))}
            </div>

            <div className={styles.addressBlockSpaced}>
              <span className={styles.addrLabel}>{copy.officeHeading}</span>
              {copy.officeLines.map((line, index) => (
                <p key={`office-${String(index)}`} className={styles.addrLine}>
                  {line}
                </p>
              ))}
            </div>
          </div>
        </aside>

        <section className={styles.mapSurface} aria-label={copy.mapA11y}>
          <div className={styles.mapGrid}>
            <LazyYandexMapEmbed src={mapEmbedSrc} title={copy.mapA11y} />
          </div>
        </section>
      </div>

      <section className={styles.corpDetailsSection} aria-label={copy.corpDetailsHeading}>
        <span className={styles.addrLabel}>{copy.corpDetailsHeading}</span>
        {copy.corpDetailsLines.map((line, index) => (
          <p key={`corp-${String(index)}`} className={styles.addrLine}>
            {line}
          </p>
        ))}
        <p className={styles.addrLine}>
          {copy.projectsNote.prefix}
          <Link className={styles.addrLineLink} href={withLocalePath("/projects", locale)}>
            {copy.projectsNote.linkText}
          </Link>
          {copy.projectsNote.suffix}
        </p>
      </section>
    </div>
  );
}
