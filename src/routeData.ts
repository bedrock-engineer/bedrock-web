import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { docsPageTitle } from "./docsPackage";

// Points every docs page at its generated OG card (see src/pages/og/[...slug].ts)
// and appends the package name to the page title.
export const onRequest = defineRouteMiddleware((context) => {
  const { head, id, entry } = context.locals.starlightRoute;

  // Starlight's synthesized 404 route has no content-collection entry, so no card.
  if (id === "404") return;

  // Starlight already pushed a <title> and og:title built from the frontmatter
  // title; rewrite those in place rather than pushing duplicates.
  const title = entry.data.title;
  const pageTitle = docsPageTitle(id, title);
  if (pageTitle !== title) {
    for (const tag of head) {
      if (tag.tag === "title" && tag.content?.startsWith(title)) {
        tag.content = pageTitle + tag.content.slice(title.length);
      } else if (tag.tag === "meta" && tag.attrs?.property === "og:title") {
        tag.attrs.content = pageTitle;
      }
    }
  }

  const ogImageUrl = new URL(`/og/${id || "index"}.png`, context.site);

  head.push({
    tag: "meta",
    attrs: { property: "og:image", content: ogImageUrl.href },
  });
  head.push({
    tag: "meta",
    attrs: { name: "twitter:image", content: ogImageUrl.href },
  });
});
