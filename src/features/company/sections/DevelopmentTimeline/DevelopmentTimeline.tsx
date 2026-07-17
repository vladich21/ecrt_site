"use client";

import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import { useEffect, useRef } from "react";

import evs360LaunchPhoto from "@/assets/presentation/openart-gpt-image-2-edit-1_1777462551743_196f02f7.webp";
import img33 from "@/assets/presentation/img-33.webp";
import img36 from "@/assets/presentation/img-36.webp";
import ks2Photo from "@/assets/presentation/кс-2.webp";
import trainProductionPhoto from "@/assets/presentation/произв-поезда.webp";
import krasnoyarskTrials from "@/assets/presentation/timeline-2025-krasnoyarsk-trials.webp";
import vniizhtRing from "@/assets/presentation/timeline-2023-vniizht-ring.webp";
import milestone201906Signing from "@/assets/presentation/milestone-2019-06-signing.webp";
import type homeRu from "@/locales/ru/home.json";
import type { BundledImage } from "@/data/ecrtSite";
import { imageSrc } from "@/features/projects/image-src";
import { ScrollRevealBlock } from "@/shared/motion/ScrollReveal";

import timelineStyles from "./home-vertical-timeline.module.scss";

type HomeCopy = typeof homeRu;

const SPINE_PROGRESS_EASE = 0.045;
const SPINE_PROGRESS_SNAP = 0.001;

const timelinePhotoByIso: Record<string, BundledImage> = {
  "2019": milestone201906Signing,
  "2020": evs360LaunchPhoto,
  "2021": ks2Photo,
  "2022": img33,
  "2023": vniizhtRing,
  "2024": img36,
  "2025": krasnoyarskTrials,
  "2026": trainProductionPhoto,
};

export function DevelopmentTimeline({ homeCopy }: { homeCopy: HomeCopy }) {
  const items = homeCopy.milestones.items;
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    let measureFrame = 0;
    let animationFrame = 0;
    let active = false;
    let initialized = false;
    let currentProgress = 0;
    let targetProgress = 0;

    const writeProgress = () => {
      timeline.style.setProperty("--timeline-spine-progress", currentProgress.toFixed(3));
    };

    const animateProgress = () => {
      animationFrame = 0;
      if (!active) return;

      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) <= SPINE_PROGRESS_SNAP) {
        currentProgress = targetProgress;
        writeProgress();
        return;
      }

      currentProgress += delta * SPINE_PROGRESS_EASE;
      writeProgress();
      animationFrame = window.requestAnimationFrame(animateProgress);
    };

    const requestAnimation = () => {
      if (!active || animationFrame) return;
      animationFrame = window.requestAnimationFrame(animateProgress);
    };

    const measureProgress = () => {
      measureFrame = 0;

      const rect = timeline.getBoundingClientRect();
      const startLine = window.innerHeight * 0.7;
      const endLine = window.innerHeight * 0.3;
      const distance = rect.height + startLine - endLine;
      const progress = distance > 0 ? (startLine - rect.top) / distance : 0;
      targetProgress = Math.min(1, Math.max(0, progress));

      if (!initialized) {
        initialized = true;
        currentProgress = targetProgress;
        writeProgress();
        return;
      }

      requestAnimation();
    };

    const requestSync = () => {
      if (!active || measureFrame) return;
      measureFrame = window.requestAnimationFrame(measureProgress);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) requestSync();
      },
      { rootMargin: "320px 0px" },
    );

    observer.observe(timeline);
    active = true;
    requestSync();

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      active = false;
      if (measureFrame) window.cancelAnimationFrame(measureFrame);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      observer.disconnect();
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
    };
  }, []);

  return (
    <div className={timelineStyles.wrapper}>
      <div ref={timelineRef} className={timelineStyles.timeline}>
        <div className={timelineStyles.spineTrack} style={{ top: 14, bottom: 14, height: "auto" }} aria-hidden>
          <span className={timelineStyles.spineProgressClip}>
            <span
              className={timelineStyles.spineProgress}
              style={{
                left: "50%",
                transform: "translateX(-50%) scaleY(var(--timeline-spine-progress, 0))",
                transformOrigin: "top center",
              }}
            />
          </span>
        </div>

        <ol className={timelineStyles.steps} aria-label={homeCopy.milestones.listLabel}>
          {items.map((milestone, index) => {
            const photoSrc = timelinePhotoByIso[milestone.iso];
            const hasPhoto = Boolean(photoSrc);
            const isEven = index % 2 === 0;

            const marker = (
              <div className={timelineStyles.markerCol}>
                <span className={timelineStyles.marker} data-filled="true" aria-hidden />
              </div>
            );

            const content = (
              <ScrollRevealBlock inView className={timelineStyles.content}>
                <time className={timelineStyles.when} dateTime={milestone.iso}>
                  {milestone.date}
                </time>
                <h3 className={timelineStyles.stepTitle}>{milestone.title}</h3>
                <p className={timelineStyles.blurb}>{milestone.text}</p>
              </ScrollRevealBlock>
            );

            const figure = photoSrc ? (
              <figure className={timelineStyles.figure}>
                <AssetImage
                  src={typeof photoSrc === "string" ? photoSrc : imageSrc(photoSrc)}
                  alt={milestone.imageAlt ?? milestone.title}
                  width={640}
                  height={400}
                  className={timelineStyles.figureImg}
                  sizes="(max-width: 900px) 88vw, 520px"
                  loading="lazy"
                />
              </figure>
            ) : null;

            return (
              <li
                key={`${milestone.iso}-${milestone.title}`}
                className={`${timelineStyles.step} ${isEven ? timelineStyles.stepEven : timelineStyles.stepOdd} ${hasPhoto ? timelineStyles.stepHasPhoto : ""}`}
              >
                {isEven ? (
                  <>
                    {content}
                    {marker}
                    {figure}
                  </>
                ) : (
                  <>
                    {figure}
                    {marker}
                    {content}
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
