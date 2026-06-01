"use client";

import { useMemo, useState } from "react";

import type { DocumentGroupId, DocumentSectionId, SiteDocumentLink } from "@/data/ecrtSite";
import { documentSectionOrder } from "@/data/ecrtSite";
import documentsCopyEn from "@/locales/en/documents.json";
import documentsCopyRu from "@/locales/ru/documents.json";

import { CertificatePreviewGrid } from "./CertificatePreviewGrid";
import { DocumentFileLink } from "./DocumentFileLink";
import { certificatePreviews, hasCertificatePreview } from "./documentCertificatePreviews";

import tabStyles from "@/shared/ui/StageTabs/stage-tabs.module.scss";

import styles from "./documents-page.module.scss";

type Locale = "ru" | "en";

type QualityGroupCopy = {
  title: string;
};

type DocumentsCopy = {
  title: string;
  intro: string;
  linkSuffixA11y?: string;
  officialNote?: string;
  ruOriginalLabel?: string;
  openPdfHint: string;
  tabListLabel: string;
  tabs: {
    anticorruption: {
      label: string;
      paragraphs: string[];
      contactPhoneLabel: string;
      contactPhone: string;
      contactEmailLabel: string;
      contactEmail: string;
      contractorNote: string;
    };
    quality: {
      label: string;
      partnerIntro?: string;
      groups: Record<"policies" | "certificates", QualityGroupCopy>;
    };
    labor: {
      label: string;
      lead: string;
      groups: Record<"sout", QualityGroupCopy>;
    };
    hotline: {
      label: string;
      items: string[];
    };
  };
};

const qualityGroupOrder = ["policies", "certificates"] as const;
const laborGroupOrder = ["sout"] as const;

type DocumentsPageClientProps = {
  locale?: Locale;
  documents: readonly SiteDocumentLink[];
};

function docsForSection(docList: readonly SiteDocumentLink[], sectionId: DocumentSectionId) {
  return docList.filter((doc) => doc.section === sectionId);
}

function docsForGroup(
  docList: readonly SiteDocumentLink[],
  sectionId: DocumentSectionId,
  groupId: DocumentGroupId,
) {
  return docList.filter((doc) => doc.section === sectionId && doc.group === groupId);
}

function phoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? `tel:${digits}` : `tel:+${digits.replace(/^\+/, "")}`;
}

export function DocumentsPageClient({ locale = "ru", documents: docList }: DocumentsPageClientProps) {
  const isEn = locale === "en";
  const copy = (isEn ? documentsCopyEn : documentsCopyRu) as DocumentsCopy;
  const pageLang = isEn ? "en" : undefined;

  const [activeSectionId, setActiveSectionId] = useState<DocumentSectionId>(documentSectionOrder[0]);

  const anticorruptionDocs = useMemo(() => docsForSection(docList, "anticorruption"), [docList]);
  const anticorruptionMainDocs = useMemo(
    () => anticorruptionDocs.filter((doc) => doc.placement !== "afterContractorNote"),
    [anticorruptionDocs],
  );
  const anticorruptionClauseDocs = useMemo(
    () => anticorruptionDocs.filter((doc) => doc.placement === "afterContractorNote"),
    [anticorruptionDocs],
  );
  const qualityDocs = useMemo(() => docsForSection(docList, "quality"), [docList]);
  const laborDocs = useMemo(() => docsForSection(docList, "labor"), [docList]);

  const renderDocLink = (doc: SiteDocumentLink) => {
    const primary = isEn ? doc.nameEn : doc.nameRu;
    const a11ySuffix = copy.linkSuffixA11y ?? "";
    const secondaryLabel =
      isEn && copy.ruOriginalLabel ? `${copy.ruOriginalLabel}: ${doc.nameRu}` : null;

    return (
      <DocumentFileLink
        key={doc.url}
        doc={doc}
        title={primary}
        secondaryLabel={secondaryLabel}
        a11ySuffix={a11ySuffix}
        locale={locale}
      />
    );
  };

  const renderDocList = (items: readonly SiteDocumentLink[]) => (
    <div className={styles.docFileList}>{items.map(renderDocLink)}</div>
  );

  const renderQualityPanel = () => {
    const tabCopy = copy.tabs.quality;

    return (
      <div className={styles.stagePanelBody}>
        {tabCopy.partnerIntro ? (
          <p className={styles.stagePanelLead}>{tabCopy.partnerIntro}</p>
        ) : null}
        {qualityGroupOrder.map((groupId) => {
          const items = docsForGroup(qualityDocs, "quality", groupId);
          if (items.length === 0) return null;

          if (groupId === "certificates") {
            const previewItems = certificatePreviews
              .map((preview) => items.find((doc) => doc.url === preview.pdfUrl))
              .filter((doc): doc is SiteDocumentLink => doc !== undefined);
            const pdfOnlyItems = items.filter((doc) => !hasCertificatePreview(doc.url));

            return (
              <div key={groupId} className={styles.docGroup}>
                <h3 className={styles.docGroupTitle}>{tabCopy.groups[groupId].title}</h3>
                {pdfOnlyItems.length > 0 ? renderDocList(pdfOnlyItems) : null}
                {previewItems.length > 0 ? (
                  <CertificatePreviewGrid
                    items={previewItems}
                    locale={locale}
                    openPdfHint={copy.openPdfHint}
                  />
                ) : null}
              </div>
            );
          }

          return (
            <div key={groupId} className={styles.docGroup}>
              <h3 className={styles.docGroupTitle}>{tabCopy.groups[groupId].title}</h3>
              {renderDocList(items)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderLaborPanel = () => {
    const tabCopy = copy.tabs.labor;

    return (
      <div className={styles.stagePanelBody}>
        <p className={styles.stagePanelLead}>{tabCopy.lead}</p>
        {laborGroupOrder.map((groupId) => {
          const items = docsForGroup(laborDocs, "labor", groupId);
          if (items.length === 0) return null;

          return (
            <div key={groupId} className={styles.docGroup}>
              {renderDocList(items)}
            </div>
          );
        })}
      </div>
    );
  };

  const renderAnticorruptionPanel = () => {
    const tabCopy = copy.tabs.anticorruption;

    return (
      <div className={styles.stagePanelBody}>
        {tabCopy.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={styles.stagePanelText}>
            {paragraph}
          </p>
        ))}

        <p className={styles.stagePanelText}>
          {tabCopy.contactPhoneLabel}:{" "}
          <a className={styles.inlineLink} href={phoneHref(tabCopy.contactPhone)}>
            {tabCopy.contactPhone}
          </a>
          <br />
          {tabCopy.contactEmailLabel}:{" "}
          <a className={styles.inlineLink} href={`mailto:${tabCopy.contactEmail}`}>
            {tabCopy.contactEmail}
          </a>
        </p>

        {anticorruptionMainDocs.length > 0 ? renderDocList(anticorruptionMainDocs) : null}

        <p className={styles.stagePanelNote}>{tabCopy.contractorNote}</p>

        {anticorruptionClauseDocs.length > 0 ? renderDocList(anticorruptionClauseDocs) : null}
      </div>
    );
  };

  const renderHotlinePanel = () => {
    const tabCopy = copy.tabs.hotline;

    return (
      <div className={styles.stagePanelBody}>
        <ol className={styles.hotlineList}>
          {tabCopy.items.map((item, itemIndex) => (
            <li key={itemIndex} className={styles.hotlineItem}>
              <span className={styles.hotlineIndex} aria-hidden>
                {itemIndex + 1}
              </span>
              <p className={styles.stagePanelText}>{item}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  };

  const renderPanelForSection = (sectionId: DocumentSectionId) => {
    switch (sectionId) {
      case "anticorruption":
        return renderAnticorruptionPanel();
      case "quality":
        return renderQualityPanel();
      case "labor":
        return renderLaborPanel();
      case "hotline":
        return renderHotlinePanel();
      default:
        return null;
    }
  };

  return (
    <div className={styles.root} lang={pageLang}>
      <div className={styles.page}>
        <header className={styles.pageIntro}>
          <h1 className={styles.pageTitle}>{copy.title}</h1>
          <p className={styles.sectionLead}>{copy.intro}</p>
          {isEn && copy.officialNote ? <p className={styles.note}>{copy.officialNote}</p> : null}
        </header>

        <div className={styles.stageSwitcher}>
          <div className={tabStyles.stageTabList} role="tablist" aria-label={copy.tabListLabel}>
            {documentSectionOrder.map((sectionId) => {
              const isActive = sectionId === activeSectionId;
              const tabId = `documents-tab-${sectionId}`;
              const panelId = `documents-panel-${sectionId}`;

              return (
                <button
                  key={sectionId}
                  id={tabId}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  className={`${tabStyles.stageTab} ${isActive ? tabStyles.stageTabActive : ""}`}
                  onClick={() => setActiveSectionId(sectionId)}
                >
                  <span className={tabStyles.stageTabLabel}>{copy.tabs[sectionId].label}</span>
                </button>
              );
            })}
          </div>

          {documentSectionOrder.map((sectionId) => {
            const isActive = sectionId === activeSectionId;
            const tabId = `documents-tab-${sectionId}`;
            const panelId = `documents-panel-${sectionId}`;

            return (
              <article
                key={sectionId}
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId}
                hidden={!isActive}
                className={`${styles.stagePanel} ${isActive ? styles.stagePanelActive : ""}`}
              >
                <div className={styles.stagePanelInner}>
                  <h2 className={styles.stagePanelTitle}>{copy.tabs[sectionId].label}</h2>
                  {renderPanelForSection(sectionId)}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
