"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import type { CommonCopy, HomeLocale } from "../home-types";

import heroStyles from "../hero-section.module.scss";

const HERO_VIDEO_WEBM_SRC = "/videos/hero-magnific.webm";
const HERO_VIDEO_MP4_SRC = "/videos/hero-magnific.mp4";
const HERO_VIDEO_POSTER_SRC = "/videos/hero-magnific-poster.webp";

function HeroCtaArrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

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
  const stats = getStats(commonCopy);
  const pathPrefix = locale === "en" ? "/en" : "";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    const play = () => void video.play().catch(() => {});
    play();
    video.addEventListener("canplay", play, { once: true });
    const onGesture = () => play();
    document.addEventListener("pointerdown", onGesture, { capture: true, once: true });
    return () => document.removeEventListener("pointerdown", onGesture, true);
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
          <source src={HERO_VIDEO_MP4_SRC} type="video/mp4" />
        </video>
        <div className={heroStyles.scrim} aria-hidden />
        <div className={heroStyles.overlay}>
          <aside className={heroStyles.copy}>
            <p className={heroStyles.lead}>{commonCopy.hero.lead}</p>
            <h1 className={heroStyles.title}>{commonCopy.hero.title}</h1>
            <div className={heroStyles.actions}>
              <Link className={heroStyles.cta} href={`${pathPrefix}/projects`}>
                {commonCopy.hero.ctaProjects}
                <HeroCtaArrow className={heroStyles.ctaArrow} />
              </Link>
              <Link className={heroStyles.ctaGhost} href={`${pathPrefix}/about-us`}>
                {commonCopy.hero.ctaAbout}
                <HeroCtaArrow className={heroStyles.ctaArrow} />
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
