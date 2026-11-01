// One chart per clicked borehole: its SPT N values against depth, over its weathering grades.
// Loaded on the first click, so the page starts without Observable Plot.
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

/**
 * @param {HTMLElement} container
 * @param {{ spt: { depth: number, n: number, color: string }[],
 *           layers: { top: number, bottom: number, grade: string, color: string }[],
 *           depth: number }} data depths in m below ground level
 */
export function renderBoreholeChart(
  container,
  { spt, layers, depth },
  { width = 260, height = 360 } = {},
) {
  const chart = Plot.plot({
    width,
    height,
    marginLeft: 44,
    marginRight: 12,
    marginTop: 20,
    marginBottom: 36,
    style: {
      background: "transparent",
      color: "var(--text-muted)",
      fontFamily: "inherit",
      overflow: "visible",
    },
    x: {
      label: "SPT N",
      labelAnchor: "center",
      grid: true,
      domain: [0, Math.max(50, ...spt.map((d) => d.n))],
      nice: true,
    },
    y: {
      label: "Depth (m)",
      grid: true,
      domain: [0, Math.ceil(depth)],
      reverse: true,
    },
    marks: [
      Plot.rect(layers, {
        y1: "top",
        y2: "bottom",
        fill: "color",
        fillOpacity: 0.5,
        clip: true,
      }),
      // One grade label per run of same-grade intervals, where the run is thick enough to hold it
      Plot.text(
        mergeRuns(layers).filter((d) => d.bottom - d.top > 1.5),
        {
          y: (d) => (d.top + d.bottom) / 2,
          text: "grade",
          frameAnchor: "right",
          dx: -4,
          fontSize: 9,
          fill: "var(--text-primary)",
        },
      ),
      Plot.dot(spt, { x: "n", y: "depth", fill: "color", r: 3 }),
      Plot.crosshair(spt, { x: "n", y: "depth" }),
      Plot.frame({ stroke: "var(--panel-border)" }),
    ],
  });
  container.replaceChildren(chart);
}

/** Contiguous intervals with the same grade, merged into one interval each */
function mergeRuns(layers) {
  const runs = [];
  for (const layer of [...layers].sort((a, b) => a.top - b.top)) {
    const last = runs.at(-1);
    if (last && last.grade === layer.grade && layer.top <= last.bottom + 0.05) {
      last.bottom = Math.max(last.bottom, layer.bottom);
    } else {
      runs.push({ ...layer });
    }
  }
  return runs;
}
