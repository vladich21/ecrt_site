"use client";

import { footerPartnerLogos } from "@/data/footerPartners";
import { ScrollRevealBlock, ScrollRevealSection } from "@/shared/motion/ScrollReveal";
import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";

import type { HomeCopy } from "../home-types";
import partnersStyles from "../ecosystem-partners-section.module.scss";

type EcosystemPartnersSectionProps = {
  title: HomeCopy["ecosystemPartners"]["title"];
};

export function EcosystemPartnersSection({ title }: EcosystemPartnersSectionProps) {
  return (
    <ScrollRevealSection className={partnersStyles.section} aria-labelledby="ecosystem-partners-heading">
      <ScrollRevealBlock className={partnersStyles.titleFrame}>
        <h2 id="ecosystem-partners-heading" className={partnersStyles.title}>
          {title}
        </h2>
      </ScrollRevealBlock>
      <div className={partnersStyles.logosArea}>
        <ul className={partnersStyles.logoRow}>
          {footerPartnerLogos.map((partner) => (
            <li
              key={partner.id}
              className={`${partnersStyles.logoSlot} ${partner.id === "sinara" ? partnersStyles.logoSlot2x : ""} ${partner.id === "rzd" ? partnersStyles.logoSlotRzd : ""}`.trim()}
            >
              <span className={partnersStyles.logoFrame}>
                <AssetImage
                  className={partnersStyles.logoImg}
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.id === "sinara" ? 200 : partner.id === "rzd" ? 132 : 160}
                  height={48}
                  sizes={partner.id === "rzd" ? "85px" : "(max-width: 900px) 28vw, 160px"}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollRevealSection>
  );
}
