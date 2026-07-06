// @ts-check
import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import { rehypeHeadingIds, unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkDefinitionList from "remark-definition-list";
import starlightLinksValidator from "starlight-links-validator";
import { og } from "./og";
import sitemap from "@astrojs/sitemap";

// The workerd runtime (used by the Cloudflare adapter for dev + prerendering
// since v14) can't run CommonJS. Expressive Code — which renders Markdoc code
// fences at request time via Starlight's <Code> component — pulls in the CJS
// `postcss`, so it must be pre-bundled to ESM or every .mdoc page with a code
// block dies mid-render ("require is not defined", surfaced only as truncated
// HTML). See https://docs.astro.build/en/guides/integrations-guide/cloudflare/
function precompileWorkerdCjsDeps() {
  return {
    name: "precompile-workerd-cjs-deps",
    configEnvironment(environment) {
      if (environment !== "client") {
        return {
          optimizeDeps: {
            include: ["postcss", "postcss-nested", "@ctrl/tinycolor"],
          },
        };
      }
    },
  };
}

const starlightConfig = {
  title: "Bedrock.engineer",
  plugins: [starlightLinksValidator()],
  // Markdoc code fences render through Expressive Code inside workerd, which
  // forbids compiling shiki's oniguruma WASM at runtime — use the JS engine.
  expressiveCode: {
    shiki: {
      engine: "javascript",
    },
  },
  components: {
    Head: "./src/components/Head.astro",
    ThemeSelect: "./src/components/ThemeToggle.astro",
  },
  customCss: ["./src/styles/custom.css"],
  lastUpdated: true,
  logo: {
    light: "./src/assets/bedrock.svg",
    dark: "./src/assets/bedrock.svg",
    replacesTitle: true,
  },
  favicon: "/bedrock.svg",
  editLink: {
    baseUrl: "https://github.com/bedrock-engineer/bedrock-web/edit/main/src/",
  },
  social: [
    {
      icon: "github",
      label: "GitHub",
      href: "https://github.com/bedrock-engineer/bedrock-ge/",
    },
    {
      icon: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/bedrock-engineer/",
    },
  ],
  sidebar: [
    {
      label: "Start Here",
      items: ["docs/getting-started"],
    },
    {
      label: "Explanation",
      items: [{ autogenerate: { directory: "docs/explanation" } }],
    },
    {
      label: "Guides",
      items: [{ autogenerate: { directory: "docs/guides" } }],
    },
    {
      label: "Tutorials",
      items: [{ autogenerate: { directory: "docs/tutorials" } }],
    },

    {
      label: "Reference",
      items: [{ autogenerate: { directory: "docs/reference" } }],
    },
    {
      label: "Resources",
      items: [
        { label: "Contributing", slug: "docs/contributing" },
        // { label: "Brand Assets", slug: "brand-assets" },
      ],
    },
  ],
};

// https://astro.build/config
export default defineConfig({
  site: "https://bedrock.engineer",
  // NOTE: Enabling Astro's i18n config makes Starlight emit /nl/docs/* fallback
  // pages (English content under Dutch URLs). The marketing-page i18n below uses
  // file-based routing (src/pages/nl/*) + src/i18n/utils.ts instead, so this
  // stays off until docs i18n is tackled properly.
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "nl"],
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  // image: {
  //   service: {
  //     entrypoint: "astro/assets/services/sharp",
  //   },
  // },
  prefetch: {
    prefetchAll: true,
  },
  integrations: [
    starlight(starlightConfig),
    mdx({
      optimize: true,
    }),
    markdoc({
      allowHTML: true,
    }),
    react({ experimentalReactChildren: true }),
    og(),
    sitemap(),
  ],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkDefinitionList],
      rehypePlugins: [rehypeHeadingIds],
    }),
  },
  vite: {
    plugins: [tailwindcss(), precompileWorkerdCjsDeps()],
  },
  // imageService "compile" optimizes <Image> at build time into static
  // _astro/*.webp files. Required because this site is fully prerendered (no
  // Worker is deployed) — the v13+ default "cloudflare-binding" needs a runtime
  // /_image endpoint, which 404s on an assets-only deploy.
  adapter: cloudflare({ imageService: "compile" }),
});
