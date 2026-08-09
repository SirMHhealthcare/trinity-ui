import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export const SITE_URL = "https://trinityhomeopathy.com";

interface PageMetaProps {
  title: string;
  description: string;
  /** Override the canonical URL; defaults to the current route (self-referencing). */
  url?: string;
  ogType?: "website" | "article";
  noindex?: boolean;
  children?: React.ReactNode;
}

/**
 * Single source of truth for per-page head tags.
 * Static tags in index.html carry data-rh="true", so react-helmet-async
 * replaces them instead of duplicating them on every route.
 */
const PageMeta = ({ title, description, url, ogType = "website", noindex, children }: PageMetaProps) => {
  const { pathname } = useLocation();
  const path = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const canonical = url ?? `${SITE_URL}${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {children}
    </Helmet>
  );
};

export default PageMeta;
