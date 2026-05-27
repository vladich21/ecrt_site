import { IBM_Plex_Sans } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { headers } from "next/headers";

import { DEFAULT_OG_IMAGE_PATH } from "@/shared/seo/build-page-metadata";

import { WebVitalsReporter } from "./components/web-vitals-reporter";
import "./globals.css";

const headingFont = IBM_Plex_Sans({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-next",
  display: "swap",
});

const metadataBase =
  process.env.NEXT_PUBLIC_SITE_URL != null
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : new URL("https://example.com");

export const metadata: Metadata = {
  metadataBase,
  title: "АО ИЦ ЖТ | ECRT",
  description: "Инжиниринговый центр железнодорожного транспорта",
  icons: {
    icon: [{ url: "/favicon.webp", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.webp", type: "image/png", sizes: "180x180" }],
  },
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
  const pathname = (await headers()).get("x-pathname") ?? "";
  const lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "ru";

  return (
    <html lang={lang}>
      <body className={headingFont.variable}>
        <WebVitalsReporter />
        {children}
      </body>
    </html>
  );
}
