import { defineConfig } from "@terrazzo/cli";
import css from "@terrazzo/plugin-css";

/**
 * Tokens whose CSS value can't be expressed in DTCG (fluid clamp() sizes,
 * ch-based widths) carry the exact CSS string in this extension; their $value
 * is a spec-valid static equivalent for Figma and other design tools.
 * See DESIGN_SYSTEM.md.
 */
const CSS_OVERRIDE_EXT = "engineer.bedrock.css";

export default defineConfig({
  tokens: "./tokens/bedrock.resolver.json",
  outDir: "./src/styles/",
  plugins: [
    css({
      filename: "tokens.css",
      // Font families come from Tailwind's @theme block in custom.css
      // (so font-sans/font-condensed/font-mono utilities work); the JSON
      // tokens remain for Figma and other consumers.
      exclude: ["font.sans", "font.condensed", "font.mono"],
      // Keep the variable names components already use:
      // color scales drop the `color.` prefix (--green-9), everything else
      // dash-joins its path (--color-text, --space-m-l, --heading-1).
      variableName: (token) =>
        /^color\.(green|gray|brown|teal)\./.test(token.id)
          ? `--${token.id.replace(/^color\./, "").replace(/\./g, "-")}`
          : `--${token.id.replace(/\./g, "-")}`,
      transform: (token) => token.$extensions?.[CSS_OVERRIDE_EXT]?.value,
      permutations: [
        {
          input: { theme: "light" },
          prepare: (c) => `:root {\n${c}\n}`,
        },
        {
          // Only the raw scales change per theme; semantic aliases resolve
          // through var() at runtime, so they stay in :root.
          input: { theme: "dark" },
          include: [
            "color.green.*",
            "color.gray.*",
            "color.brown.*",
            "color.teal.*",
            "color.background",
          ],
          prepare: (c) => `:root[data-theme="dark"] {\n${c}\n}`,
        },
      ],
    }),
  ],
});
