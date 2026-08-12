import { getCollection } from "astro:content";
import { OGImageRoute } from "astro-og-canvas";

// Build-time OG card for every docs page, keyed by content-collection id so it
// covers all packages (and .mdoc pages) without any path matching.
// src/routeData.ts points each page's og:image meta tag at /og/<id>.png.
const entries = await getCollection("docs");

const pages = Object.fromEntries(entries.map(({ data, id }) => [id, { data }]));

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_id, page: (typeof pages)[string]) => ({
    title: page.data.title,
    description: page.data.description,
    logo: { path: "./src/assets/Bedrock_TextRight.png", size: [371] },
    bgGradient: [[255, 255, 255]],
    border: { color: [99, 128, 94], width: 16, side: "block-end" },
    padding: 72,
    font: {
      title: {
        color: [23, 23, 20],
        size: 64,
        weight: "SemiBold",
        families: ["IBM Plex Sans"],
      },
      description: {
        color: [64, 66, 60],
        size: 36,
        families: ["IBM Plex Sans"],
      },
    },
    // CanvasKit can't read the woffs @fontsource ships; these TTFs are the
    // same latin-400/600 files, losslessly unwrapped from woff.
    fonts: [
      "./src/assets/fonts/IBMPlexSans-SemiBold.ttf",
      "./src/assets/fonts/IBMPlexSans-Regular.ttf",
    ],
  }),
});
