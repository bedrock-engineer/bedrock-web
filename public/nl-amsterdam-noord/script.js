import { scaleOrdinal } from "https://cdn.jsdelivr.net/npm/d3-scale/+esm";
import {
  createPanel,
  createLegend,
  createBasemapOpacitySlider,
  createClippingControlsZ,
} from "./components.js";

Cesium.Ion.defaultAccessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ZTc4NGUwYi1hMGQ1LTQ0YmEtYThhMi03ZDFkYjhhYzY0ZGEiLCJpZCI6Mjc0NDQ3LCJpYXQiOjE3NjIyNTAwMDJ9._znSCj5J_BQcLnzZL1DGHw7E1cOqzZYENzl437ZY_5A";

const viewer = new Cesium.Viewer("map", {
  // Global, with heights on the WGS84 ellipsoid; credits come with its layer.json
  terrain: new Cesium.Terrain(
    Cesium.CesiumTerrainProvider.fromUrl(
      "https://terrain.reearth.land/cesium-mesh/ellipsoid",
    ),
  ),
  animation: false,
  timeline: false,
  fullscreenButton: false,
  imageryProvider: false, // no default Bing layer
  vrButton: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  geocoder: false,
  homeButton: false,
});
const { scene, camera } = viewer;
const { globe } = scene;

// Performance flags, turn all extra processing off
scene.pickTranslucentDepth = false;
scene.postProcessStages.fxaa.enabled = false;
scene.postProcessStages.ambientOcclusion.enabled = false;
scene.postProcessStages.bloom.enabled = false;
scene.fog.enabled = false;
scene.highDynamicRange = false;
scene.msaaSamples = 1;
scene.skyBox = undefined; // skyBox.show = false still draws the stars
scene.sun.show = false;
scene.moon.show = false;
globe.showGroundAtmosphere = false;

// The default SunLight follows the clock, so pin it to a summer midday in Amsterdam
viewer.clock.currentTime = Cesium.JulianDate.fromIso8601(
  "2025-06-21T11:40:00Z",
);
viewer.clock.shouldAnimate = false;

// To increase FPS
// viewer.resolutionScale = 1;

// Overhoeks, Amsterdam initial camera view: west of the EYE, looking east at the towers
const initialCameraView = {
  destination: Cesium.Cartesian3.fromDegrees(4.89553, 52.38484, 260),
  orientation: {
    heading: Cesium.Math.toRadians(93),
    pitch: Cesium.Math.toRadians(-25),
    roll: 0,
  },
};

camera.setView(initialCameraView);

const nlRectangle = Cesium.Rectangle.fromDegrees(3, 50.7, 7.3, 53.6);

const bgt = new Cesium.WebMapTileServiceImageryProvider({
  url: "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?",
  layer: "standaard",
  style: "default",
  format: "image/png",
  tileMatrixSetID: "EPSG:3857",
  rectangle: nlRectangle,
  minimumLevel: 7,
  maximumLevel: 18,
  credit: new Cesium.Credit(
    'BGT (Basisregistratie Grootschalige Topografie) - <a href="https://www.pdok.nl/introductie/-/article/basisregistratie-grootschalige-topografie-bgt-">PDOK</a>',
  ),
});
viewer.imageryLayers.addImageryProvider(bgt);

// ── State  ─────────────────────────────────────────────────────────────────
let voxelOpacity = 1;
let activeLayer = "lithology";

// ── Color scales ──────────────────────────────────────────────────────────

const soilColors = {
  Anthropogenic: "#c7c7c7",
  "Organic soils / Very soft clay": "#9d4e40",
  "Clays: silty clay to clay": "#009200",
  "Silt mixtures: clayey silt to silty clay": "#c2cf5c",
  "Sands: clean sand to silty sand": "#ffff00",
  "Sand mixtures: silty sand to sandy silt": "#f3e006",
  "Gravelly sand to dense sand": "#e7c315",
  Unknown: "#909090",
};

const soilTypeColorScale = scaleOrdinal()
  .domain(Object.keys(soilColors))
  .range(Object.values(soilColors))
  .unknown("#999999");

const cptStandardColorScale = scaleOrdinal()
  .domain(["ISO22476D1", "NEN5140"])
  .range(["#DC143C", "#0000CD"])
  .unknown("#999999");

// ── Globe settings ────────────────────────────────────────────────────────
// https://cesium.com/blog/2020/06/16/visualizing-underground/
const initAlpha = 0.8;

globe.translucency.enabled = true;
globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
  200,
  0.1,
  800,
  initAlpha,
);
globe.translucency.backFaceAlpha = 1.0;
globe.undergroundColor = Cesium.Color.GREY;
// The seams between the globe's back-face tiles show the background through the translucent
// ground as dark arcs; the same grey as the underground hides them, and the sky atmosphere
// covers the grey above the horizon
scene.backgroundColor = Cesium.Color.GREY;
scene.screenSpaceCameraController.enableCollisionDetection = false; // Allow camera to go subsurface

// ── Data processing ───────────────────────────────────────────────────────

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

  return {
    length,
    position: Cesium.Cartesian3.fromDegrees(lon, lat, centerElevation),
  };
}

function onLoadLocations(dataSource) {
  for (const entity of dataSource.entities.values) {
    const standardType = entity.properties.standard.getValue();
    const cptId = entity.properties.location_source_id.getValue();

    const coordinates =
      entity.polyline && entity.polyline.positions
        ? entity.polyline.positions.getValue()
        : null;

    if (entity.polyline) {
      entity.polyline = undefined;
    }
    if (entity.marker) {
      entity.marker = undefined;
    }

    if (!coordinates || coordinates.length < 2) {
      continue;
    }

    const { length, position } = linestringToCylinder(coordinates);
    const color = Cesium.Color.fromCssColorString(
      cptStandardColorScale(standardType),
    );

    dataSource.entities.add({
      position,
      cylinder: {
        topRadius: 2.5,
        bottomRadius: 2.5,
        length,
        material: color.withAlpha(0.8),
        fill: true,
        outline: true,
        outlineColor: color,
        outlineWidth: 2,
      },
      properties: entity.properties,
      name: cptId,
    });
  }
}

function onLoadInterpretedCPT(dataSource) {
  for (const entity of dataSource.entities.values) {
    const soilType = entity.properties.soil_type.getValue();
    const locationUid = entity.properties.location_uid.getValue();

    const coordinates =
      entity.polyline && entity.polyline.positions
        ? entity.polyline.positions.getValue()
        : null;

    if (entity.polyline) {
      entity.polyline = undefined;
    }
    if (entity.point) {
      entity.point = undefined;
    }

    if (!coordinates || coordinates.length < 2) {
      continue;
    }

    const { length, position } = linestringToCylinder(coordinates);
    const color = Cesium.Color.fromCssColorString(soilTypeColorScale(soilType));

    dataSource.entities.add({
      position,
      cylinder: {
        topRadius: 2,
        bottomRadius: 2,
        length,
        material: color.withAlpha(0.9),
        fill: true,
        outline: false,
      },
      properties: entity.properties,
      name: `${locationUid} - ${soilType}`,
    });
  }
}

// ── Datasets ──────────────────────────────────────────────────────────────

const datasets = [
  {
    id: "cpt",
    label: "CPT Locations",
    enabled: false,
    dataSource: null,
    legendElement: createLegend({
      title: "CPT Standaard",
      items: cptStandardColorScale.domain().map((key) => ({
        label: key,
        color: cptStandardColorScale(key),
      })),
    }),
    onLoad: onLoadLocations,
  },
  {
    id: "cpt_interpreted",
    label: "CPT Interpreted",
    enabled: true,
    dataSource: null,
    onLoad: onLoadInterpretedCPT,
  },
];

function loadDataset(dataset) {
  return Cesium.GeoJsonDataSource.load(`${dataset.id}.geojson`, {
    clampToGround: false,
    stroke: Cesium.Color.YELLOW,
    strokeWidth: 3,
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

const [voxelProvider, legend] = await Promise.all([
  Cesium.Cesium3DTilesVoxelProvider.fromUrl(`amsterdam_ellipsoid/tileset.json`),
  fetch(`amsterdam_ellipsoid/legend.json`).then((r) => r.json()),
]);

const opacityUniform = () => ({
  u_opacity: { type: Cesium.UniformType.FLOAT, value: voxelOpacity },
});

function buildStratShader() {
  const colorBranches = legend.stratigraphy.values
    .map(
      ({ index, color: [r, g, b] }) =>
        `if (strat < ${index}.5) color = vec3(${(r / 255).toFixed(3)}, ${(g / 255).toFixed(3)}, ${(b / 255).toFixed(3)});`,
    )
    .join("\n        else ");

  return new Cesium.CustomShader({
    uniforms: opacityUniform(),
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float strat = fsInput.metadata.stratigraphy * 255.0;
        if (strat > 254.0) { material.alpha = 0.0; return; }

        vec3 color = vec3(0.5, 0.5, 0.5);
        ${colorBranches}
        material.diffuse = color;
        material.alpha = u_opacity;
      }
    `,
  });
}

function buildLithoShader() {
  const colorBranches = legend.lithology.values
    .map(
      ({ index, color: [r, g, b] }) =>
        `if (litho < ${index}.5) color = vec3(${(r / 255).toFixed(3)}, ${(g / 255).toFixed(3)}, ${(b / 255).toFixed(3)});`,
    )
    .join("\n        else ");

  return new Cesium.CustomShader({
    uniforms: opacityUniform(),
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float litho = fsInput.metadata.lithology * 255.0;
        if (litho > 254.0) { material.alpha = 0.0; return; }

        vec3 color = vec3(0.5, 0.5, 0.5);
        ${colorBranches}
        material.diffuse = color;
        material.alpha = u_opacity;
      }
    `,
  });
}

// Added to the scene when GeoTOP is first switched on: a hidden primitive still streams its tiles
const voxelPrimitive = new Cesium.VoxelPrimitive({
  provider: voxelProvider,
  customShader: buildLithoShader(),
});

voxelPrimitive.nearestSampling = true;
voxelPrimitive.jitter = false;

// ── Panels ────────────────────────────────────────────────────────────────

// ── Legend panel  ──────────────────────────────────────────────────────────
const legendPanel = createPanel({ title: "Legend" });
legendPanel.el.style.top = "12px";
legendPanel.el.style.right = "12px";
legendPanel.el.style.width = "260px";
legendPanel.body.classList.add("panel-body--scrollable");

let geoTopEnabled = false;

// The CPT soil types and the GeoTOP lithoclasses share their colors one to one, so they share
// one legend, titled and labeled after the layers that are on
function createSoilLegend() {
  const showCpt = datasets.find((d) => d.id === "cpt_interpreted").enabled;
  const showLitho = geoTopEnabled && activeLayer === "lithology";
  if (!showCpt && !showLitho) {
    return null;
  }
  const label = (cpt, litho) =>
    showCpt && showLitho ? `${cpt} / ${litho}` : showCpt ? cpt : litho;
  return createLegend({
    title: label("CPT Interpreted Soil type", "GeoTOP Lithoklasse"),
    items: soilTypeColorScale.domain().map((key, i) => ({
      label: label(key, legend.lithology.values[i].label),
      color: soilTypeColorScale(key),
    })),
  });
}

function updateLegend() {
  const cptLocations = datasets.find((d) => d.id === "cpt");
  legendPanel.body.replaceChildren(
    ...[
      cptLocations.enabled && cptLocations.legendElement,
      createSoilLegend(),
      geoTopEnabled && activeLayer === "stratigraphy" && stratLegendElement,
    ].filter(Boolean),
  );
}

// ── GeoTOP voxel ──────────────────────────────────────────────────────────

// viewer.extend(Cesium.viewerVoxelInspectorMixin);
// viewer.voxelInspector.viewModel.voxelPrimitive = voxelPrimitive;

const stratLegendElement = createLegend({
  title: "GeoTOP Stratigrafie",
  items: legend.stratigraphy.values.map(({ label, color: [r, g, b] }) => ({
    label,
    color: `rgb(${r},${g},${b})`,
  })),
});

updateLegend();

const isMobile = window.matchMedia("(max-width: 640px)").matches;

// Controls panel (bottom-right)
const controlsPanel = createPanel({ title: "Controls" });
controlsPanel.el.style.bottom = "12px";
controlsPanel.el.style.right = "12px";
controlsPanel.el.style.width = "260px";

// Dataset checkboxes
const datasetsLabel = document.createElement("div");
datasetsLabel.className = "section-label";
datasetsLabel.textContent = "Datasets";
controlsPanel.body.appendChild(datasetsLabel);

for (const dataset of datasets) {
  const item = document.createElement("div");
  item.className = "checkbox-item";
  item.innerHTML = `
    <input type="checkbox" id="${dataset.id}-toggle" ${dataset.enabled ? "checked" : ""}>
    <label for="${dataset.id}-toggle">${dataset.label}</label>
  `;
  controlsPanel.body.appendChild(item);

  item.querySelector("input").addEventListener("change", (event) => {
    dataset.enabled = event.target.checked;
    if (dataset.dataSource) {
      dataset.dataSource.show = dataset.enabled;
    }
    updateLegend();
  });
}

// Layer toggles
const layersLabel = document.createElement("div");
layersLabel.className = "section-label";
layersLabel.textContent = "Layers";
controlsPanel.body.appendChild(layersLabel);

// 3D BAG toggle
const bagItem = document.createElement("div");
bagItem.className = "checkbox-item";
bagItem.innerHTML = `
  <input type="checkbox" id="buildings-toggle" checked>
  <label for="buildings-toggle">3D BAG</label>
`;
controlsPanel.body.appendChild(bagItem);

// GeoTOP
function createGeoTOPLayerToggle() {
  function applyShader() {
    voxelPrimitive.customShader =
      activeLayer === "stratigraphy" ? buildStratShader() : buildLithoShader();
  }

  const geoTOPlayerToggle = document.createElement("div");
  geoTOPlayerToggle.className = "btn-group";
  geoTOPlayerToggle.innerHTML = `
  <button class="btn active" data-layer="lithology">Lithoklasse</button>
  <button class="btn" data-layer="stratigraphy">Stratigrafie</button>
  `;

  geoTOPlayerToggle.querySelectorAll("[data-layer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeLayer = btn.dataset.layer;

      geoTOPlayerToggle
        .querySelectorAll("[data-layer]")
        .forEach((b) => b.classList.toggle("active", b === btn));

      updateLegend();
      applyShader();
    });
  });

  return geoTOPlayerToggle;
}

function createVoxelOpacitySlider(voxelPrim) {
  const el = document.createElement("div");
  el.className = "labeled-slider";
  el.innerHTML = `
    <div class="slider-header">
      <label>Voxel Opacity</label>
      <span class="slider-value">${Math.round(voxelOpacity * 100)}%</span>
    </div>
    <input type="range" min="0" max="1" step="0.05" value="${voxelOpacity}" />
  `;

  el.querySelector("input").addEventListener("input", (event) => {
    voxelOpacity = event.target.valueAsNumber;
    el.querySelector(".slider-value").textContent =
      `${Math.round(voxelOpacity * 100)}%`;

    voxelPrim.customShader.uniforms.u_opacity.value = voxelOpacity;
  });

  return el;
}

function createGeoTOPItem() {
  const geoTOPItem = document.createElement("div");
  geoTOPItem.className = "checkbox-item";
  const id = "geotop-toggle";
  geoTOPItem.innerHTML = `<input type="checkbox" id="${id}">
    <label for="geotop-toggle">GeoTOP</label>`;

  let voxelOpacitySliderEl = null;
  let geoTOPlayerToggleEl = null;
  let zClippingEl = null;

  geoTOPItem.addEventListener("change", (event) => {
    if (event.target.checked && !scene.primitives.contains(voxelPrimitive)) {
      scene.primitives.add(voxelPrimitive);
    }
    voxelPrimitive.show = event.target.checked;
    geoTopEnabled = event.target.checked;
    updateLegend();

    if (event.target.checked) {
      zClippingEl = createClippingControlsZ(voxelPrimitive);
      geoTOPlayerToggleEl = createGeoTOPLayerToggle();
      voxelOpacitySliderEl = createVoxelOpacitySlider(voxelPrimitive);

      controlsPanel.body.append(
        voxelOpacitySliderEl,
        geoTOPlayerToggleEl,
        zClippingEl,
      );
    } else {
      voxelOpacitySliderEl?.remove();
      voxelOpacitySliderEl = null;

      geoTOPlayerToggleEl?.remove();
      geoTOPlayerToggleEl = null;

      zClippingEl?.remove();
      zClippingEl = null;
    }
  });

  return geoTOPItem;
}

const geoTOPItem = createGeoTOPItem();

// Basemap opacity slider
controlsPanel.body.appendChild(
  createBasemapOpacitySlider(viewer, {
    globe,
    nearAlpha: 0.1,
    farAlpha: initAlpha,
    value: 0.7,
  }).el,
);

// ── Controls Panel ──────────────────────────────────────────────────────────
controlsPanel.body.append(layersLabel, bagItem, geoTOPItem);

if (isMobile) {
  // On mobile: wrap panels in a stacked bottom container
  const bottomPanels = document.createElement("div");
  bottomPanels.className = "mobile-bottom-panels";

  // Legend starts collapsed on mobile to save space
  legendPanel.details.open = false;

  bottomPanels.append(legendPanel.el, controlsPanel.el);
  document.body.appendChild(bottomPanels);
} else {
  document.body.appendChild(legendPanel.el);
  document.body.appendChild(controlsPanel.el);
}

// ── Load data ─────────────────────────────────────────────────────────────

Promise.allSettled(datasets.map((dataset) => loadDataset(dataset))).then(
  (results) => {
    for (const result of results) {
      if (result.status === "rejected") {
        console.warn("Failed to load dataset:", result.reason);
      }
    }
  },
);

// ── 3D BAG Buildings ──────────────────────────────────────────────────────

// PDOK's tiles give the buildings a non-metallic material; 3dbag.nl's leave metallicFactor at
// glTF's default of 1, which renders them dark and muddy without an environment to reflect
try {
  const tileset_3dbag = await Cesium.Cesium3DTileset.fromUrl(
    "https://api.pdok.nl/kadaster/3d-basisvoorziening/ogc/v1/collections/gebouwen/3dtiles",
  );
  // Red roofs: the tiles have no roof attribute, so color faces whose normal points up
  tileset_3dbag.customShader = new Cesium.CustomShader({
    fragmentShaderText: `
      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        vec3 normalWC = normalize(czm_inverseViewRotation * fsInput.attributes.normalEC);
        vec3 upWC = normalize(fsInput.attributes.positionWC);
        float roof = smoothstep(0.25, 0.35, abs(dot(normalWC, upWC)));
        vec3 wall = material.diffuse;
        material.diffuse = mix(wall, vec3(0.87, 0.16, 0.16), roof);
        material.emissive += wall * 0.25 * (1.0 - roof);
      }
    `,
  });

  scene.primitives.add(tileset_3dbag);
  viewer.creditDisplay.addStaticCredit(
    new Cesium.Credit(
      '3D Basisvoorziening © <a href="https://www.pdok.nl/3d-basisvoorziening">Kadaster</a> (CC BY 4.0)',
    ),
  );

  document
    .querySelector("#buildings-toggle")
    .addEventListener("change", (event) => {
      tileset_3dbag.show = event.target.checked;
    });
} catch (error) {
  console.log(`There was an error while adding the 3DBAG tileset. ${error}`);
}
