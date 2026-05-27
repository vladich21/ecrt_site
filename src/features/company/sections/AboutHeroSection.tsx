"use client";

import aboutHeroImage from "@/assets/presentation/О-нас.webp";
import { PageHero } from "@/shared/ui/PageHero/PageHero";

import type { AboutCopy } from "../about-types";

export function AboutHeroSection({ aboutCopy }: { aboutCopy: AboutCopy }) {
  return (
    <PageHero
      image={aboutHeroImage}
      title={aboutCopy.hero.title}
      lead={aboutCopy.hero.tagline}
      headingId="about-hero-heading"
      imageAlt={aboutCopy.hero.imageAlt}
      animateCopy
    />
  );
}
