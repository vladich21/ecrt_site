import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import Link from "next/link";

import logoRzd from "@/assets/logos/logo-rzd.svg";
import logoSkParticipant from "@/assets/logos/logo-sk-participant.webp";
import footerBrandLogo from "@/assets/presentation/img-38.webp";
import { navItems } from "@/data/ecrtSite";

import { t, withLocalePath, type Locale } from "../SiteShell/site-shell-utils";
import styles from "./footer.module.scss";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className={styles.footer} id="contacts">
      <div className={styles.mainBlock}>
        <div className={styles.inner}>
          <div className={styles.col}>
            <p className={styles.colHeading}>{t("footer.contacts", locale)}</p>
            <div className={styles.companyBlock}>
              <AssetImage
                src={footerBrandLogo}
                alt={t("footer.company", locale)}
                width={220}
                height={72}
                className={styles.companyLogo}
                sizes="220px"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
            <p className={styles.muted}>{t("footer.addressLine1", locale)}</p>
            <a className={styles.email} href="tel:+74959091799">
              {t("footer.addressLine2", locale)}
            </a>
            <a className={styles.email} href="mailto:info@ecrt.ru">
              info@ecrt.ru
            </a>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>{t("footer.sections", locale)}</p>
            <ul className={styles.linkList}>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={withLocalePath(item.href, locale)}>{t(item.labelKey, locale)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.col}>
            <p className={styles.colHeading}>{t("footer.official", locale)}</p>
            <div className={styles.affiliations}>
              <a
                className={`${styles.partnerLink} ${styles.partnerLinkRzd}`}
                href="https://team.rzd.ru/career/vacancies/place/moskva"
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.partnerRzdMark} aria-hidden>
                  <AssetImage
                    src={logoRzd}
                    alt=""
                    width={112}
                    height={72}
                    className={styles.partnerRzdImg}
                    sizes="112px"
                    style={{ width: "auto", height: "auto" }}
                  />
                </span>
                <span className={styles.partnerRzdCopy}>
                  <span className={styles.partnerRzdTitle}>{t("footer.rzdTitle", locale)}</span>
                  <span className={styles.partnerRzdSub}>{t("footer.rzdSub", locale)}</span>
                </span>
              </a>
              <a
                className={styles.partnerSkLink}
                href="https://sk.ru/"
                target="_blank"
                rel="noreferrer"
              >
                <AssetImage
                  className={styles.partnerSkParticipant}
                  src={logoSkParticipant}
                  alt={t("footer.skAlt", locale)}
                  width={260}
                  height={88}
                  sizes="(max-width: 480px) 70vw, 260px"
                  style={{ width: "auto", height: "auto" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
