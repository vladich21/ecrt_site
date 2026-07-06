"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getPrivacyPolicyUrl,
  readCookieConsent,
  writeCookieConsent,
} from "@/shared/consent/cookie-consent";
import { initYandexMetrika } from "@/shared/consent/yandex-metrika";
import { localeFromPathname, t } from "@/shared/layout/SiteShell/site-shell-utils";

import styles from "./cookie-consent.module.scss";

export function CookieConsent() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    if (stored?.analytics) initYandexMetrika();
    setVisible(stored == null);
  }, []);

  const accept = () => {
    writeCookieConsent(true);
    initYandexMetrika();
    setVisible(false);
  };

  const reject = () => {
    writeCookieConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  const policyUrl = getPrivacyPolicyUrl(locale);

  return (
    <div className={styles.banner} role="region" aria-labelledby="cookie-consent-title">
      <div className={styles.card}>
        <div className={styles.copy}>
          <p className={styles.title} id="cookie-consent-title">
            {t("cookies.title", locale)}
          </p>
          <p className={styles.text}>
            {t("cookies.message", locale)}{" "}
            <Link className={styles.policyLink} href={policyUrl}>
              {t("cookies.policyLink", locale)}
            </Link>
            .
          </p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.rejectBtn} onClick={reject}>
            {t("cookies.reject", locale)}
          </button>
          <button type="button" className={styles.acceptBtn} onClick={accept}>
            {t("cookies.accept", locale)}
          </button>
        </div>
      </div>
    </div>
  );
}
