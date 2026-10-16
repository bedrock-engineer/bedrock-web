// Visual-regression snapshots for the token migration. Usage:
//   node scripts/screenshot-pages.mjs <outDir> [baseUrl]
// Assumes `astro preview` (or dev) is serving at baseUrl (default :4321).
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const outDir = process.argv[2] ?? "screenshots/baseline";
const base = process.argv[3] ?? "http://localhost:4321";

const routes = [
  ["home", "/"],
  ["about", "/about"],
  ["mission", "/mission"],
  ["terms", "/terms"],
  ["services", "/services"],
  ["demos", "/demos"],
  ["voxels", "/voxels"],
  ["tools", "/tools"],
  ["technologies", "/technologies"],
  ["brand-assets", "/brand-assets"],
  ["docs", "/docs/bedrock-ge/"],
];
const widths = [375, 1440];
const themes = ["light", "dark"];

mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: "new",
});

const page = await browser.newPage();
for (const theme of themes) {
  // ThemeToggle reads localStorage("theme"); set it before each load.
  await page.evaluateOnNewDocument((t) => {
    localStorage.setItem("theme", t);
  }, theme);
  for (const [name, path] of routes) {
    for (const width of widths) {
      await page.setViewport({ width, height: 1200 });
      await page.goto(base + path, { waitUntil: "networkidle0", timeout: 30000 });
      // Belt and braces: force the attribute too (covers SSR'd default).
      await page.evaluate((t) => {
        document.documentElement.dataset.theme = t;
      }, theme);
      await new Promise((r) => setTimeout(r, 400)); // fonts/animations settle
      await page.screenshot({
        path: `${outDir}/${name}-${theme}-${width}.png`,
        fullPage: true,
      });
      console.log(`${name}-${theme}-${width}.png`);
    }
  }
}
await browser.close();
