import { IBM_Plex_Sans } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";

import { DEFAULT_OG_IMAGE_PATH, getPublicSiteOrigin } from "@/shared/seo/build-page-metadata";

import "./globals.css";

const headingFont = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-next",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getPublicSiteOrigin()),
  title: "АО ИЦ ЖТ | ECRT",
  description: "Инжиниринговый центр железнодорожного транспорта",
  openGraph: {
    siteName: "АО ИЦ ЖТ",
    type: "website",
    locale: "ru_RU",
    images: [{ url: DEFAULT_OG_IMAGE_PATH, alt: "АО ИЦ ЖТ" }],
  },
  twitter: {
    card: "summary_large_image",
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = (await headers()).get("x-locale") === "en" ? "en" : "ru";

  return (
    <html lang={locale}>
      <body className={headingFont.variable}>{children}</body>
    </html>
  );
}
