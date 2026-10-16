// One-off extraction of Radix color scales from src/styles/radix-theme.css
// into DTCG token files (tokens/color/scales.{light,dark}.tokens.json).
// Later CSS blocks override earlier ones, so the P3/OKLCH values win over
// sRGB hex — same precedence the browser applied on P3 displays.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import Color from "colorjs.io";

const css = readFileSync("src/styles/radix-theme.css", "utf8");

const themes = { light: {}, dark: {} };
const blockRe = /:root\[data-theme="(light|dark)"\]\s*\{([^}]*)\}/g;
for (const [, theme, body] of css.matchAll(blockRe)) {
  for (const [, name, value] of body.matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
    themes[theme][name] = value.trim();
  }
}

function parseColor(value) {
  let m;
  if ((m = value.match(/^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\)$/))) {
    const color = {
      colorSpace: "oklch",
      components: [Number(m[1]) / 100, Number(m[2]), Number(m[3])],
    };
    if (m[4]) color.alpha = parseAlpha(m[4]);
    return color;
  }
  if ((m = value.match(/^color\(display-p3\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+%?))?\)$/))) {
    // Terrazzo (via colorjs.io ids) doesn't accept "display-p3" as a DTCG
    // colorSpace, so convert to OKLCH — lossless (OKLCH is unbounded; this is
    // a notation change, not a gamut-map).
    const [l, c, h] = new Color("p3", [Number(m[1]), Number(m[2]), Number(m[3])])
      .to("oklch")
      .coords.map((v) => round(Number.isNaN(v) ? 0 : v));
    const color = { colorSpace: "oklch", components: [l, c, h] };
    if (m[4]) color.alpha = parseAlpha(m[4]);
    return color;
  }
  if ((m = value.match(/^#([0-9a-f]{3,8})$/i))) {
    let hex = m[1];
    if (hex.length <= 4) hex = [...hex].map((c) => c + c).join("");
    const n = (i) => parseInt(hex.slice(i, i + 2), 16) / 255;
    const color = {
      colorSpace: "srgb",
      components: [n(0), n(2), n(4)].map((v) => round(v)),
    };
    if (hex.length === 8) color.alpha = round(n(6));
    return color;
  }
  throw new Error(`Unparseable color: ${value}`);
}

const parseAlpha = (s) => (s.endsWith("%") ? Number(s.slice(0, -1)) / 100 : Number(s));
const round = (v) => Math.round(v * 10000) / 10000;

const SCALES = ["green", "gray", "brown", "teal"];
const SKIP = /-(surface|indicator|track)$/;

for (const [theme, vars] of Object.entries(themes)) {
  const out = { color: {} };
  for (const [name, value] of Object.entries(vars)) {
    if (SKIP.test(name)) continue;
    if (name === "color-background") {
      out.color.background = { $type: "color", $value: parseColor(value) };
      continue;
    }
    const m = name.match(/^(green|gray|brown|teal)-(a?\d+|contrast)$/);
    if (!m) {
      console.warn(`skipped: --${name}`);
      continue;
    }
    const [, scale, step] = m;
    out.color[scale] ??= {};
    out.color[scale][step] = { $type: "color", $value: parseColor(value) };
  }
  // stable ordering: scales in fixed order, steps 1-12, a1-a12, contrast
  const ordered = { color: {} };
  if (out.color.background) ordered.color.background = out.color.background;
  for (const scale of SCALES) {
    const steps = out.color[scale];
    ordered.color[scale] = {};
    for (const step of [
      ...Array.from({ length: 12 }, (_, i) => `${i + 1}`),
      ...Array.from({ length: 12 }, (_, i) => `a${i + 1}`),
      "contrast",
    ]) {
      if (steps[step]) ordered.color[scale][step] = steps[step];
    }
  }
  mkdirSync("tokens/color", { recursive: true });
  const file = `tokens/color/scales.${theme}.tokens.json`;
  writeFileSync(file, JSON.stringify(ordered, null, 2) + "\n");
  const count = Object.values(ordered.color).reduce(
    (n, g) => n + ($g => "$type" in $g ? 1 : Object.keys($g).length)(g),
    0,
  );
  console.log(`${file}: ${count} tokens`);
}
