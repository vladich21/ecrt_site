"use client";

import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import { LazyInViewVideo } from "@/shared/ui/LazyInViewVideo/LazyInViewVideo";
import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";

import flagshipCorridorMap from "@/assets/home/magnific_3007658625.webp";

import type { HomeCopy } from "../home-types";
import futureStyles from "../home-future-flagship.module.scss";

const CITY_VIDEO_WEBM_SRC = "/videos/City%2520Animation.webm";
const CITY_VIDEO_MP4_SRC = "/videos/City%2520Animation.mp4";

export function HomeFutureFlagshipSections({ homeCopy }: { homeCopy: HomeCopy }) {
  const facts = homeCopy.flagship.facts;
  const flagshipSectionLeadTrimmed = homeCopy.flagship.sectionLead.trim();
  const flagshipCardTitleTrimmed = homeCopy.flagship.title.trim();
  const flagshipDescriptionTrimmed = homeCopy.flagship.description.trim();

  return (
    <>
      <ScrollRevealSection
        className={futureStyles.flagshipSection}
        id="flagship-project"
        aria-labelledby="flagship-section-title"
      >
        <div className={futureStyles.flagshipMarks} aria-hidden>
          {homeCopy.flagship.marks.map((mark) => (
            <span key={mark} className={futureStyles.flagshipMark}>
              {mark}
            </span>
          ))}
        </div>

        <ScrollRevealBlock className={futureStyles.flagshipSectionHead}>
          <h2 className={futureStyles.flagshipSectionTitle} id="flagship-section-title">
            {homeCopy.flagship.sectionTitle}
          </h2>
          {flagshipSectionLeadTrimmed ? (
            <p className={futureStyles.flagshipSectionLead}>{flagshipSectionLeadTrimmed}</p>
          ) : null}
        </ScrollRevealBlock>

        <div className={futureStyles.flagshipWrap}>
          <div className={futureStyles.flagshipLead} tabIndex={0}>
            <div className={futureStyles.flagshipLeadMedia}>
              <AssetImage
                className={futureStyles.flagshipLeadBgImg}
                src={flagshipCorridorMap}
                alt={homeCopy.flagship.mapAlt}
                fill
                sizes="(max-width: 1024px) 100vw, min(calc(100vw - 100px), 1400px)"
                priority
              />
            </div>
            <ScrollRevealBlock className={futureStyles.flagshipText}>
              <div className={futureStyles.flagshipTextInner}>
                {flagshipCardTitleTrimmed ? (
                  <div className={futureStyles.flagshipTitleSlot}>
                    <h3 className={futureStyles.flagshipTitle} id="flagship-title">
                      {flagshipCardTitleTrimmed}
                    </h3>
                  </div>
                ) : null}
                {flagshipDescriptionTrimmed ? (
                  <p
                    className={futureStyles.flagshipDesc}
                    id={flagshipCardTitleTrimmed ? undefined : "flagship-title"}
                  >
                    {flagshipDescriptionTrimmed}
                  </p>
                ) : null}
              </div>
            </ScrollRevealBlock>
          </div>

          <ul className={futureStyles.flagshipFacts}>
            {facts.map((fact, index) => (
              <li key={`${fact.num}-${fact.title}-${index}`} className={futureStyles.factLi}>
                <ScrollRevealBlock inView>
                  <article className={futureStyles.factCard}>
                    <div className={futureStyles.factNum}>
                      {fact.num}
                      <span className={futureStyles.factUnit}>{fact.unit}</span>
                    </div>
                    <div className={futureStyles.factCopy}>
                      <h3 className={futureStyles.factHeading}>{fact.title}</h3>
                      <p className={futureStyles.factBody}>{fact.body}</p>
                    </div>
                  </article>
                </ScrollRevealBlock>
              </li>
            ))}
          </ul>
        </div>
      </ScrollRevealSection>

      <section className={futureStyles.futureSection} id="future" aria-labelledby="future-title">
        <div className={futureStyles.videoFullBleed}>
          <div className={futureStyles.videoFrame}>
            <LazyInViewVideo
              className={futureStyles.video}
              autoPlay
              muted
              loop
              playsInline
              aria-label={homeCopy.future.videoAria}
            >
              <source src={CITY_VIDEO_WEBM_SRC} type="video/webm" />
              <source src={CITY_VIDEO_MP4_SRC} type="video/mp4" />
            </LazyInViewVideo>
            <div className={futureStyles.videoScrim} aria-hidden />
            <div className={futureStyles.videoCopyLayer}>
              <ScrollRevealSection className={futureStyles.copyPanel}>
                <ScrollRevealBlock fadeOnly>
                  <h2 className={futureStyles.overlayTitle} id="future-title">
                    {homeCopy.future.title}
                  </h2>
                </ScrollRevealBlock>
                <ScrollRevealBlock fadeOnly>
                  <p className={futureStyles.overlayLead}>{homeCopy.future.lead}</p>
                </ScrollRevealBlock>
              </ScrollRevealSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
