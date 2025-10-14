import bbox from "https://cdn.jsdelivr.net/npm/@turf/bbox@7/+esm";
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

// Your access token can be found at: https://ion.cesium.com/tokens.
// Replace `your_access_token` with your Cesium ion access token.
// Cesium.Ion.defaultAccessToken = null;

// Hong Kong Kai Tak initial camera view
const initialCameraView = {
  destination: Cesium.Cartesian3.fromDegrees(
    114.19749996664763,
    22.336721619536476,
    653.3477715430049
  ),
  orientation: {
    heading: 3.115321511892013,
    pitch: -0.24478081612082314,
    roll: 6.283098181620492,
  },
};

// Initialize the Cesium Viewer in the HTML element with the `map` ID.
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
  msaaSamples: 4, // Anti-aliasing can help reduce visual artifacts
});

// Set initial camera position immediately
viewer.camera.setView(initialCameraView);

const osmBuildings = await Cesium.createOsmBuildingsAsync();

// Create terrain providers
const worldTerrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
  Cesium.IonResource.fromAssetId(1) // Asset 1 = Cesium World Terrain
);
const ellipsoidTerrainProvider = new Cesium.EllipsoidTerrainProvider();

// Enable 3D terrain by default
viewer.terrainProvider = worldTerrainProvider;

const initAlpha = 0.7;

// Set initial opacity for buildings to match basemap
osmBuildings.style = new Cesium.Cesium3DTileStyle({
  color: `color("white", ${initAlpha})`,
});
viewer.scene.primitives.add(osmBuildings);

// Configure globe for underground visualization
// https://cesium.com/blog/2020/06/16/visualizing-underground/
const { globe } = viewer.scene;
globe.translucency.enabled = true;
globe.depthTestAgainstTerrain = true;
globe.translucency.frontFaceAlpha = initAlpha;
globe.undergroundColor = Cesium.Color.fromCssColorString("#e8e4e0"); // Solid color to block view to opposite side of globe
globe.translucency.backFaceAlpha = 1.0; // Keep back face opaque so we don't see the opposite side of the globe

// So we can move the camera below the surface
viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;

// Limit how far out the camera can zoom (in meters)
viewer.scene.screenSpaceCameraController.maximumZoomDistance = 50000;

// Create basemap imagery providers
const stamenTonerLayer = new Cesium.UrlTemplateImageryProvider({
  url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png",
  maximumLevel: 18,
  credit:
    '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
});

// Get reference to the default Bing imagery layer (index 0)
const defaultImageryLayer = viewer.imageryLayers.get(0);

// Add Stamen layer on top and store reference
const customImageryLayer =
  viewer.imageryLayers.addImageryProvider(stamenTonerLayer);

// Start with Stamen Toner visible, hide satellite
defaultImageryLayer.show = false;
customImageryLayer.show = true;

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
  .range(weatheringGrades.map((d) => d.color));

// https://observablehq.com/@d3/sequential-scales
const sptScale = scaleSequential(interpolatePlasma).domain([0, 100]);

const coreRqdScale = scaleSequential(interpolateOrRd).domain([0, 100]);

function onLoadLocations(dataSource) {
  console.log("Loaded location data", dataSource.entities.values.length);

  for (const entity of dataSource.entities.values) {
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
      return;
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
        length: length,
        fill: false,
        outline: true,
        outlineColor: color,
        outlineWidth: 1,
        outlineOpacity: 0.5,
      }),
      properties: entity.properties,
      name: holeId,
      // Disable depth testing so boreholes always show through terrain
      disableDepthTestDistance: Number.POSITIVE_INFINITY,
    });
  }
}

function onLoadWeatheringData(dataSource) {
  console.log("Loaded weathering data:", dataSource.entities.values.length);

  for (const entity of dataSource.entities.values) {
    const wetheringGrade = entity.properties?.WETH_GRAD?.getValue();
    const color = weatheringGradeColorScale(wetheringGrade);

    // Disable depth testing so weathering data always shows through terrain
    entity.disableDepthTestDistance = Number.POSITIVE_INFINITY;

    if (entity.billboard) {
      entity.billboard = undefined;
      // Add a point for point geometries
      entity.point = new Cesium.PointGraphics({
        pixelSize: 4,
        color: Cesium.Color.fromCssColorString(color),
        outlineColor: Cesium.Color.WHITE,
        outlineWidth: 1,
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
  console.log("Loaded ispt data:", dataSource.entities.values.length);

  for (const entity of dataSource.entities.values) {
    const sptNValue = entity.properties?.ISPT_NVAL?.getValue();
    const color = sptScale(sptNValue);

    // Disable depth testing so SPT data always shows through terrain
    entity.disableDepthTestDistance = Number.POSITIVE_INFINITY;

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
    });
  }
}

function onLoadCoreData(dataSource) {
  console.log("Loaded core data:", dataSource.entities.values.length);

  for (const entity of dataSource.entities.values) {
    const coreRqdValue = entity.properties?.CORE_RQD?.getValue();
    const color = coreRqdValue ? coreRqdScale(coreRqdValue) : "#333333";

    entity.disableDepthTestDistance = Number.POSITIVE_INFINITY;

    if (entity.billboard) {
      entity.billboard = undefined;
    }
    console.log(coreRqdValue, color);
    entity.point = new Cesium.PointGraphics({
      pixelSize: 4,
      color: Cesium.Color.fromCssColorString(color),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 0,
      heightReference: Cesium.HeightReference.NONE,
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
  // First fetch the GeoJSON to calculate bbox
  return fetch(`${dataset.id}.geojson`)
    .then((response) => response.json())
    .then((geojson) => {
      // Log bounding box for locations dataset (for reference)
      if (dataset.id === "locations") {
        const [minLon, minLat, maxLon, maxLat] = bbox(geojson);
        console.log("Location data bounds:", {
          west: minLon,
          south: minLat,
          east: maxLon,
          north: maxLat,
        });
      }

      // Now load with Cesium
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
  const controlsSection = document.getElementById("datasets");

  const controlsHTML = datasets
    .map(
      (dataset) => `
  <div class="checkbox-item">
    <input type="checkbox" id="${dataset.id}-toggle" ${
        dataset.enabled ? "checked" : ""
      }>
    <label for="${dataset.id}-toggle">${dataset.label}</label>
  </div>
`
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
  }
);

// Globe opacity slider (also controls building opacity)
document.querySelector("#alpha").addEventListener("input", (event) => {
  const alpha = event.target.valueAsNumber;
  globe.translucency.frontFaceAlpha = alpha;

  // Update building opacity to match
  osmBuildings.style = new Cesium.Cesium3DTileStyle({
    color: `color("white", ${alpha})`,
  });
});

// 3D buildings toggle
document
  .querySelector("#buildings-toggle")
  .addEventListener("change", (event) => {
    osmBuildings.show = event.target.checked;
  });

// 3D terrain toggle
document
  .querySelector("#terrain-toggle")
  .addEventListener("change", (event) => {
    viewer.terrainProvider = event.target.checked
      ? worldTerrainProvider
      : ellipsoidTerrainProvider;
  });

// Basemap toggle
document
  .querySelector("#basemap-toggle")
  .addEventListener("change", (event) => {
    if (event.target.checked) {
      // Show satellite (default Bing layer)
      defaultImageryLayer.show = true;
      customImageryLayer.show = false;
    } else {
      // Show Stamen Toner
      defaultImageryLayer.show = false;
      customImageryLayer.show = true;
    }
  });

// Reset camera button
document.querySelector("#reset-camera").addEventListener("click", () => {
  viewer.camera.flyTo(initialCameraView);
});

// Log camera position button (commented out for production)
/* document.querySelector("#log-camera").addEventListener("click", () => {
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
      2
    )
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
}); */
