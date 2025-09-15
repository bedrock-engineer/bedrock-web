import {
  interpolateYlGnBu,
  interpolateCividis,
  schemeSet3,
} from "https://cdn.jsdelivr.net/npm/d3-scale-chromatic@3/+esm";
import {
  scaleOrdinal,
  scaleSequential,
} from "https://cdn.jsdelivr.net/npm/d3-scale/+esm";
import { createSequentialLegend, createOrdinalLegend } from "./legend.js";

// Your access token can be found at: https://ion.cesium.com/tokens.
// Replace `your_access_token` with your Cesium ion access token.
// Cesium.Ion.defaultAccessToken = null;

// Initialize the Cesium Viewer in the HTML element with the `map` ID.
const viewer = new Cesium.Viewer("map", {
  terrain: Cesium.Terrain.fromWorldTerrain(), // https://cesium.com/platform/cesium-ion/content/#cesium-world-terrain
  animation: false,
  timeline: false,
  fullscreenButton: false,
  vrButton: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  geocoder: false,
  homeButton: false,
});

const osmBuildings = await Cesium.createOsmBuildingsAsync();
viewer.scene.primitives.add(osmBuildings);

// https://cesium.com/blog/2020/06/16/visualizing-underground/
const initAlpha = 0.7;

const { globe } = viewer.scene;

// Configure globe for underground visualization
globe.translucency.enabled = true;
globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
  200, // The lower bound of the camera range.
  0.1, // Minimum alpha at close distance
  800, // The upper bound of the camera range.
  initAlpha //  Maximum alpha at far distance
);
globe.translucency.backFaceAlpha = 1.0; // Keep back face opaque
globe.undergroundColor = Cesium.Color.GREY;
// Set the camera to look at out data in Hong Kong
viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(114.20685352, 22.23496, 1325),
  orientation: {
    heading: 0.0319,
    pitch: -0.19935,
    roll: 6.28318,
  },
});
// So we can move the camera below the surface
viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;

const terrainProvider = new Cesium.UrlTemplateImageryProvider({
  url: "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}.png",
  // url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}.png",
  maximumLevel: 18,
  credit:
    '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
});
const imageryLayer = viewer.imageryLayers.addImageryProvider(terrainProvider);

/** Colors and names for your borehole types (matches AGS HOLE_TYPE values in our data) */
const agsHoleTypes = {
  "CP+RO+RC": "CPT + Rotary Open + Rotary Cored",
  "CP+RC+RO": "CPT + Rotary Cored + Rotary Open",
  "CP+RO": "CPT + Rotary Open",
  "RO+CP": "Rotary Open + CPT",
  SCP: "Standard Penetration Test",
  VC: "Vibro Core",
  RC: "Rotary Cored",
  Grab: "Grab Sample",
  RCG: "Rotary Cored + Grab",
  "IP+W+RCG": "In-situ Piezometer + Water + Rotary Cored + Grab",
  "IP+W": "In-situ Piezometer + Water",
  TP: "Trial Pit",
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
  .range(schemeSet3)
  .unknown("#999999");

const weatheringGradeColorScale = scaleOrdinal()
  .domain(weatheringGrades.map((d) => d.grade))
  .range(weatheringGrades.map((d) => d.color));

// https://observablehq.com/@d3/sequential-scales
const sptScale = scaleSequential(interpolateCividis).domain([0, 100]);

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
    });
  }
}

function onLoadWeatheringData(dataSource) {
  console.log("Loaded weathering data:", dataSource.entities.values.length);

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
    // remove default pin for points
    if (entity.billboard) {
      entity.billboard = undefined;
    }
    if (!sptNValue) continue;

    entity.point = new Cesium.PointGraphics({
      pixelSize: 4,
      color: Cesium.Color.fromCssColorString(color),
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 1,
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
];

function loadDataset(dataset) {
  return Cesium.GeoJsonDataSource.load(`${dataset.id}.geojson`, {
    clampToGround: false,
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
const legendEl = document.querySelector("#legend");
for (const dataset of datasets) {
  dataset.legendElement.style.display = dataset.enabled ? "block" : "none";
  legendEl.appendChild(dataset.legendElement);
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

// Globe opacity slider
document.querySelector("#alpha").addEventListener("input", (event) => {
  const alpha = event.target.valueAsNumber;

  // Update translucency using distance-based approach
  globe.translucency.frontFaceAlphaByDistance.nearValue = alpha;
  globe.translucency.frontFaceAlphaByDistance.farValue = alpha;
  // imageryLayer.alpha = alpha;
});

// 3D buildings toggle
document
  .querySelector("#buildings-toggle")
  .addEventListener("change", (event) => {
    osmBuildings.show = event.target.checked;
  });
