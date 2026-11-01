import {
  interpolatePlasma,
  interpolateYlGnBu,
  interpolateOrRd,
} from "https://cdn.jsdelivr.net/npm/d3-scale-chromatic@3/+esm";
import {
  scaleOrdinal,
  scaleSequential,
} from "https://cdn.jsdelivr.net/npm/d3-scale/+esm";
import { createOrdinalLegend, createSequentialLegend } from "./legend.js";

// Hong Kong Kai Tak: over the harbour south of the old runway, looking north-west along it, so
// the basemap labels read the right way up
const initialCameraView = {
  destination: Cesium.Cartesian3.fromDegrees(114.2215, 22.2966, 480),
  orientation: {
    heading: Cesium.Math.toRadians(320),
    pitch: Cesium.Math.toRadians(-16),
    roll: 0,
  },
};

const viewer = new Cesium.Viewer("map", {
  animation: false,
  timeline: false,
  fullscreenButton: false,
  vrButton: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  selectionIndicator: false,
  baseLayer: false, // No default Bing imagery from Cesium ion; the basemaps are added below
  msaaSamples: 4, // Anti-aliasing can help reduce visual artifacts
});

const { scene } = viewer;
const { globe } = scene;

// Cesium's double-click default tracks the clicked entity and flies the camera into it
viewer.screenSpaceEventHandler.removeInputAction(
  Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK,
);

viewer.camera.setView(initialCameraView);

// The Lands Department's 3D Spatial Data buildings, without a key. Its API answers bursts of
// requests with 429s, and CesiumJS sends up to 18 at a time to one server.
Cesium.RequestScheduler.requestsByServer["data.map.gov.hk:443"] = 4;
const buildings = await Cesium.Cesium3DTileset.fromUrl(
  "https://data.map.gov.hk/api/3d-data/3dsd/WGS84/building/tileset.json",
);
viewer.creditDisplay.addStaticCredit(
  new Cesium.Credit(
    '3D Spatial Data from <a href="https://www.landsd.gov.hk/">Lands Department</a>',
  ),
);

// Re:Earth's global terrain, with heights on the WGS84 ellipsoid; credits come with its layer.json
const worldTerrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
  "https://terrain.reearth.land/cesium-mesh/ellipsoid",
);
const ellipsoidTerrainProvider = new Cesium.EllipsoidTerrainProvider();

// Enable 3D terrain by default
viewer.terrainProvider = worldTerrainProvider;

const initAlpha = 0.7;

// Set initial opacity for buildings to match basemap
buildings.style = new Cesium.Cesium3DTileStyle({
  color: `color("white", ${initAlpha})`,
});
// Their texture is one flat dark blue-grey; paint them light, and keep the alpha the opacity
// slider sets through the style
buildings.customShader = new Cesium.CustomShader({
  fragmentShaderText: `
    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
      material.diffuse = vec3(0.92);
    }
  `,
});
scene.primitives.add(buildings);

// Configure globe for underground visualization
// https://cesium.com/blog/2020/06/16/visualizing-underground/
globe.translucency.enabled = true;
globe.depthTestAgainstTerrain = true;
globe.translucency.frontFaceAlpha = initAlpha;
globe.undergroundColor = Cesium.Color.fromCssColorString("#e8e4e0"); // Solid color to block view to opposite side of globe
globe.translucency.backFaceAlpha = 1.0; // Keep back face opaque so we don't see the opposite side of the globe
// The seams between the globe's back-face tiles show the stars and the background through the
// translucent ground as dark arcs; no sky box and a background the color of the underground hide
// them, and the sky atmosphere still covers the background above the horizon
scene.skyBox = undefined; // skyBox.show = false still draws the stars
scene.backgroundColor = globe.undergroundColor;

// So we can move the camera below the surface
scene.screenSpaceCameraController.enableCollisionDetection = false;

// Limit how far out the camera can zoom (in meters)
scene.screenSpaceCameraController.maximumZoomDistance = 50000;

// Create basemap imagery providers
const stamenTonerLayer = new Cesium.UrlTemplateImageryProvider({
  url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png",
  maximumLevel: 18,
  credit:
    '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
});

// The Lands Department's aerial photos, and satellite images further out, without a key. Its
// terms ask for its logo and copyright notice on the map face.
const landsdImageryLayer = viewer.imageryLayers.addImageryProvider(
  new Cesium.UrlTemplateImageryProvider({
    url: "https://mapapi.hkmapservice.gov.hk/gs/api/v1.0.0/xyz/imagery/WGS84/{z}/{x}/{y}.png",
    maximumLevel: 20,
    credit: new Cesium.Credit(
      '<img src="https://api.hkmapservice.gov.hk/mapapi/landsdlogo.jpg" alt="Lands Department" style="height: 22px; vertical-align: middle"> Aerial Photograph from Lands Department, Satellite Images from Landsat',
      true,
    ),
  }),
);
const stamenImageryLayer =
  viewer.imageryLayers.addImageryProvider(stamenTonerLayer);

// Start with Stamen Toner visible, hide satellite
landsdImageryLayer.show = false;

/** Colors and names for your borehole types (matches AGS HOLE_TYPE values in our data) */
const agsHoleTypes = {
  // CPT-based methods (blues)
  "CP+RO+RC": { label: "CPT + Rotary Open + Rotary Cored", color: "#1f77b4" },
  "CP+RC+RO": { label: "CPT + Rotary Cored + Rotary Open", color: "#4a9bd6" },
  "CP+RO": { label: "CPT + Rotary Open", color: "#6baed6" },
  "RO+CP": { label: "Rotary Open + CPT", color: "#9ecae1" },

  // Standard Penetration Testing (orange)
  SCP: { label: "Standard Penetration Test", color: "#ff7f0e" },

  // Rotary drilling methods (greens)
  RC: { label: "Rotary Cored", color: "#2ca02c" },
  RCG: { label: "Rotary Cored + Grab", color: "#52b352" },

  // Sampling methods (purples)
  VC: { label: "Vibro Core", color: "#9467bd" },
  Grab: { label: "Grab Sample", color: "#c5b0d5" },

  // Monitoring/instrumentation (reds/pinks)
  "IP+W+RCG": {
    label: "In-situ Piezometer + Water + Rotary Cored + Grab",
    color: "#d62728",
  },
  "IP+W": { label: "In-situ Piezometer + Water", color: "#ff6b6b" },

  // Excavation methods (brown)
  TP: { label: "Trial Pit", color: "#8c564b" },
};

// This I to VI grade scale is a little funky with in-between grades. That's the way it is in the source data
// Let's say it's open to interpretation, this is how I interpret it
const weatheringGrades = [
  { grade: "I", value: 0 },
  { grade: "II", value: 1 / 5 },
  { grade: "II/III", value: 1.5 / 5 },
  { grade: "III/II", value: 1.5 / 5 },
  { grade: "III", value: 2 / 5 },
  { grade: "III/IV", value: 2.5 / 5 },
  { grade: "IV/III", value: 2.5 / 5 },
  { grade: "IV", value: 3 / 5 },
  { grade: "IV/V", value: 3.5 / 5 },
  { grade: "V/IV", value: 3.5 / 5 },
  { grade: "V", value: 4 / 5 },
  { grade: "VI", value: 5 / 5 },
].map((d) => ({ ...d, color: interpolateYlGnBu(d.value) })); // Make a color scheme from the 0 - 5 scale

// https://observablehq.com/@d3/d3-scaleordinal
const holeTypeColorScale = scaleOrdinal()
  .domain(Object.keys(agsHoleTypes))
  .range(Object.values(agsHoleTypes).map((d) => d.color))
  .unknown("#999999");

const weatheringGradeColorScale = scaleOrdinal()
  .domain(weatheringGrades.map((d) => d.grade))
  .range(weatheringGrades.map((d) => d.color))
  .unknown("#999999");

// https://observablehq.com/@d3/sequential-scales
const sptScale = scaleSequential(interpolatePlasma).domain([0, 100]);

function onLoadLocations(dataSource) {
  // A copy: the loop adds cylinders to the live array, and must not walk into them
  for (const entity of [...dataSource.entities.values]) {
    const holeType = entity.properties.HOLE_TYPE.getValue();
    const holeId = entity.properties.HOLE_ID.getValue();

    const coordinates =
      entity.polyline && entity.polyline.positions
        ? entity.polyline.positions.getValue()
        : null;

    // Remove the default polyline rendering
    if (entity.polyline) {
      entity.polyline = undefined;
    }

    // Remove the default point rendering
    if (entity.marker) {
      entity.marker = undefined;
    }

    if (!coordinates || coordinates.length < 2) {
      console.warn(`No valid coordinates for hole ${holeId}`);
      continue;
    }

    const [top, bottom] = coordinates;
    const topCartographic = Cesium.Cartographic.fromCartesian(top);
    const bottomCartographic = Cesium.Cartographic.fromCartesian(bottom);

    const lon = topCartographic.longitude * Cesium.Math.DEGREES_PER_RADIAN;
    const lat = topCartographic.latitude * Cesium.Math.DEGREES_PER_RADIAN;
    const topElevation = topCartographic.height;
    const bottomElevation = bottomCartographic.height;

    const length = Math.abs(topElevation - bottomElevation);
    const centerElevation = (topElevation + bottomElevation) / 2;

    const color = Cesium.Color.fromCssColorString(holeTypeColorScale(holeType));

    dataSource.entities.add({
      position: Cesium.Cartesian3.fromDegrees(lon, lat, centerElevation),
      cylinder: new Cesium.CylinderGraphics({
        topRadius: 3,
        bottomRadius: 3,
        length,
        material: color.withAlpha(0.6),
        outline: true,
        outlineColor: color,
        numberOfVerticalLines: 0, // the default 16 make the cylinders read as striped cages
      }),
      properties: entity.properties,
      name: holeId,
    });
  }
}

function onLoadWeatheringData(dataSource) {
  for (const entity of dataSource.entities.values) {
    const wetheringGrade = entity.properties?.WETH_GRAD?.getValue();
    const color = weatheringGradeColorScale(wetheringGrade);

    if (entity.billboard) {
      entity.billboard = undefined;
      // Add a point for point geometries
      entity.point = new Cesium.PointGraphics({
        pixelSize: 4,
        color: Cesium.Color.fromCssColorString(color),
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 1,
        disableDepthTestDistance: Number.POSITIVE_INFINITY, // show through the terrain
      });
    }

    if (entity.polyline) {
      entity.polyline.material = Cesium.Color.fromCssColorString(color);
      entity.polyline.width = 7;
      entity.polyline.clampToGround = false;
    }
  }
}

function onLoadSptData(dataSource) {
  for (const entity of dataSource.entities.values) {
    const sptNValue = entity.properties?.ISPT_NVAL?.getValue();
    const color = sptScale(sptNValue);

    // remove default pin for points
    if (entity.billboard) {
      entity.billboard = undefined;
    }
    if (!sptNValue) {
      continue;
    }

    entity.point = new Cesium.PointGraphics({
      pixelSize: 4,
      color: Cesium.Color.fromCssColorString(color),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 0,
      heightReference: Cesium.HeightReference.NONE,
      disableDepthTestDistance: Number.POSITIVE_INFINITY, // show through the terrain
    });
  }
}

const datasets = [
  {
    id: "locations",
    label: "Borehole Locations",
    enabled: false,
    dataSource: null,
    legendElement: createOrdinalLegend({
      scale: holeTypeColorScale,
      title: "Hole Types",
      config: agsHoleTypes,
    }),
    onLoad: onLoadLocations,
  },
  {
    id: "weathering",
    label: "Weathering",
    enabled: false,
    dataSource: null,
    legendElement: createOrdinalLegend({
      scale: weatheringGradeColorScale,
      title: "Weathering Grade",
      config: null,
    }),
    onLoad: onLoadWeatheringData,
  },
  {
    id: "ispt",
    label: "Standard Penetration Test",
    enabled: true,
    dataSource: null,
    legendElement: createSequentialLegend({
      scale: sptScale,
      title: "SPT N Value",
    }),
    onLoad: onLoadSptData,
  },
  /*   {
    id: "core",
    label: "Core",
    enabled: false,
    dataSource: null,
    legendElement: createSequentialLegend({
      scale: coreRqdScale,
      title: "Core RQD",
    }),
    onLoad: onLoadCoreData,
  }, */
];

function loadDataset(dataset) {
  return fetch(`${dataset.id}.geojson`)
    .then((response) => response.json())
    .then((geojson) => {
      return Cesium.GeoJsonDataSource.load(geojson, {
        clampToGround: false,
      });
    })
    .then((dataSource) => {
      // Store reference to the loaded data source for later access (visibility toggling, styling)
      dataset.dataSource = dataSource;

      dataset.onLoad(dataSource);

      dataSource.show = dataset.enabled;

      viewer.dataSources.add(dataSource);

      return dataSource;
    })
    .catch((error) => {
      console.error(`Error loading ${dataset.id}.geojson:`, error);
    });
}

function updateLegendDisplay() {
  for (const dataset of datasets) {
    if (dataset.legendElement) {
      dataset.legendElement.style.display = dataset.enabled ? "block" : "none";
    }
  }
}

function generateDatasetControls() {
  const controlsSection = document.getElementById("datasets-body");

  const controlsHTML = datasets
    .map(
      (dataset) => `
  <div class="checkbox-item">
    <input type="checkbox" id="${dataset.id}-toggle" ${
      dataset.enabled ? "checked" : ""
    }>
    <label for="${dataset.id}-toggle">${dataset.label}</label>
  </div>
`,
    )
    .join("");

  controlsSection.innerHTML = controlsSection.innerHTML + controlsHTML;

  // Add event listeners to checkboxes
  for (const dataset of datasets) {
    const checkbox = document.getElementById(`${dataset.id}-toggle`);
    checkbox.addEventListener("change", (event) => {
      dataset.enabled = event.target.checked;
      if (dataset.dataSource) {
        dataset.dataSource.show = dataset.enabled;
      }
      updateLegendDisplay();
    });
  }
}

generateDatasetControls();

// Add legend elements to DOM and set initial visibility
const legendDetailsEl = document.querySelector("#legend-details");
for (const dataset of datasets) {
  dataset.legendElement.style.display = dataset.enabled ? "block" : "none";
  legendDetailsEl.appendChild(dataset.legendElement);
}

// Load all datasets
Promise.allSettled(datasets.map((dataset) => loadDataset(dataset))).then(
  (results) => {
    for (const result of results) {
      if (result.status === "rejected") {
        console.warn("Failed to load dataset:", result.reason);
      }
    }
  },
);

// ── Borehole selection ───────────────────────────────────────────────────────
// Clicking a borehole, an SPT value or a weathering interval opens a panel with that hole's SPT
// N values against depth over its weathering grades, all from the data already loaded
const boreholePanel = document.querySelector("#borehole");
const boreholeMeta = document.querySelector("#borehole-meta");
const boreholeChart = document.querySelector("#borehole-chart");
const isMobile = window.matchMedia("(max-width: 680px)").matches;

const datasetById = Object.fromEntries(datasets.map((d) => [d.id, d]));

// All three datasets key their rows to the hole with location_uid; HOLE_ID repeats across projects
function locationUidOf(entity) {
  const properties = entity?.properties;
  return properties?.hasProperty("location_uid")
    ? properties.location_uid.getValue()
    : null;
}

function entitiesOf(datasetId, locationUid) {
  return (datasetById[datasetId].dataSource?.entities.values ?? []).filter(
    (entity) => locationUidOf(entity) === locationUid,
  );
}

const get = (entity, key) => entity.properties[key]?.getValue() ?? null;

function boreholeData(locationUid) {
  const cylinder = entitiesOf("locations", locationUid).find((e) => e.cylinder);
  const spt = entitiesOf("ispt", locationUid)
    .filter((e) => get(e, "ISPT_NVAL") !== null)
    .map((e) => ({
      depth: get(e, "ISPT_TOP"),
      n: get(e, "ISPT_NVAL"),
      color: sptScale(get(e, "ISPT_NVAL")),
    }));
  const layers = entitiesOf("weathering", locationUid)
    .filter(
      (e) =>
        e.polyline &&
        get(e, "WETH_GRAD") !== null &&
        get(e, "depth_to_base") !== null,
    )
    .map((e) => ({
      top: get(e, "depth_to_top"),
      bottom: get(e, "depth_to_base"),
      grade: get(e, "WETH_GRAD"),
      color: weatheringGradeColorScale(get(e, "WETH_GRAD")),
    }));
  const depth = Math.max(
    cylinder?.cylinder.length.getValue() ?? 0,
    ...spt.map((d) => d.depth),
    ...layers.map((d) => d.bottom),
  );
  return { cylinder, spt, layers, depth };
}

function boreholeMetaItems(cylinder, depth) {
  const type = cylinder && get(cylinder, "HOLE_TYPE");
  const start = cylinder && get(cylinder, "HOLE_STAR");
  const end = cylinder && get(cylinder, "HOLE_ENDD");
  return [
    agsHoleTypes[type]?.label ?? type,
    start && end && start !== end ? `${start} – ${end}` : start,
    depth > 0 && `${depth.toFixed(1)} m deep`,
  ]
    .filter(Boolean)
    .map((text) => {
      const span = document.createElement("span");
      span.textContent = text;
      return span;
    });
}

let selectedLocationUid = null;
let restoreHighlight = [];

function highlightBorehole(locationUid) {
  for (const entity of entitiesOf("locations", locationUid)) {
    if (!entity.cylinder) continue;
    const { material } = entity.cylinder;
    entity.cylinder.material = Cesium.Color.WHITE.withAlpha(0.9);
    restoreHighlight.push(() => (entity.cylinder.material = material));
  }
  for (const entity of entitiesOf("ispt", locationUid)) {
    if (!entity.point) continue;
    const { pixelSize } = entity.point;
    entity.point.pixelSize = 8;
    restoreHighlight.push(() => (entity.point.pixelSize = pixelSize));
  }
  for (const entity of entitiesOf("weathering", locationUid)) {
    if (!entity.polyline) continue;
    const { width } = entity.polyline;
    entity.polyline.width = 12;
    restoreHighlight.push(() => (entity.polyline.width = width));
  }
}

function clearHighlight() {
  for (const restore of restoreHighlight) restore();
  restoreHighlight = [];
}

async function showBoreholePanel(locationUid, holeId) {
  const { cylinder, spt, layers, depth } = boreholeData(locationUid);
  boreholePanel.querySelector(".panel-title").textContent = holeId;
  boreholePanel.querySelector("details").open = true;
  boreholePanel.hidden = false;
  boreholeMeta.replaceChildren(...boreholeMetaItems(cylinder, depth));
  boreholeChart.replaceChildren();
  if (spt.length === 0 && layers.length === 0) {
    const p = document.createElement("p");
    p.className = "borehole-empty";
    p.textContent = "No SPT or weathering data for this hole";
    boreholeChart.replaceChildren(p);
    return;
  }
  const { renderBoreholeChart } = await import("./borehole-chart.js");
  if (selectedLocationUid !== locationUid) {
    return; // another hole was clicked meanwhile
  }
  renderBoreholeChart(
    boreholeChart,
    { spt, layers, depth },
    { width: isMobile ? 200 : 260 },
  );
}

viewer.selectedEntityChanged.addEventListener((entity) => {
  const locationUid = locationUidOf(entity);
  if (locationUid === selectedLocationUid) {
    return;
  }
  clearHighlight();
  selectedLocationUid = locationUid;
  if (locationUid === null) {
    boreholePanel.hidden = true;
    return;
  }
  highlightBorehole(locationUid);
  showBoreholePanel(locationUid, get(entity, "HOLE_ID") ?? locationUid);
});

// Globe opacity slider (also controls building opacity)
document.querySelector("#alpha").addEventListener("input", (event) => {
  const alpha = event.target.valueAsNumber;
  globe.translucency.frontFaceAlpha = alpha;

  // Update building opacity to match
  buildings.style = new Cesium.Cesium3DTileStyle({
    color: `color("white", ${alpha})`,
  });
});

// 3D buildings toggle
document
  .querySelector("#buildings-toggle")
  .addEventListener("change", (event) => {
    buildings.show = event.target.checked;
  });

// 3D terrain toggle
document
  .querySelector("#terrain-toggle")
  .addEventListener("change", (event) => {
    viewer.terrainProvider = event.target.checked
      ? worldTerrainProvider
      : ellipsoidTerrainProvider;
  });

// Basemap switch: one of its buttons is pressed at a time
const basemapButtons = document.querySelectorAll("[data-basemap]");
for (const button of basemapButtons) {
  button.addEventListener("click", () => {
    const satellite = button.dataset.basemap === "satellite";
    landsdImageryLayer.show = satellite;
    stamenImageryLayer.show = !satellite;
    for (const other of basemapButtons) {
      other.setAttribute("aria-pressed", String(other === button));
    }
  });
}

// Reset camera button
document.querySelector("#reset-camera").addEventListener("click", () => {
  viewer.camera.flyTo(initialCameraView);
});

// Log camera position button
document.querySelector("#log-camera")?.addEventListener("click", () => {
  const camera = viewer.camera;
  const position = camera.positionCartographic;

  console.log("Current camera position:");
  console.log(
    JSON.stringify(
      {
        lon: position.longitude * Cesium.Math.DEGREES_PER_RADIAN,
        lat: position.latitude * Cesium.Math.DEGREES_PER_RADIAN,
        height: position.height,
        heading: camera.heading,
        pitch: camera.pitch,
        roll: camera.roll,
      },
      null,
      2,
    ),
  );

  console.log("\nCopy this for initialCameraView:");
  console.log(`const initialCameraView = {
  destination: Cesium.Cartesian3.fromDegrees(${
    position.longitude * Cesium.Math.DEGREES_PER_RADIAN
  }, ${position.latitude * Cesium.Math.DEGREES_PER_RADIAN}, ${position.height}),
  orientation: {
    heading: ${camera.heading},
    pitch: ${camera.pitch},
    roll: ${camera.roll},
  },
};`);
});
