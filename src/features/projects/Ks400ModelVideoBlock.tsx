"use client";

import { useEffect, useRef } from "react";

import { LazyInViewVideo } from "@/shared/ui/LazyInViewVideo/LazyInViewVideo";
import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

import { getKs400ModelVideoCopy, type ProjectDetailLocale } from "./project-detail-locale";
import styles from "./ks400-model-video.module.scss";

const VIDEO_MP4_SRC = "/videos/ks400-model-scherbinka.mp4";
const VIDEO_PLAYBACK_RATE = 1.5;

type Ks400ModelVideoBlockProps = {
  locale?: ProjectDetailLocale;
};

export function Ks400ModelVideoBlock({ locale = "ru" }: Ks400ModelVideoBlockProps) {
  const copy = getKs400ModelVideoCopy(locale);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = frameRef.current?.querySelector("video");
    if (!video) return;

    const applyRate = () => {
      video.playbackRate = VIDEO_PLAYBACK_RATE;
    };

    applyRate();
    video.addEventListener("loadedmetadata", applyRate);
    video.addEventListener("play", applyRate);

    return () => {
      video.removeEventListener("loadedmetadata", applyRate);
      video.removeEventListener("play", applyRate);
    };
  }, []);

  return (
    <ScrollRevealSection className={styles.root} aria-labelledby="ks400-model-video-heading">
      <ScrollRevealBlock>
        <header className={styles.sectionHead}>
          <h2 id="ks400-model-video-heading" className={styles.sectionTitle}>
            {copy.title}
          </h2>
          <span className={styles.sectionTitleRule} aria-hidden />
        </header>
      </ScrollRevealBlock>

      <ScrollRevealBlock>
        <p className={styles.lead}>{copy.lead}</p>
        <div ref={frameRef} className={styles.videoFrame}>
          <LazyInViewVideo
            className={styles.video}
            autoPlay
            muted
            loop
            playsInline
            aria-label={copy.ariaLabel}
          >
            <source src={VIDEO_MP4_SRC} type="video/mp4" />
          </LazyInViewVideo>
        </div>
      </ScrollRevealBlock>
    </ScrollRevealSection>
  );
}
