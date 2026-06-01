export type DocumentFileKind = "pdf" | "doc" | "docx" | "other";

export type DocumentFileMeta = {
  fileName: string;
  extension: string;
  kind: DocumentFileKind;
};

const extensionToKind: Record<string, DocumentFileKind> = {
  pdf: "pdf",
  doc: "doc",
  docx: "docx",
};

function pathnameFromDocumentUrl(url: string): string {
  const raw = url.trim();
  if (!raw) return "";

  if (/^https?:\/\//i.test(raw)) {
    try {
      return new URL(raw).pathname;
    } catch {
      return "";
    }
  }

  const withoutQuery = raw.split(/[?#]/)[0] ?? raw;
  return withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
}

export function documentFileMetaFromUrl(url: string): DocumentFileMeta {
  const pathname = pathnameFromDocumentUrl(url);
  if (!pathname) {
    return { fileName: "document", extension: "", kind: "other" };
  }

  const fileName = decodeURIComponent(pathname.split("/").pop() ?? "document");
  const extension = fileName.includes(".")
    ? (fileName.split(".").pop()?.toLowerCase() ?? "")
    : "";

  return {
    fileName,
    extension,
    kind: extensionToKind[extension] ?? "other",
  };
}

export function documentFileKindLabel(kind: DocumentFileKind, locale: "ru" | "en" = "ru"): string {
  if (kind === "pdf") return "PDF";
  if (kind === "doc") return locale === "ru" ? "WORD" : "DOC";
  if (kind === "docx") return locale === "ru" ? "WORD" : "DOCX";
  return "FILE";
}
