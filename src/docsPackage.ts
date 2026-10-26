// Docs pages live under src/content/docs/docs/<package>/, one directory per
// open-source package (see the starlightSidebarTopics entries in
// astro.config.mjs). "concepts" is a topic too, but not a package.
const DOCS_PACKAGES = new Set(["bedrock-ge", "cpt-anywidget", "bro-xml-parser"]);

/** Returns the package a docs content-collection id belongs to, if any. */
export function docsPackage(id: string): string | undefined {
  const dir = id.match(/^docs\/([^/]+)\//)?.[1];
  return dir && DOCS_PACKAGES.has(dir) ? dir : undefined;
}

/**
 * Page title for the browser tab, og:title and the OG card. Page titles like
 * "Getting started" or "Overview" repeat across packages, so the package name
 * is appended to say which library the page is about.
 */
export function docsPageTitle(id: string, title: string): string {
  const pkg = docsPackage(id);
  return pkg ? `${title} · ${pkg}` : title;
}
