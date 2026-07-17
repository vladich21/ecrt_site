"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import type { CommonCopy, HomeLocale } from "../home-types";

import { getCompanyAgeYears } from "@/data/company";
import { localePathPrefix } from "@/content/i18n/locale";

import heroStyles from "../hero-section.module.scss";

/** webm — Chrome/Firefox/Edge; mp4 — Safari. Оба ~720p из train_4k_6s_v04. */
const HERO_VIDEO_WEBM_SRC = "/videos/train_4k_6s_v04.webm";
const HERO_VIDEO_MP4_SRC = "/videos/train_4k_6s_v04.mp4";
const HERO_VIDEO_POSTER_SRC = "/videos/train_4k_6s_v04-poster.webp";
const HERO_VIDEO_PLAYBACK_RATE = 0.7;
const HERO_VIDEO_END_SEC = 6;
const MOBILE_VIDEO_MQ = "(max-width: 768px)";

function getStats(commonCopy: CommonCopy) {
  return [
    { target: getCompanyAgeYears(), showPlus: true, label: commonCopy.heroStats.labels.years },
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
      {stats.map((stat, index) => (
        <li key={stat.label} className={heroStyles.statItem}>
          <div className={heroStyles.statNumberRow} aria-hidden>
            <span className={heroStyles.statDigit} suppressHydrationWarning={index === 0}>
              {stat.target}
            </span>
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
  const pathPrefix = localePathPrefix(locale);
  const [preferMobileVideo, setPreferMobileVideo] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_VIDEO_MQ);
    const sync = () => setPreferMobileVideo(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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
  }, [preferMobileVideo]);

  const onEnded = useCallback(() => {
    videoRef.current?.pause();
  }, []);

  return (
    <section className={heroStyles.hero} id="hero">
      <div className={heroStyles.stage}>
        {/* Мобилка: размытый фон закрывает зазор, если видео ниже экрана */}
        <div
          className={heroStyles.videoAmbient}
          style={{ backgroundImage: `url(${HERO_VIDEO_POSTER_SRC})` }}
          aria-hidden
        />
        <video
          ref={videoRef}
          className={heroStyles.video}
          autoPlay
          muted
          playsInline
          poster={HERO_VIDEO_POSTER_SRC}
          preload={preferMobileVideo ? "metadata" : "auto"}
          controls={false}
          disablePictureInPicture
          onEnded={onEnded}
          aria-hidden
        >
          <source src={HERO_VIDEO_WEBM_SRC} type="video/webm" />
          <source src={HERO_VIDEO_MP4_SRC} type="video/mp4" />
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
