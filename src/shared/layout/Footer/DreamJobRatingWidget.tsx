"use client";

import Script from "next/script";

import styles from "./footer.module.scss";

const DREAMJOB_URL = "https://dreamjob.ru/employers/115837";
const WIDGET_SRC = "https://dreamjob.ru/widget/get-widget?id=2918";

/** Бейдж рейтинга Dream Job — как раньше: грузится сразу (lazyOnload), без cookie-gate. */
export function DreamJobRatingWidget() {
  return (
    <>
      <a
        className={styles.dreamJobWidget}
        href={DREAMJOB_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Инжиниринговый Центр Железнодорожного Транспорта: отзывы сотрудников о работодателе на Dream Job"
      >
        <div data-id="wg-dj-2918" suppressHydrationWarning />
      </a>
      <Script id="dreamjob-rating-widget" strategy="lazyOnload">
        {`(function(s){document.querySelectorAll("[data-id='wg-dj-2918']").forEach(function(e){if(e.dataset.loaded==="1")return;e.dataset.loaded="1";fetch(s).then(function(r){return r.text()}).then(function(t){e.innerHTML=t.replace(/\\/\\*\\s*margin:\\s*0\\s+auto;\\s*\\*\\//gi,"").replace(/margin:\\s*0\\s+auto;\\s*/gi,"");var c=e.firstElementChild;if(c){c.style.margin="0";}}).catch(function(){e.textContent="Отзывы сотрудников на Dream Job";});});})(${JSON.stringify(WIDGET_SRC)});`}
      </Script>
    </>
  );
}
