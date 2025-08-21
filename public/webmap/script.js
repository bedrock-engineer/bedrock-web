import maplibregl from "https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.2/+esm";
import * as Plot from "https://cdn.jsdelivr.net/npm/@observablehq/plot@0.6/+esm";

// Load the data from the JSON files
const spts = await fetch("ispt.json").then((r) => r.json());
const geol = await fetch("geol.json").then((r) => r.json());

/** Colors and full names for the Hole Types in our AGS files */
const agsHoleTypeConfig = {
  SCP: { color: "#e31a1c", name: "Standard Penetration Test" },
  "CP+RO+RC": {
    color: "#1f78b4",
    name: "CPT + Rotary Open + Rotary Cored",
  },
  "CP+RC+RO": {
    color: "#1f78b4",
    name: "CPT + Rotary Cored + Rotary Open",
  },
  "CP+RO": { color: "#33a02c", name: "CPT + Rotary Open" },
  "RO+CP": { color: "#33a02c", name: "Rotary Open + CPT" },
  VC: { color: "#ff7f0e", name: "Vibro Core" },
};

// Create legend showing borehole types and colors
const legend = document.getElementById("legend");
legend.innerHTML = `
    <h4>Borehole Types</h4>
    ${Object.entries(agsHoleTypeConfig)
      .map(
        ([type, config]) => `
        <div class="legend-item">
          <div class="legend-color" style="background-color: ${config.color}"></div>
          <span>${config.name}</span>
        </div>
      `
      )
      .join("")}
  `;

// Initialize the map
const map = new maplibregl.Map({
  container: "map",
  style: {
    version: 8,
    sources: {
      osm: {
        type: "raster",
        tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        tileSize: 256,
        attribution: "© OpenStreetMap contributors",
      },
    },
    // projection: "equirectangular",
    layers: [
      {
        id: "osm",
        type: "raster",
        source: "osm",
      },
    ],
  },
  center: [114.21, 22.312], // Hong Kong coordinates
  zoom: 14,
  minZoom: 11,
});

// Add zoom and rotation controls to the map.
map.addControl(
  new maplibregl.NavigationControl({
    showZoom: true,
    showCompass: true,
  })
);

map.on("load", () => {
  const locationsId = "locations";

  map.addSource(locationsId, {
    type: "geojson",
    data: "./locations.geojson",
  });

  map.on("error", (e) => {
    console.error("Map error:", e);
  });

  map.addLayer({
    id: "locations-layer",
    type: "circle",
    source: locationsId,
    paint: {
      "circle-color": [
        "match",
        ["get", "HOLE_TYPE"],
        "SCP",
        agsHoleTypeConfig.SCP.color,
        "CP+RO+RC",
        agsHoleTypeConfig["CP+RO+RC"].color,
        "CP+RC+RO",
        agsHoleTypeConfig["CP+RC+RO"].color,
        "CP+RO",
        agsHoleTypeConfig["CP+RO"].color,
        "RO+CP",
        agsHoleTypeConfig["RO+CP"].color,
        "VC",
        agsHoleTypeConfig.VC.color,
        "#999999", // Default gray for any unexpected values
      ],
      "circle-radius": 4,
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1,
    },
  });

  map.on("click", "locations-layer", (event) => {
    const { coordinates } = event.features[0].geometry;
    const [lon, lat] = coordinates;
    const properties = event.features[0].properties;
    const { location_uid, HOLE_ID, HOLE_REM, HOLE_TYPE, HOLE_STAR, HOLE_ENDD } =
      properties;

    const div = document.createElement("div");
    div.innerHTML = `
<h3>Borehole: ${HOLE_ID || "Unknown"} </h3>
<dl>
    <dt>Type</dt>
    <dd>${agsHoleTypeConfig[HOLE_TYPE].name}</dd>

    <dt>Ground Level</dt>
    <dd>${properties.egm2008_ground_level_height?.toFixed(2) || "N/A"} m</dd>

    <dt>Coordinates:</dt>
    <dd>
      ${lon.toFixed(6)},
      ${lat.toFixed(6)}
    </dd>

    <dt>Date</dt>
    <dd>${HOLE_STAR}${HOLE_ENDD ? `- ${HOLE_ENDD}` : ""}</dd>

    <dt>Remarks</dt>
    <dd>${HOLE_REM ?? "None"}</dd>
        
</dl>`;

    const spt = spts[location_uid];
    const geology = geol[location_uid];

    const marks = [
      Plot.rect(geology, {
        y1: "depth_to_top",
        y2: "depth_to_base",
        fill: (d) => soilColor(d.GEOL_LEG),
        stroke: "white",
        title: (d) => `${d.depth_to_top} – ${d.depth_to_base}\n${d.GEOL_DESC}`,
        tip: true,
      }),
      Plot.text(geology, {
        y: (d) => d.depth_to_top + (d.depth_to_base - d.depth_to_top) / 2,
        text: (d) => d.GEOL_LEG,
        fill: "black",
      }),
      Plot.frame(),
    ];

    // Add line plot for SPT data on top of the soil column if present
    if (spt) {
      marks.push(
        Plot.line(spt, { x: "ISPT_NVAL", y: "ISPT_TOP", clip: true }),
        Plot.dot(spt, { x: "ISPT_NVAL", y: "ISPT_TOP", clip: true })
      );
    }

    const plot = Plot.plot({
      grid: true,
      style: {
        overflow: "visible",
      },
      y: {
        reverse: true,
      },
      // If there is spt data set the x (N value) domain
      ...(spt ? { x: { domain: [0, 100] } } : {}),
      width: spt ? 300 : 100,
      marks,
    });

    div.append(plot);

    new maplibregl.Popup().setLngLat(coordinates).setDOMContent(div).addTo(map);
  });

  map.on("mouseenter", "locations-layer", () => {
    map.getCanvas().style.cursor = "pointer";
  });

  map.on("mouseleave", "locations-layer", () => {
    map.getCanvas().style.cursor = "";
  });
});

const soilColors = {
  SAND: "#fdae61", // orange-yellow
  CLAY: "#8c510a", // brown
  SILT: "#ffffbf", // pale yellow
  GRAVEL: "#999999", // grey
  GRANITE: "#e6a0c4", // pink (common for granite in logs)
};

function soilColor(code) {
  if (code.startsWith("SAND")) return soilColors.SAND;
  if (code.startsWith("CLAY")) return soilColors.CLAY;
  if (code.startsWith("SILT")) return soilColors.SILT;
  if (code.startsWith("GRAV")) return soilColors.GRAVEL;
  if (code.startsWith("GRANITE")) return soilColors.GRANITE;
  return "black"; // fallback
}
