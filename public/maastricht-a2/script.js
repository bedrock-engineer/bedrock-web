import { scaleOrdinal } from "https://cdn.jsdelivr.net/npm/d3-scale/+esm";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZTc4NGUwYi1hMGQ1LTQ0YmEtYThhMi03ZDFkYjhhYzY0ZGEiLCJpZCI6Mjc0NDQ3LCJpYXQiOjE3NjIyNTAwMDJ9._znSCj5J_BQcLnzZL1DGHw7E1cOqzZYENzl437ZY_5A";

// Initialize the Cesium Viewer in the HTML element with the `map` ID.
const mapElementId = "map";
const viewer = new Cesium.Viewer(mapElementId, {
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
window.viewer = viewer;

const initialCameraView = {
  destination: Cesium.Cartesian3.fromRadians(
    0.0999658895284124,
    0.887051646264426,
    1875.7564802593806,
  ),
  orientation: {
    heading: 5.954791964080976,
    pitch: -0.5513326731507764,
    roll: 6.283176422033106,
  },
};

viewer.camera.setView(initialCameraView);

const undefinedColor = "#CCCCCC";
const soilTypeColors = {
  "niet gedefinieerd": undefinedColor,
  zwakZandigSilt: "#3785a4",
  siltigGrind: "#547e9c",
  sterkZandigSilt: "#6e9386",
  zwakZandigGrind: "#8b8b7f",
  sterkZandigeKlei: "#999e51",
  klei: "#578E57",
  zwakZandigeKlei: "#789654",
  zwakZandigSiltMetGrind: "#3383a7",
};

const soilTypeColorScale = scaleOrdinal()
  .domain(Object.keys(soilTypeColors))
  .range(Object.values(soilTypeColors))
  .unknown(undefinedColor);

// https://cesium.com/blog/2020/06/16/visualizing-underground/
const initAlpha = 0.2;

const { globe } = viewer.scene;

// Configure globe for underground visualization
globe.translucency.enabled = true;
globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
  200, // The lower bound of the camera range.
  0.1, // Minimum alpha at close distance
  800, // The upper bound of the camera range.
  initAlpha, //  Maximum alpha at far distance
);
globe.translucency.backFaceAlpha = 1.0; // Keep back face opaque
globe.undergroundColor = Cesium.Color.GREY;

// So we can move the camera below the surface
viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;

// Handle entity selection - highlight selected entities
let previousSelection = null;
viewer.selectedEntityChanged.addEventListener((selectedEntity) => {
  // Restore previous selection to original color
  if (previousSelection) {
    const prevProps = previousSelection.properties;
    if (prevProps?.geotechnicalSoilName) {
      const prevSoilName = prevProps.geotechnicalSoilName.getValue();
      const prevColor = Cesium.Color.fromCssColorString(
        soilTypeColorScale(prevSoilName),
      );

      if (previousSelection.cylinder) {
        previousSelection.cylinder.material = prevColor;
      }
      if (previousSelection.ellipsoid) {
        previousSelection.ellipsoid.material = prevColor;
      }
    }
  }

  if (selectedEntity) {
    const highlightColor = Cesium.Color.YELLOW;

    if (selectedEntity.cylinder) {
      selectedEntity.cylinder.material = highlightColor;
    }
    if (selectedEntity.ellipsoid) {
      selectedEntity.ellipsoid.material = highlightColor;
    }

    previousSelection = selectedEntity;
  } else {
    previousSelection = null;
  }
});

function linestringToCylinder(coordinates) {
  const [top, bottom] = coordinates;
  const topCartographic = Cesium.Cartographic.fromCartesian(top);
  const bottomCartographic = Cesium.Cartographic.fromCartesian(bottom);

  const lon = topCartographic.longitude * Cesium.Math.DEGREES_PER_RADIAN;
  const lat = topCartographic.latitude * Cesium.Math.DEGREES_PER_RADIAN;
  const topElevation = topCartographic.height;
  const bottomElevation = bottomCartographic.height;

  const length = Math.abs(topElevation - bottomElevation);
  const centerElevation = (topElevation + bottomElevation) / 2;

  const position = Cesium.Cartesian3.fromDegrees(lon, lat, centerElevation);

  return { length, position };
}

function onLoadBoreholes(dataSource) {
  console.log(
    "Loaded interpreted borehole data",
    dataSource.entities.values.length,
  );

  for (const entity of dataSource.entities.values) {
    const geotechnicalSoilName =
      entity.properties.geotechnicalSoilName.getValue();
    const locationUid = entity.properties.location_uid.getValue();

    const color = Cesium.Color.fromCssColorString(
      soilTypeColorScale(geotechnicalSoilName),
    );

    // // Check if entity is a point or billboard
    if (
      entity.point ||
      entity.billboard ||
      (entity.position && !entity.polyline)
    ) {
      const position = entity.position?.getValue();

      if (position) {
        // Remove the default point/billboard rendering
        entity.billboard = undefined;
        entity.point = undefined;

        // entity.point = new Cesium.PointGraphics({
        //   pixelSize: 16,
        //   color,
        //   outlineColor: Cesium.Color.WHITE,
        //   outlineWidth: 1,
        // });
      }
      //   continue;
    }

    // Check if entity is a polyline
    if (entity.polyline) {
      const coordinates = entity.polyline.positions.getValue();

      if (!coordinates || coordinates.length < 2) {
        console.warn(
          `Polyline with less than 2 coordinates for ${locationUid}`,
        );
        continue;
      }

      // Remove the default polyline rendering
      entity.polyline = undefined;

      // Add cylinder for polyline
      const { length, position } = linestringToCylinder(coordinates);

      dataSource.entities.add({
        position,
        cylinder: {
          topRadius: 5,
          bottomRadius: 5,
          length,
          material: color,
          fill: true,
          outline: false,
        },
        properties: entity.properties,
        name: `${locationUid} - ${geotechnicalSoilName}`,
      });
      continue;
    }

    // console.warn(
    //   `Entity ${locationUid} has neither point nor polyline geometry`,
    // );
  }
}

const datasets = [
  {
    id: "boreholes",
    label: "Interpreted boreholes",
    enabled: true,
    dataSource: null,
    legendElement: createOrdinalLegend({
      scale: soilTypeColorScale,
      title: "Soil Types",
    }),
    onLoad: onLoadBoreholes,
  },
];

function loadDataset(dataset) {
  return Cesium.GeoJsonDataSource.load(`${dataset.id}.geojson`, {
    clampToGround: false,
    stroke: Cesium.Color.YELLOW,
    strokeWidth: 3,
  })
    .then((dataSource) => {
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

Promise.allSettled(datasets.map((dataset) => loadDataset(dataset))).then(
  (results) => {
    for (const result of results) {
      if (result.status === "rejected") {
        console.warn("Failed to load dataset:", result.reason);
      }
    }
  },
);

// Globe opacity slider
document.querySelector("#alpha")?.addEventListener("input", (event) => {
  const alpha = event.target.valueAsNumber;

  // Update translucency using distance-based approach
  globe.translucency.frontFaceAlphaByDistance.nearValue = alpha;
  globe.translucency.frontFaceAlphaByDistance.farValue = alpha;
  // imageryLayer.alpha = alpha;
});

function createOrdinalLegend({ scale, title, config = null }) {
  const container = document.createElement("section");
  container.classList.add("legend-section");

  const titleEl = document.createElement("h4");
  titleEl.textContent = title;
  container.appendChild(titleEl);

  const itemsDiv = document.createElement("div");
  scale.domain().forEach((value) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    // Use full name from config if available, otherwise use the value
    const displayName = config?.[value] ? config[value] : value;

    item.innerHTML = `
      <div class="legend-circle" style="background-color: ${scale(
        value,
      )}"></div>
      <span>${displayName}</span>
    `;
    itemsDiv.appendChild(item);
  });

  container.appendChild(itemsDiv);
  return container;
}

// Add legends to the DOM
const legendContainer = document.querySelector("#legend");
for (const dataset of datasets) {
  if (dataset.legendElement) {
    legendContainer.appendChild(dataset.legendElement);
    dataset.legendElement.style.display = dataset.enabled ? "block" : "none";
  }
}
