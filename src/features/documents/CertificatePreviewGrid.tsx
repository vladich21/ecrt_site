import { AssetImage } from "@/shared/ui/AssetImage/AssetImage";

import type { SiteDocumentLink } from "@/data/ecrtSite";

import { certificatePreviewImage } from "./documentCertificatePreviews";

import styles from "./documents-page.module.scss";

type CertificatePreviewGridProps = {
  items: readonly SiteDocumentLink[];
  locale: "ru" | "en";
  openPdfHint: string;
};

export function CertificatePreviewGrid({ items, locale, openPdfHint }: CertificatePreviewGridProps) {
  const isEn = locale === "en";

  return (
    <div className={styles.certPreviewGrid}>
      {items.map((doc) => {
        const previewImage = certificatePreviewImage(doc.url);
        if (!previewImage) return null;

        const title = isEn ? doc.nameEn : doc.nameRu;

        return (
          <a
            key={doc.url}
            className={styles.certPreviewLink}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title}. ${openPdfHint}`}
          >
            <AssetImage
              src={previewImage}
              alt={title}
              width={previewImage.width}
              height={previewImage.height}
              className={styles.certPreviewImage}
              sizes="(max-width: 720px) 100vw, 33vw"
            />
          </a>
        );
      })}
    </div>
  );
}
