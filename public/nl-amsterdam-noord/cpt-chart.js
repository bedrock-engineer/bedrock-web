// Loads a CPT from the BRO, parses it with @bedrock-engineer/bro-xml-parser and charts its
// measurements with Observable Plot. Imported on the first click, so the page does not pay for
// the parser and Plot before a CPT is selected.
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";
import {
  BROParser,
  XMLAdapter,
} from "https://cdn.jsdelivr.net/npm/@bedrock-engineer/bro-xml-parser@0.11/+esm";

// The BRO viewer's proxy caches documents at the edge and shields the BRO API from rate limits,
// but only answers bedrock.engineer origins. Elsewhere (local development) the BRO API is
// called directly; it allows any origin.
const PROXY_URL = "https://bro.bedrock.engineer/api/bro/";
const BRO_API_URL = "https://publiek.broservices.nl/sr/cpt/v1/objects/";
const useProxy = location.hostname.endsWith("bedrock.engineer");

const parser = new BROParser(new XMLAdapter());
const cache = new Map();

export function loadCpt(broId) {
  if (!cache.has(broId)) {
    const parsed = fetchXml(broId).then(parseCpt);
    parsed.catch(() => cache.delete(broId)); // so the next click retries
    cache.set(broId, parsed);
  }
  return cache.get(broId);
}

async function fetchXml(broId) {
  // null: the proxy is unreachable or rate limited; then the BRO API is tried directly
  const proxied = useProxy
    ? await fetch(PROXY_URL + broId).catch(() => null)
    : null;
  if (proxied?.ok) {
    return proxied.text();
  }
  if (proxied?.status === 404) {
    throw new Error(await proxied.text());
  }

  const response = await fetch(BRO_API_URL + broId);
  if (!response.ok) {
    throw new Error(`BRO API responded ${response.status}`);
  }
  const xml = await response.text();
  const rejection = /<brocom:rejectionReason>([^<]*)</.exec(xml);
  if (rejection) {
    throw new Error(rejection[1]);
  }
  return xml;
}

// BRO XML has depths relative to the surface only; elevation comes from the surface's NAP
// offset, so the charts share their vertical axis with the scene
function parseCpt(xml) {
  const cpt = parser.parseCPT(xml);
  const vertical = cpt.deliveredVerticalPosition;
  const offset = vertical?.offset?.value;
  const hasElevation =
    offset != null && vertical?.verticalDatum?.code === "NAP";
  const measurements =
    cpt.conePenetrometerSurvey?.conePenetrationTest?.measurements ?? [];

  const rows = measurements.map((row) => {
    const depth = row.depth ?? row.penetrationLength;
    return {
      ...row,
      depth,
      elevation: hasElevation && depth != null ? offset - depth : null,
    };
  });

  return { cpt, rows, hasElevation };
}

const COLUMNS = [
  { key: "coneResistance", label: "qc (MPa)" },
  { key: "frictionRatio", label: "Rf (%)" },
  { key: "porePressureU2", label: "u2 (MPa)" },
];

// One chart per measured column, on a shared vertical axis drawn once on the left. `layers`
// ({ top, bottom, color }) are drawn as bands behind the curves.
export function renderCptCharts(
  container,
  { rows, hasElevation },
  layers,
  { width = 150, height = 360 } = {},
) {
  const yKey = hasElevation ? "elevation" : "depth";
  const columns = COLUMNS.filter((column) =>
    rows.some((row) => row[column.key] != null),
  );
  const ys = rows.map((row) => row[yKey]).filter((y) => y != null);
  const yDomain = [Math.min(...ys), Math.max(...ys)];

  const charts = columns.map((column, i) => {
    const first = i === 0;
    return Plot.plot({
      width: width + (first ? 40 : 0),
      height,
      marginLeft: first ? 48 : 8,
      marginRight: 8,
      // Explicit, so the charts without a y axis keep the same frame height as the first
      marginTop: 20,
      marginBottom: 36,
      style: {
        background: "transparent",
        color: "var(--ui-text-secondary)",
        fontFamily: "inherit",
        overflow: "visible",
      },
      x: { label: column.label, labelAnchor: "center", grid: true, zero: true },
      y: {
        label: hasElevation ? "NAP (m)" : "Depth (m)",
        grid: true,
        domain: yDomain,
        reverse: !hasElevation,
        axis: first ? "left" : null,
      },
      marks: [
        Plot.rect(layers, {
          y1: "top",
          y2: "bottom",
          fill: "color",
          fillOpacity: 0.55,
          clip: true,
        }),
        Plot.lineX(rows, {
          x: column.key,
          y: yKey,
          stroke: "white",
          strokeWidth: 1,
          filter: (row) => row[column.key] != null && row[yKey] != null,
        }),
        Plot.crosshair(rows, { x: column.key, y: yKey }),
        Plot.frame({ stroke: "var(--ui-border)" }),
      ],
    });
  });

  container.replaceChildren(...charts);
}
