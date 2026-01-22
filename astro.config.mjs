// @ts-check
import cloudflare from "@astrojs/cloudflare";
import markdoc from "@astrojs/markdoc";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import remarkDefinitionList from "remark-definition-list";
import starlightLinksValidator from "starlight-links-validator";
import { og } from "./og";
import sitemap from "@astrojs/sitemap";

const starlightConfig = {
  title: "Bedrock.engineer",
  plugins: [starlightLinksValidator()],
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
      autogenerate: { directory: "docs/explanation" },
    },
    {
      label: "Guides",
      autogenerate: { directory: "docs/guides" },
    },
    {
      label: "Tutorials",
      autogenerate: { directory: "docs/tutorials" },
    },

    {
      label: "Reference",
      autogenerate: { directory: "docs/reference" },
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
  // i18n: {
  //   defaultLocale: "en",
  // locales: ["en", "nl"],
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
    rehypePlugins: [rehypeHeadingIds],
    remarkPlugins: [remarkDefinitionList],
  },
  redirects: {
    "/reference/formats/ags/": "/reference/formats/ags/ags4/",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: cloudflare(),
});
