"use client";

import { useEffect, useRef, useState, type TouchEvent } from "react";
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

const SWIPE_THRESHOLD_PX = 40;

export function StagePhotoSlider({ stageId, stageTitle, images, sliderUi }: StagePhotoSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const lastIndex = images.length - 1;

  useEffect(() => {
    setActiveIndex(0);
  }, [stageId]);

  if (images.length === 0) return null;

  const showControls = images.length > 1;
  const carouselLabel = sliderUi.carouselLabel.replace("{title}", stageTitle);

  const goToPrevious = () => {
    setActiveIndex((index) => (index === 0 ? lastIndex : index - 1));
  };

  const goToNext = () => {
    setActiveIndex((index) => (index === lastIndex ? 0 : index + 1));
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (!showControls || touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchEndX === undefined) return;

    const deltaX = touchStartX.current - touchEndX;
    touchStartX.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX) return;

    if (deltaX > 0) {
      goToNext();
      return;
    }

    goToPrevious();
  };

  const handleTouchCancel = () => {
    touchStartX.current = null;
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
          className={styles.photoSliderViewport}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchCancel}
        >
          {images.map((image, imageIndex) => (
            <figure
              key={`${stageId}-${imageIndex}`}
              className={`${styles.photoSlide} ${imageIndex === activeIndex ? styles.photoSlideActive : ""}`}
              aria-hidden={imageIndex !== activeIndex}
            >
              <AssetImage
                src={image}
                alt=""
                fill
                priority={imageIndex === 0}
                className={styles.photoSlideImg}
                sizes="(max-width: 900px) 100vw, min(920px, 90vw)"
              />
            </figure>
          ))}
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
