"use client";

import { footerPartnerLogos } from "@/data/footerPartners";
import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";

import type { HomeCopy } from "../home-types";
import partnersStyles from "../ecosystem-partners-section.module.scss";

type EcosystemPartnersSectionProps = {
  title: HomeCopy["ecosystemPartners"]["title"];
};

export function EcosystemPartnersSection({ title }: EcosystemPartnersSectionProps) {
  return (
    <section className={partnersStyles.section} aria-labelledby="ecosystem-partners-heading">
      <div className={partnersStyles.titleFrame}>
        <h2 id="ecosystem-partners-heading" className={partnersStyles.title}>
          {title}
        </h2>
      </div>
      <div className={partnersStyles.logosArea}>
        <ul className={partnersStyles.logoRow}>
          {footerPartnerLogos.map((partner) => (
            <li
              key={partner.id}
              className={`${partnersStyles.logoSlot} ${partner.id === "sinara" ? partnersStyles.logoSlot2x : ""}`.trim()}
            >
              <span className={partnersStyles.logoFrame}>
                <AssetImage
                  className={partnersStyles.logoImg}
                  src={partner.src}
                  alt={partner.alt}
                  width={partner.id === "sinara" ? 200 : 160}
                  height={48}
                  sizes="(max-width: 880px) 40vw, 160px"
                  loading="lazy"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
