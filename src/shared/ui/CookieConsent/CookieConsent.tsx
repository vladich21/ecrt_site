"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getPrivacyPolicyUrl,
  getYandexMetrikaId,
  readCookieConsent,
  writeCookieConsent,
} from "@/shared/consent/cookie-consent";
import { loadYandexMetrika } from "@/shared/consent/load-yandex-metrika";
import { localeFromPathname, t } from "@/shared/layout/SiteShell/site-shell-utils";

import styles from "./cookie-consent.module.scss";

const COOKIE_BANNER_OFFSET_VAR = "--cookie-banner-offset";

function syncBannerOffset(node: HTMLElement | null) {
  if (!node) {
    document.documentElement.style.removeProperty(COOKIE_BANNER_OFFSET_VAR);
    delete document.documentElement.dataset.cookieBanner;
    return;
  }

  document.documentElement.dataset.cookieBanner = "open";
  const bannerHeight = node.offsetHeight;
  document.documentElement.style.setProperty(COOKIE_BANNER_OFFSET_VAR, `${bannerHeight + 12}px`);
}

export function CookieConsent() {
  const pathname = usePathname();
  const locale = localeFromPathname(pathname);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = readCookieConsent();
    if (stored?.analytics) {
      const counterId = getYandexMetrikaId();
      if (counterId) loadYandexMetrika(counterId);
    }
    setVisible(stored == null);
  }, []);

  useEffect(() => {
    if (!visible) {
      syncBannerOffset(null);
      return;
    }

    const node = bannerRef.current;
    if (!node) return;

    syncBannerOffset(node);
    const observer = new ResizeObserver(() => syncBannerOffset(node));
    observer.observe(node);

    return () => {
      observer.disconnect();
      syncBannerOffset(null);
    };
  }, [visible]);

  const accept = () => {
    writeCookieConsent(true);
    const counterId = getYandexMetrikaId();
    if (counterId) loadYandexMetrika(counterId);
    setVisible(false);
  };

  const reject = () => {
    writeCookieConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  const policyUrl = getPrivacyPolicyUrl(locale);

  return (
    <div ref={bannerRef} className={styles.banner} role="region" aria-labelledby="cookie-consent-title">
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
