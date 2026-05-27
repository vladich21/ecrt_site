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

export function documentFileMetaFromUrl(url: string): DocumentFileMeta {
  try {
    const pathname = new URL(url).pathname;
    const fileName = decodeURIComponent(pathname.split("/").pop() ?? "document");
    const extension = fileName.includes(".")
      ? (fileName.split(".").pop()?.toLowerCase() ?? "")
      : "";

    return {
      fileName,
      extension,
      kind: extensionToKind[extension] ?? "other",
    };
  } catch {
    return { fileName: "document", extension: "", kind: "other" };
  }
}

export function documentFileKindLabel(kind: DocumentFileKind): string {
  if (kind === "pdf") return "PDF";
  if (kind === "doc") return "DOC";
  if (kind === "docx") return "DOCX";
  return "FILE";
}
