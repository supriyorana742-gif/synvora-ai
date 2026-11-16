import type { Metadata } from "next";
import { siteConfig } from "./site";

interface PageMeta {
  title: string;
  description: string;
  path: string;
}

/** Builds consistent title, canonical, Open Graph, and Twitter metadata for a page. */
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const fullTitle = `${title} | ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
