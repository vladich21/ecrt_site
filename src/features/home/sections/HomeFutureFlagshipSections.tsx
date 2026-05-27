"use client";

import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import evs360Hero from "@/assets/presentation/эвс-02.webp";
import flagshipCorridorMap from "@/assets/home/magnific_3007658625.webp";

import type { HomeCopy } from "../home-types";
import { futureMotion } from "../home-page-motion";
import futureStyles from "../home-future-flagship.module.scss";

const CITY_VIDEO_WEBM_SRC = "/videos/City%2520Animation.webm";
const CITY_VIDEO_MP4_SRC = "/videos/City%2520Animation.mp4";
const evs360PosterSrc = typeof evs360Hero === "string" ? evs360Hero : evs360Hero.src;

export function HomeFutureFlagshipSections({ homeCopy }: { homeCopy: HomeCopy }) {
  const facts = homeCopy.flagship.facts;
  const futureCopyRef = useRef<HTMLDivElement>(null);
  const futureCopyInView = useInView(futureCopyRef, { once: true, amount: 0.45 });
  const flagshipSectionLeadTrimmed = homeCopy.flagship.sectionLead.trim();
  const flagshipCardTitleTrimmed = homeCopy.flagship.title.trim();
  const flagshipDescriptionTrimmed = homeCopy.flagship.description.trim();

  return (
    <>
      <motion.section
        className={futureStyles.flagshipSection}
        id="flagship-project"
        aria-labelledby="flagship-section-title"
        initial="hidden"
        whileInView="visible"
        variants={futureMotion.flagshipSection}
        viewport={{ once: true, margin: "-40px" }}
      >
        <div className={futureStyles.flagshipMarks} aria-hidden>
          {homeCopy.flagship.marks.map((mark) => (
            <span key={mark} className={futureStyles.flagshipMark}>
              {mark}
            </span>
          ))}
        </div>

        <motion.div className={futureStyles.flagshipSectionHead} variants={futureMotion.flagshipGroup}>
          <motion.h2 className={futureStyles.flagshipSectionTitle} id="flagship-section-title" variants={futureMotion.flagshipItem}>
            {homeCopy.flagship.sectionTitle}
          </motion.h2>
          {flagshipSectionLeadTrimmed ? (
            <motion.p className={futureStyles.flagshipSectionLead} variants={futureMotion.flagshipItem}>
              {flagshipSectionLeadTrimmed}
            </motion.p>
          ) : null}
        </motion.div>

        <motion.div className={futureStyles.flagshipWrap} variants={futureMotion.flagshipGroup}>
          <motion.div className={futureStyles.flagshipLead} tabIndex={0} variants={futureMotion.flagshipItem}>
            <div className={futureStyles.flagshipLeadMedia}>
              <AssetImage
                className={futureStyles.flagshipLeadBgImg}
                src={flagshipCorridorMap}
                alt={homeCopy.flagship.mapAlt}
                fill
                sizes="(max-width: 1024px) 100vw, min(calc(100vw - 100px), 1400px)"
              />
            </div>
            <div className={futureStyles.flagshipText}>
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
            </div>
          </motion.div>

          <motion.ul className={futureStyles.flagshipFacts} variants={futureMotion.flagshipGroup}>
            {facts.map((fact, index) => (
              <motion.li key={`${fact.num}-${fact.title}-${index}`} className={futureStyles.factLi} variants={futureMotion.flagshipFact}>
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
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.section>

      <section className={futureStyles.futureSection} id="future" aria-labelledby="future-title">
        <div className={futureStyles.videoFullBleed}>
          <div className={futureStyles.videoFrame}>
            <video
              className={futureStyles.video}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={evs360PosterSrc}
              aria-label={homeCopy.future.videoAria}
            >
              <source src={CITY_VIDEO_WEBM_SRC} type="video/webm" />
              <source src={CITY_VIDEO_MP4_SRC} type="video/mp4" />
            </video>
            <div className={futureStyles.videoScrim} aria-hidden />
            <div className={futureStyles.videoCopyLayer}>
              <motion.div
                ref={futureCopyRef}
                className={futureStyles.copyPanel}
                variants={futureMotion.futureStack}
                initial="hidden"
                animate={futureCopyInView ? "visible" : "hidden"}
              >
                <motion.h2 className={futureStyles.overlayTitle} id="future-title" variants={futureMotion.futureLine}>
                  {homeCopy.future.title}
                </motion.h2>
                <motion.p className={futureStyles.overlayLead} variants={futureMotion.futureLine}>
                  {homeCopy.future.lead}
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
