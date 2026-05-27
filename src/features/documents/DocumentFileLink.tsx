import type { SiteDocumentLink } from "@/data/ecrtSite";

import {
  documentFileKindLabel,
  documentFileMetaFromUrl,
  type DocumentFileKind,
} from "./documentFileMeta";

import styles from "./documents-page.module.scss";

type DocumentFileLinkProps = {
  doc: SiteDocumentLink;
  title: string;
  secondaryLabel?: string | null;
  a11ySuffix?: string;
};

const badgeClassByKind: Record<DocumentFileKind, string> = {
  pdf: styles.fileBadgePdf,
  doc: styles.fileBadgeDoc,
  docx: styles.fileBadgeDoc,
  other: styles.fileBadgeOther,
};

export function DocumentFileLink({
  doc,
  title,
  secondaryLabel,
  a11ySuffix = "",
}: DocumentFileLinkProps) {
  const fileMeta = documentFileMetaFromUrl(doc.url);
  const kindLabel = documentFileKindLabel(fileMeta.kind);

  const ariaLabel = secondaryLabel
    ? `${title}. ${secondaryLabel}. ${kindLabel}${a11ySuffix}`
    : `${title}. ${kindLabel}${a11ySuffix}`;

  return (
    <a
      className={styles.docFileLink}
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      <span className={`${styles.fileBadge} ${badgeClassByKind[fileMeta.kind]}`} aria-hidden>
        <span className={styles.fileBadgeFold} />
        <span className={styles.fileBadgeLabel}>{kindLabel}</span>
      </span>

      <span className={styles.fileMeta}>
        <span className={styles.fileTitle}>{title}</span>
        {secondaryLabel ? <span className={styles.fileSecondary}>{secondaryLabel}</span> : null}
      </span>
    </a>
  );
}
