"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./contacts-page.module.scss";

type LazyYandexMapEmbedProps = {
  src: string;
  title: string;
};

/** Карта Яндекса — только in-view (~400 KB JS), не в LCP. */
export function LazyYandexMapEmbed({ src, title }: LazyYandexMapEmbedProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={frameRef} className={styles.mapFrame}>
      {shouldLoad ? (
        <iframe
          className={styles.mapEmbed}
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className={styles.mapPlaceholder} aria-hidden />
      )}
    </div>
  );
}
