"use client";

import { useMemo, useState } from "react";

import { type Locale } from "@/content/i18n/locale";
import type { DocumentGroupId, DocumentSectionId, SiteDocumentLink } from "@/data/ecrtSite";
import { documentSectionOrder } from "@/data/ecrtSite";
import documentsCopyEn from "@/locales/en/documents.json";
import documentsCopyRu from "@/locales/ru/documents.json";

import { CertificateCarousel } from "./CertificateCarousel";
import { DocumentFileLink } from "./DocumentFileLink";
import {
  en15085BundleUrl,
  en15085CertificateSlides,
  iso9001BundleUrl,
  iso9001CertificateSlides,
} from "./qualityCertificateAssets";

import tabStyles from "@/shared/ui/StageTabs/stage-tabs.module.scss";

import styles from "./documents-page.module.scss";

type DocumentsCopy = typeof documentsCopyRu | typeof documentsCopyEn;

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
  const copy: DocumentsCopy = isEn ? documentsCopyEn : documentsCopyRu;

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
  const laborDocs = useMemo(() => docsForSection(docList, "labor"), [docList]);

  const renderDocLink = (doc: SiteDocumentLink) => {
    const primary = isEn ? doc.nameEn : doc.nameRu;
    const a11ySuffix = copy.linkSuffixA11y ?? "";
    const secondaryLabel = isEn ? `${documentsCopyEn.ruOriginalLabel}: ${doc.nameRu}` : null;

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

  const renderPolicyBlock = (
    policy: {
      title: string;
      intro: string;
      commitmentIntro?: string;
      items: readonly string[];
    },
    key: string,
  ) => (
    <section key={key} className={styles.qualityPolicy}>
      <h3 className={styles.qualityPolicyTitle}>{policy.title}</h3>
      <p className={styles.stagePanelText}>{policy.intro}</p>
      {policy.commitmentIntro ? <p className={styles.stagePanelText}>{policy.commitmentIntro}</p> : null}
      <ol className={styles.qualityPolicyList}>
        {policy.items.map((item) => (
          <li key={item.slice(0, 48)} className={styles.qualityPolicyItem}>
            {item}
          </li>
        ))}
      </ol>
    </section>
  );

  const renderQualityDownloadLink = (url: string, label: string) =>
    renderDocLink({
      url,
      nameRu: label,
      nameEn: label,
      section: "quality",
    });

  const renderQualityPanel = () => {
    const tabCopy = copy.tabs.quality;

    return (
      <div className={`${styles.stagePanelBody} ${styles.qualityPanelBody}`}>
        <p className={styles.stagePanelLead}>{tabCopy.lead}</p>

        {renderPolicyBlock(tabCopy.policies.quality, "quality-policy")}
        {renderPolicyBlock(tabCopy.policies.safety, "safety-policy")}

        <div className={styles.docGroup}>
          <h3 className={styles.docGroupTitle}>{tabCopy.certificates.title}</h3>

          <div className={styles.certSubsection}>
            <h4 className={styles.certSubsectionTitle}>{tabCopy.certificates.iso9001.title}</h4>
            <CertificateCarousel
              slides={iso9001CertificateSlides}
              locale={locale}
              ui={tabCopy.certificates.carousel}
            />
            <div className={styles.docFileList}>
              {renderQualityDownloadLink(iso9001BundleUrl, tabCopy.certificates.iso9001.downloadLabel)}
            </div>
          </div>

          <div className={styles.certSubsection}>
            <h4 className={styles.certSubsectionTitle}>{tabCopy.certificates.en15085.title}</h4>
            <CertificateCarousel
              slides={en15085CertificateSlides}
              locale={locale}
              ui={tabCopy.certificates.carousel}
            />
            <div className={styles.docFileList}>
              {renderQualityDownloadLink(en15085BundleUrl, tabCopy.certificates.en15085.downloadLabel)}
            </div>
          </div>
        </div>
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
        {tabCopy.paragraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)} className={styles.stagePanelText}>
            {paragraph}
          </p>
        ))}

        <p className={styles.stagePanelText}>{tabCopy.contactIntro}</p>
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
          <br />
          {tabCopy.postalLabel}: {tabCopy.postalMark}
          <br />
          {tabCopy.postalAddress}
        </p>

        <p className={styles.stagePanelNote}>{tabCopy.submissionNote}</p>
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
    <div className={styles.root}>
      <div className={styles.page}>
        <header className={styles.pageIntro}>
          <h1 className={styles.pageTitle}>{copy.title}</h1>
          <p className={styles.sectionLead}>{copy.intro}</p>
          {isEn ? <p className={styles.note}>{documentsCopyEn.officialNote}</p> : null}
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
