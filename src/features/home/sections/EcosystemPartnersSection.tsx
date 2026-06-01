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
              className={`${partnersStyles.logoSlot} ${partner.id === "rzd" ? partnersStyles.logoSlotRzd : ""} ${partner.id === "sinara" ? partnersStyles.logoSlotSinara : ""}`.trim()}
            >
              <span className={partnersStyles.logoFrame}>
                <AssetImage
                  className={partnersStyles.logoImg}
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.id === "rzd" ? 132 : partner.id === "sinara" ? 200 : 160}
                  height={partner.id === "sinara" ? 55 : 60}
                  sizes={
                    partner.id === "rzd"
                      ? "85px"
                      : partner.id === "sinara"
                        ? "(max-width: 640px) 40vw, 220px"
                        : "(max-width: 900px) 28vw, 160px"
                  }
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollRevealSection>
  );
}
