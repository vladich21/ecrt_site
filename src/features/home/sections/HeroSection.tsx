"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import type { CommonCopy, HomeLocale } from "../home-types";

import heroStyles from "../hero-section.module.scss";

const HERO_VIDEO_WEBM_SRC = "/videos/train_in_v6.webm";
const HERO_VIDEO_POSTER_SRC = "/videos/train_in_v6-poster.webp";
const HERO_VIDEO_PLAYBACK_RATE = 1.25;
const HERO_VIDEO_END_SEC = 8;

function getStats(commonCopy: CommonCopy) {
  return [
    { target: 6, showPlus: true, label: commonCopy.heroStats.labels.years },
    { target: 16, showPlus: true, label: commonCopy.heroStats.labels.projects },
    { target: 3, showPlus: false, label: commonCopy.heroStats.labels.directions },
    { target: 250, showPlus: true, label: commonCopy.heroStats.labels.team },
  ];
}

function HeroStatsList({
  stats,
  heading,
  className,
}: {
  stats: ReturnType<typeof getStats>;
  heading: string;
  className: string;
}) {
  return (
    <ol className={className} aria-label={heading}>
      {stats.map((stat) => (
        <li key={stat.label} className={heroStyles.statItem}>
          <div className={heroStyles.statNumberRow} aria-hidden>
            <span className={heroStyles.statDigit}>{stat.target}</span>
            {stat.showPlus ? <span className={heroStyles.statPlus}>+</span> : null}
          </div>
          <p className={heroStyles.statLabel}>{stat.label}</p>
        </li>
      ))}
    </ol>
  );
}

export function HeroSection({
  commonCopy,
  locale = "ru",
}: {
  commonCopy: CommonCopy;
  locale?: HomeLocale;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const clipEndedRef = useRef(false);
  const stats = getStats(commonCopy);
  const pathPrefix = locale === "en" ? "/en" : "";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    clipEndedRef.current = false;
    video.muted = true;
    video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
    const play = () => {
      if (clipEndedRef.current) return;
      video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
      void video.play().catch(() => {});
    };
    const stopAtClipEnd = () => {
      if (clipEndedRef.current || video.paused) return;
      if (video.currentTime >= HERO_VIDEO_END_SEC) {
        clipEndedRef.current = true;
        video.pause();
      }
    };
    play();
    video.addEventListener("canplay", play, { once: true });
    video.addEventListener("timeupdate", stopAtClipEnd);
    const onGesture = () => play();
    document.addEventListener("pointerdown", onGesture, { capture: true, once: true });
    return () => {
      video.removeEventListener("timeupdate", stopAtClipEnd);
      document.removeEventListener("pointerdown", onGesture, true);
    };
  }, []);

  const onEnded = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  return (
    <section className={heroStyles.hero} id="hero">
      <div className={heroStyles.stage}>
        <video
          ref={videoRef}
          className={heroStyles.video}
          autoPlay
          muted
          playsInline
          poster={HERO_VIDEO_POSTER_SRC}
          preload="auto"
          controls={false}
          disablePictureInPicture
          onEnded={onEnded}
          aria-hidden
        >
          <source src={HERO_VIDEO_WEBM_SRC} type="video/webm" />
        </video>
        <div className={heroStyles.scrim} aria-hidden />
        <div className={heroStyles.overlay}>
          <aside className={heroStyles.copy}>
            <div className={heroStyles.headline}>
              <h1 className={heroStyles.title}>{commonCopy.hero.title}</h1>
              {commonCopy.hero.lead ? (
                <p className={heroStyles.tagline}>{commonCopy.hero.lead}</p>
              ) : null}
            </div>
            <div className={heroStyles.actions}>
              <Link className={heroStyles.cta} href={`${pathPrefix}/projects`}>
                {commonCopy.hero.ctaProjects}
              </Link>
              <Link className={heroStyles.ctaGhost} href={`${pathPrefix}/about-us`}>
                {commonCopy.hero.ctaAbout}
              </Link>
            </div>
            <HeroStatsList
              stats={stats}
              heading={commonCopy.heroStats.heading}
              className={heroStyles.stats}
            />
          </aside>
        </div>
      </div>
    </section>
  );
}
