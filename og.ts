import satori from "satori";
import type { AstroIntegration } from "astro";
import { Resvg } from "@resvg/resvg-js";
import parseFrontmatter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

const render = ({ prefix, title }: { prefix: string; title: string }) => ({
  type: "div",
  props: {
    style: {
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
      fontSize: 36,
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            left: 42,
            top: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            gap: 16,
          },
          children: [
            {
              type: "svg",
              props: {
                xmlns: "http://www.w3.org/2000/svg",
                width: "73",
                height: "80",
                viewBox: "0 0 73.519 80.308",
                children: [
                  {
                    type: "path",
                    props: {
                      d: "M116.311 256.521c-1.65-.31-3.423-1.172-17.991-8.748-17.86-9.289-18.317-9.625-16.403-12.059.477-.606 7.298-4.423 7.905-4.423.136 0 5.499 2.74 11.917 6.09 17.26 9.007 14.766 9.015 32.163-.107l11.856-6.216 3.467 1.815c5.012 2.625 6.039 4.031 4.326 5.926-.574.636-30.926 16.711-32.678 17.308-1.032.351-3.637.588-4.562.414z",
                      fill: "#868b85",
                      transform: "translate(-81.066 -176.272)",
                    },
                  },
                  {
                    type: "path",
                    props: {
                      d: "M115.65 235.611c-1.176-.259-2.719-1.026-17.595-8.756-17.775-9.236-18.27-9.608-16.073-12.08 1.14-1.282 7.623-4.463 8.394-4.117.367.165 5.668 2.899 11.78 6.076 16.826 8.747 14.402 8.77 31.657-.285 6.351-3.333 11.681-6.06 11.844-6.06.572 0 7.23 3.479 7.856 4.105 2.458 2.457 2.012 2.8-15.93 12.244-17.513 9.22-18.516 9.625-21.933 8.873z",
                      fill: "#998468",
                      transform: "translate(-81.066 -176.272)",
                    },
                  },
                  {
                    type: "path",
                    props: {
                      d: "M114.673 214.515c-2.178-.778-31.865-16.392-32.56-17.125-2.385-2.518-1.888-2.911 14.62-11.547 19.714-10.315 17.742-9.389 20.3-9.53 3.263-.181 3.356-.141 20.099 8.565 22.428 11.664 22.407 9.528.214 21.163-18.23 9.557-18.919 9.814-22.673 8.474z",
                      fill: "#63805e",
                      transform: "translate(-81.066 -176.272)",
                    },
                  },
                ],
              },
            },
            {
              type: "div",
              props: {
                style: {
                  fontSize: 64,
                  fontFamily: "IBM Plex Sans Condensed",
                },
                children: "Bedrock.engineer",
              },
            },
          ],
        },
      },
      {
        type: "div",
        props: {
          style: {
            marginTop: 40,
            display: "flex",
            columnGap: "8px",
            fontSize: 78,
          },
          children: [
            {
              type: "span",
              props: {
                style: {
                  fontWeight: 600,
                },
                children: `${prefix}:`,
              },
            },
            {
              type: "span",
              props: {
                children: title,
              },
            },
          ],
        },
      },
    ],
  },
});

// https://dietcode.io/p/astro-og/
export const og = (): AstroIntegration => ({
  name: "satori-og",
  hooks: {
    "astro:build:done": async ({ dir, pages }) => {
      console.log("pages", pages);
      try {
        for (const { pathname } of pages) {
          // 1. For every resolved page, do the following:
          console.log({ pathname });

          if (
            !pathname.startsWith("reference/") &&
            !pathname.startsWith("explanation/") &&
            !pathname.startsWith("guides/")
          ) {
            continue;
          }

          let prefix = "";
          let folderPath = "";
          if (pathname.startsWith("reference/")) {
            prefix = "Reference";
            folderPath = "reference";
          }

          if (pathname.startsWith("explanation/")) {
            prefix = "Explanation";
            folderPath = "explanation";
          }

          if (pathname.startsWith("guides/")) {
            prefix = "Guide";
            folderPath = "guides";
          }

          if (folderPath == "") {
            continue;
          }

          // 3. Locate the source file for this resolved page
          const filename = pathname.slice(folderPath.length + 1, -1);
          console.log(
            `Looking for file: src/content/docs/${folderPath}/${filename}.md`
          );

          if (!filename) {
            console.log(`Skipping empty filename for pathname: ${pathname}`);
            continue;
          }

          let filePath = `src/content/docs/${folderPath}/${filename}.md`;

          // Check if the file exists, if not try index.md
          if (!fs.existsSync(filePath)) {
            filePath = `src/content/docs/${folderPath}/${filename}/index.md`;
            console.log(`Trying index.md: ${filePath}`);
            if (!fs.existsSync(filePath)) {
              console.log(
                `Neither ${filename}.md nor ${filename}/index.md exists, skipping`
              );
              continue;
            }
          }

          const file = fs.readFileSync(filePath);

          //   // 4. Parse frontmatter for our source file, and get our title
          const { title } = parseFrontmatter(file).data;

          // 6. Render our SVG. The `render` function returns the JSX object that we talked about. I've separated this out just to keep things easy to follow
          const ibmPlexSans400 = fs.readFileSync(
            path.join(
              process.cwd(),
              "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff"
            )
          );

          const ibmPlexSans600 = fs.readFileSync(
            path.join(
              process.cwd(),
              "node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff"
            )
          );
          const ibmPlexSansCondensed = fs.readFileSync(
            path.join(
              process.cwd(),
              "node_modules/@fontsource/ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-400-normal.woff"
            )
          );

          const svg = await satori(render({ prefix, title }), {
            width: 1200,
            height: 630,
            fonts: [
              {
                name: "IBM Plex Sans",
                data: ibmPlexSans400,
                weight: 400,
                style: "normal",
              },
              {
                name: "IBM Plex Sans",
                data: ibmPlexSans600,
                weight: 600,
                style: "normal",
              },
              {
                name: "IBM Plex Sans Condensed",
                data: ibmPlexSansCondensed,
                weight: 400,
                style: "normal",
              },
            ],
          });

          // 7. Render our SVG as a PNG
          const resvg = new Resvg(svg, {
            fitTo: {
              mode: "width",
              value: 1200,
            },
          });

          // 8. Write this PNG to a predictable location. I keep this right next to the page itself. That way, I can link to it easily.
          fs.writeFileSync(
            `${dir.pathname}${pathname}og.png`,
            resvg.render().asPng()
          );
        }

        // Just some fancy success message to make this plugin look like it belongs
        console.log(`\x1b[32mog:\x1b[0m Generated OpenGraph images\n`);
      } catch (e) {
        console.error(e);
        console.log(`\x1b[31mog:\x1b[0m OpenGraph image generation failed\n`);
      }
    },
  },
});
