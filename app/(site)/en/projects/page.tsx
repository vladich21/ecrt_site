import type { Metadata } from "next";

import { ProjectsPageView } from "@/features/projects/ProjectsPageView";
import { preloadPageImages } from "@/shared/images/page-image-preload";
import { preloadRouteHeroImage } from "@/shared/images/route-hero-images";
import { buildPageMetadata } from "@/shared/seo/build-page-metadata";
import { PAGE_SEO } from "@/shared/seo/page-seo-copy";

export const revalidate = 86400;

export const metadata: Metadata = buildPageMetadata({
  title: PAGE_SEO.projects.en.title,
  description: PAGE_SEO.projects.en.description,
  path: "/en/projects",
  locale: "en_US",
  alternates: {
    canonical: "/en/projects",
    languages: {
      "ru-RU": "/projects",
      en: "/en/projects",
    },
  },
});

export default function EnProjectsPage() {
  preloadRouteHeroImage("/projects");
  preloadPageImages("/projects");
  return <ProjectsPageView locale="en" />;
}
