"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import type { StaticImageData } from "next/image";

import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import type { ProjectDetailSliderUi } from "./project-detail-locale";

import styles from "./track-v25-field-works.module.scss";

type StagePhotoSliderProps = {
  stageId: string;
  stageTitle: string;
  images: StaticImageData[];
  sliderUi: ProjectDetailSliderUi;
};

const SWIPE_COMMIT_RATIO = 0.14;
const SWIPE_COMMIT_MIN_PX = 48;
const SWIPE_LOCK_PX = 8;

export function StagePhotoSlider({ stageId, stageTitle, images, sliderUi }: StagePhotoSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const lastIndex = images.length - 1;

  useEffect(() => {
    setActiveIndex(0);
    setDragOffset(0);
    setIsDragging(false);
  }, [stageId]);

  const goToPrevious = useCallback(() => {
    setActiveIndex((index) => (index === 0 ? lastIndex : index - 1));
  }, [lastIndex]);

  const goToNext = useCallback(() => {
    setActiveIndex((index) => (index === lastIndex ? 0 : index + 1));
  }, [lastIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || images.length <= 1) return;

    let startX = 0;
    let startY = 0;
    let tracking = false;
    let axis: "none" | "horizontal" | "vertical" = "none";

    const resetGesture = () => {
      tracking = false;
      axis = "none";
      setIsDragging(false);
      setDragOffset(0);
    };

    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      startX = touch.clientX;
      startY = touch.clientY;
      tracking = true;
      axis = "none";
      setIsDragging(false);
      setDragOffset(0);
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!tracking) return;
      const touch = event.touches[0];
      if (!touch) return;

      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      if (axis === "none") {
        if (Math.abs(deltaX) < SWIPE_LOCK_PX && Math.abs(deltaY) < SWIPE_LOCK_PX) return;
        axis = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
        if (axis === "vertical") {
          resetGesture();
          return;
        }
      }

      if (axis !== "horizontal") return;

      event.preventDefault();
      setIsDragging(true);

      let offset = deltaX;
      if (activeIndex === 0 && offset > 0) offset *= 0.35;
      if (activeIndex === lastIndex && offset < 0) offset *= 0.35;
      setDragOffset(offset);
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!tracking || axis !== "horizontal") {
        resetGesture();
        return;
      }

      const touch = event.changedTouches[0];
      const deltaX = touch ? touch.clientX - startX : 0;
      const width = viewport.clientWidth || 1;
      const threshold = Math.max(SWIPE_COMMIT_MIN_PX, width * SWIPE_COMMIT_RATIO);

      resetGesture();

      if (deltaX <= -threshold) {
        goToNext();
        return;
      }
      if (deltaX >= threshold) {
        goToPrevious();
      }
    };

    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", onTouchEnd, { passive: true });
    viewport.addEventListener("touchcancel", onTouchEnd, { passive: true });

    return () => {
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", onTouchEnd);
      viewport.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [activeIndex, goToNext, goToPrevious, images.length, lastIndex]);

  if (images.length === 0) return null;

  const showControls = images.length > 1;
  const carouselLabel = sliderUi.carouselLabel.replace("{title}", stageTitle);

  const trackStyle: CSSProperties = {
    transform: `translate3d(calc(-${activeIndex * 100}% + ${dragOffset}px), 0, 0)`,
    transition: isDragging ? "none" : "transform 0.38s cubic-bezier(0.22, 0.8, 0.28, 1)",
  };

  return (
    <div className={styles.photoSlider} aria-roledescription="carousel" aria-label={carouselLabel}>
      <div className={styles.photoSliderFrame}>
        {showControls ? (
          <button
            type="button"
            className={styles.photoSliderNav}
            onClick={goToPrevious}
            aria-label={sliderUi.previousPhoto}
          >
            <span className={styles.photoSliderNavIcon} aria-hidden>
              ‹
            </span>
          </button>
        ) : null}

        <div
          ref={viewportRef}
          className={`${styles.photoSliderViewport} ${isDragging ? styles.photoSliderViewportDragging : ""}`}
        >
          <div className={styles.photoSliderTrack} style={trackStyle}>
            {images.map((image, imageIndex) => (
              <figure
                key={`${stageId}-${imageIndex}`}
                className={styles.photoSlide}
                aria-hidden={imageIndex !== activeIndex}
              >
                <AssetImage
                  src={image}
                  alt=""
                  fill
                  priority={imageIndex === activeIndex}
                  className={styles.photoSlideImg}
                  sizes="(max-width: 900px) 100vw, min(920px, 90vw)"
                />
              </figure>
            ))}
          </div>

          {showControls ? (
            <div className={styles.photoSliderSwipeHint} aria-hidden>
              <span className={styles.photoSliderSwipeArrow}>‹</span>
              <span className={styles.photoSliderSwipeText}>{sliderUi.swipeHint}</span>
              <span className={styles.photoSliderSwipeArrow}>›</span>
            </div>
          ) : null}
        </div>

        {showControls ? (
          <button
            type="button"
            className={styles.photoSliderNav}
            onClick={goToNext}
            aria-label={sliderUi.nextPhoto}
          >
            <span className={styles.photoSliderNavIcon} aria-hidden>
              ›
            </span>
          </button>
        ) : null}
      </div>

      {showControls ? (
        <div className={styles.photoSliderFooter}>
          <div className={styles.photoSliderDots} role="tablist" aria-label={sliderUi.photoChoice}>
            {images.map((_image, imageIndex) => (
              <button
                key={`${stageId}-dot-${imageIndex}`}
                type="button"
                role="tab"
                aria-selected={imageIndex === activeIndex}
                aria-label={sliderUi.photoOf
                  .replace("{index}", String(imageIndex + 1))
                  .replace("{total}", String(images.length))}
                className={`${styles.photoSliderDot} ${imageIndex === activeIndex ? styles.photoSliderDotActive : ""}`}
                onClick={() => setActiveIndex(imageIndex)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
