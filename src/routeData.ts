import { defineRouteMiddleware } from "@astrojs/starlight/route-data";

// Points every docs page at its generated OG card (see src/pages/og/[...slug].ts).
export const onRequest = defineRouteMiddleware((context) => {
  const { head, id } = context.locals.starlightRoute;

  // Starlight's synthesized 404 route has no content-collection entry, so no card.
  if (id === "404") return;

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
