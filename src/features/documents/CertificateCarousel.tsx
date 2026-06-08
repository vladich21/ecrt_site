"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";

import type { QualityCertificateSlide } from "./qualityCertificateAssets";

import styles from "./documents-page.module.scss";

type CertificateCarouselUi = {
  previous: string;
  next: string;
  carouselLabel: string;
  slideOf: string;
  openPdfHint: string;
};

type CertificateCarouselProps = {
  slides: readonly QualityCertificateSlide[];
  locale: "ru" | "en";
  ui: CertificateCarouselUi;
};

const DESKTOP_SLIDES_PER_PAGE = 3;
const SWIPE_COMMIT_RATIO = 0.14;
const SWIPE_COMMIT_MIN_PX = 48;
const SWIPE_LOCK_PX = 8;

function chunkSlides<T>(items: readonly T[], perPage: number): T[][] {
  const pages: T[][] = [];

  for (let index = 0; index < items.length; index += perPage) {
    pages.push(items.slice(index, index + perPage));
  }

  return pages;
}

function useSlidesPerPage() {
  const [slidesPerPage, setSlidesPerPage] = useState(DESKTOP_SLIDES_PER_PAGE);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 719px)");
    const update = () => setSlidesPerPage(mediaQuery.matches ? 1 : DESKTOP_SLIDES_PER_PAGE);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return slidesPerPage;
}

export function CertificateCarousel({ slides, locale, ui }: CertificateCarouselProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const suppressClickRef = useRef(false);
  const slidesPerPage = useSlidesPerPage();
  const isEn = locale === "en";

  const pages = useMemo(() => chunkSlides(slides, slidesPerPage), [slides, slidesPerPage]);
  const lastPageIndex = pages.length - 1;

  useEffect(() => {
    setPageIndex(0);
    setDragOffset(0);
    setIsDragging(false);
  }, [slidesPerPage, slides]);

  const goToPrevious = useCallback(() => {
    setPageIndex((index) => (index === 0 ? lastPageIndex : index - 1));
  }, [lastPageIndex]);

  const goToNext = useCallback(() => {
    setPageIndex((index) => (index === lastPageIndex ? 0 : index + 1));
  }, [lastPageIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || pages.length <= 1) return;

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
      suppressClickRef.current = true;

      let offset = deltaX;
      if (pageIndex === 0 && offset > 0) offset *= 0.35;
      if (pageIndex === lastPageIndex && offset < 0) offset *= 0.35;
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

      const didSwipe = deltaX <= -threshold || deltaX >= threshold;

      resetGesture();

      if (deltaX <= -threshold) {
        goToNext();
      } else if (deltaX >= threshold) {
        goToPrevious();
      }

      if (!didSwipe) {
        suppressClickRef.current = false;
        return;
      }

      window.setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
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
  }, [goToNext, goToPrevious, lastPageIndex, pageIndex, pages.length]);

  if (slides.length === 0) return null;

  const showControls = pages.length > 1;
  const trackStyle: CSSProperties = {
    transform: `translate3d(calc(-${pageIndex * 100}% + ${dragOffset}px), 0, 0)`,
    transition: isDragging ? "none" : "transform 0.38s cubic-bezier(0.22, 0.8, 0.28, 1)",
  };

  return (
    <div
      className={styles.certCarousel}
      aria-roledescription="carousel"
      aria-label={ui.carouselLabel}
    >
      <div className={styles.certCarouselFrame}>
        {showControls ? (
          <button
            type="button"
            className={styles.certCarouselNav}
            onClick={goToPrevious}
            aria-label={ui.previous}
          >
            <span className={styles.certCarouselNavIcon} aria-hidden>
              ‹
            </span>
          </button>
        ) : null}

        <div
          ref={viewportRef}
          className={`${styles.certCarouselViewport} ${isDragging ? styles.certCarouselViewportDragging : ""}`}
        >
          <div className={styles.certCarouselTrack} style={trackStyle}>
            {pages.map((pageSlides, pageNumber) => (
              <div
                key={`page-${pageNumber}`}
                className={styles.certCarouselPage}
                aria-hidden={pageNumber !== pageIndex}
              >
                {pageSlides.map((slide, slideIndex) => {
                  const absoluteIndex = pageNumber * slidesPerPage + slideIndex;
                  const title = isEn ? slide.altEn : slide.altRu;

                  return (
                    <a
                      key={slide.altRu}
                      className={styles.certCarouselLink}
                      href={slide.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${title}. ${ui.openPdfHint}`}
                      onClick={(event) => {
                        if (suppressClickRef.current) {
                          event.preventDefault();
                        }
                      }}
                    >
                      <figure className={styles.certCarouselCell}>
                        <AssetImage
                          src={slide.image}
                          alt=""
                          width={slide.image.width}
                          height={slide.image.height}
                          className={styles.certCarouselImage}
                          sizes="(max-width: 719px) 100vw, 33vw"
                          priority={absoluteIndex < DESKTOP_SLIDES_PER_PAGE}
                        />
                      </figure>
                    </a>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {showControls ? (
          <button
            type="button"
            className={styles.certCarouselNav}
            onClick={goToNext}
            aria-label={ui.next}
          >
            <span className={styles.certCarouselNavIcon} aria-hidden>
              ›
            </span>
          </button>
        ) : null}
      </div>

      {showControls ? (
        <div className={styles.certCarouselFooter}>
          <div className={styles.certCarouselDots} role="tablist" aria-label={ui.carouselLabel}>
            {pages.map((_page, dotIndex) => (
              <button
                key={`page-dot-${dotIndex}`}
                type="button"
                role="tab"
                aria-selected={dotIndex === pageIndex}
                aria-label={ui.slideOf
                  .replace("{index}", String(dotIndex + 1))
                  .replace("{total}", String(pages.length))}
                className={`${styles.certCarouselDot} ${dotIndex === pageIndex ? styles.certCarouselDotActive : ""}`}
                onClick={() => setPageIndex(dotIndex)}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
