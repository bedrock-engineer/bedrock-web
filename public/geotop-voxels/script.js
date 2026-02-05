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
});

// viewer.scene.verticalExaggeration = 2.0;
// const viewModel = {
//   exaggeration: scene.verticalExaggeration,
//   relativeHeight: scene.verticalExaggerationRelativeHeight,
// };

// function updateExaggeration() {
//   scene.verticalExaggeration = Number(viewModel.exaggeration);
//   scene.verticalExaggerationRelativeHeight = Number(viewModel.relativeHeight);
// }

const osm = new Cesium.OpenStreetMapImageryProvider({
  url: "https://tile.openstreetmap.org/",
});

const defaultImageryLayer = viewer.imageryLayers.get(0);

const customImageryLayer = viewer.imageryLayers.addImageryProvider(osm);

Cesium.Ion.defaultAccessToken = null;
// // Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwNGFmOTJiZS0xMjJjLTRkNTYtYWU5NC05N2Y5ODZjNzQ4ZTQiLCJpZCI6Mjc0NDQ3LCJpYXQiOjE3MzkwMzUxNjV9.Vj6tRACNQvvjbzD1KJ0tccLziszrNXo6JIHv-as9kuE"
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0MzY1NjhhNi03YjczLTRlZDQtODAyZS03YzgyZTFkZmUyYjYiLCJpZCI6Mjc0NDQ3LCJpYXQiOjE3NjIyNDU4Nzl9.3erU3gM4MU7Bl2bWMVVRwkE6CEQmYhrJAl1pTQCija8";

// viewer.extend(Cesium.viewerVoxelInspectorMixin);

const initAlpha = 0.4;
// Configure globe for underground visualization
// https://cesium.com/blog/2020/06/16/visualizing-underground/
const { globe } = viewer.scene;
globe.translucency.enabled = true;
globe.depthTestAgainstTerrain = true;
// globe.translucency.frontFaceAlpha = initAlpha;
globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
  200, // The lower bound of the camera range.
  0.1, // Minimum alpha at close distance
  800, // The upper bound of the camera range.
  initAlpha //  Maximum alpha at far distance
);
globe.translucency.backFaceAlpha = 1.0; // Keep back face opaque

// globe.undergroundColor = Cesium.Color.fromCssColorString("#e8e4e0"); // Solid color to block view to opposite side of globe
// globe.translucency.backFaceAlpha = 1.0; // Keep back face opaque so we don't see the opposite side of the globe

// const terrainProvider = await Cesium.CesiumTerrainProvider.fromUrl(
//   "https://api.pdok.nl/kadaster/3d-basisvoorziening/ogc/v1_0/collections/digitaalterreinmodel/quantized-mesh"
// );
// viewer.scene.terrainProvider = terrainProvider;

viewer.scene.globe.depthTestAgainstTerrain = true;
viewer.scene.screenSpaceCameraController.enableCollisionDetection = false; // So we can move the camera below the surface

const tileset = "delft_10x";
const datasets = [
  { enabled: false, name: "Delft (z ⨉ 10)", url: "geotop_delft_10x" },
  {
    enabled: false,
    name: "Provincie Utrecht",
    url: "geotop_utrecht_province",
  },
  // { enabled: true, name: "Nederland", url: "geotop_nl_transposed_octree" },
  { enabled: true, name: "Amsterdam", url: "geotop_amsterdam" },
];

const currentDataset = datasets.find((d) => d.enabled);

const voxelProvider = await Cesium.Cesium3DTilesVoxelProvider.fromUrl(
  `${currentDataset.url}/tileset.json`
);

// Visibility state for each class (1.0 = visible, 0.0 = hidden)
const classVisibility = {
  // u_visibility0: classes 0-3
  // u_visibility1: classes 4-7
  // u_visibility2: classes 8-10 (+ 1 unused)
  u_visibility0: new Cesium.Cartesian4(1.0, 1.0, 1.0, 1.0),
  u_visibility1: new Cesium.Cartesian4(1.0, 1.0, 1.0, 1.0),
  u_visibility2: new Cesium.Cartesian4(1.0, 1.0, 1.0, 1.0),
};

const lithoColorShader = new Cesium.CustomShader({
  uniforms: {
    u_visibility0: {
      type: Cesium.UniformType.VEC4,
      value: classVisibility.u_visibility0,
    },
    u_visibility1: {
      type: Cesium.UniformType.VEC4,
      value: classVisibility.u_visibility1,
    },
    u_visibility2: {
      type: Cesium.UniformType.VEC4,
      value: classVisibility.u_visibility2,
    },
    u_showEdges: {
      type: Cesium.UniformType.FLOAT,
      value: 0.0,
    },
  },
  fragmentShaderText: `
      // Get visibility for a class (0-10)
      float getVisibility(int classId) {
        if (classId == 0) return u_visibility0.x;
        if (classId == 1) return u_visibility0.y;
        if (classId == 2) return u_visibility0.z;
        if (classId == 3) return u_visibility0.w;
        if (classId == 4) return u_visibility1.x;
        if (classId == 5) return u_visibility1.y;
        if (classId == 6) return u_visibility1.z;
        if (classId == 7) return u_visibility1.w;
        if (classId == 8) return u_visibility2.x;
        if (classId == 9) return u_visibility2.y;
        if (classId == 10) return u_visibility2.z;
        return 1.0;
      }

      void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
        float litho = fsInput.metadata.lithok;

        vec3 color;
        float alpha;

        // Render nodata voxels as fully transparent
        // IMPORTANT: Must set diffuse to black to prevent gray artifacts
        if (litho < -1000.0) {
          material.diffuse = vec3(0.0, 0.0, 0.0);  // Black (prevents gray showing through)
          material.alpha = 0.0;  // Fully transparent - ray continues through
          return;
        }

        // Determine class ID and check visibility
        int classId = int(litho + 0.5);
        if (getVisibility(classId) < 0.5) {
          material.diffuse = vec3(0.0, 0.0, 0.0);
          material.alpha = 0.0;
          return;
        }

        // Official GeoTOP color scheme (RGB values converted to 0-1 range)
        if (litho < 0.5) {
          color = vec3(0.784, 0.784, 0.784);  // 0: antropogeen (anthropogenic) - light grey
        } else if (litho < 1.5) {
          color = vec3(0.616, 0.306, 0.251);  // 1: veen (peat/organic) - brown
        } else if (litho < 2.5) {
          color = vec3(0.0, 0.573, 0.0);      // 2: klei (clay) - green
        } else if (litho < 3.5) {
          color = vec3(0.761, 0.812, 0.361);  // 3: kleiig zand (sandy clay) - yellow-green
        } else if (litho < 5.5) {
          color = vec3(1.0, 1.0, 0.0);        // 4-5: zand fijn (fine sand) - bright yellow
        } else if (litho < 6.5) {
          color = vec3(0.953, 0.882, 0.024);  // 6: zand midden (medium sand) - yellow-orange
        } else if (litho < 7.5) {
          color = vec3(0.906, 0.765, 0.086);  // 7: zand grof (coarse sand) - orange-yellow
        } else if (litho < 8.5) {
          color = vec3(0.847, 0.639, 0.125);  // 8: grind (gravel) - darker orange
        } else if (litho < 9.5) {
          color = vec3(0.373, 0.373, 1.0);    // 9: schelpen (shells) - blue
        } else {
          color = vec3(0.565, 0.565, 0.565);  // 10: overig (other) - grey
        }

        // Edge detection using screen-space derivatives
        // Detects boundaries where lithology class changes
        if (u_showEdges > 0.5) {
          float lithoGradient = length(vec2(dFdx(litho), dFdy(litho)));
          if (lithoGradient > 0.1) {
            // Darken edges between different materials
            color *= 0.3;
          }
        }

        material.diffuse = color;
        // CRITICAL: Alpha must be < 1.0 for volumetric rendering
        // Lower alpha = more transparent = can see through sparse layers
        material.alpha = 0.8;
      }
    `,
});

// Update class visibility in the shader
function setClassVisibility(classId, visible) {
  const value = visible ? 1.0 : 0.0;

  if (classId < 4) {
    const vec = classVisibility.u_visibility0;
    if (classId === 0) vec.x = value;
    else if (classId === 1) vec.y = value;
    else if (classId === 2) vec.z = value;
    else if (classId === 3) vec.w = value;
    lithoColorShader.setUniform("u_visibility0", vec);
  } else if (classId < 8) {
    const vec = classVisibility.u_visibility1;
    if (classId === 4) vec.x = value;
    else if (classId === 5) vec.y = value;
    else if (classId === 6) vec.z = value;
    else if (classId === 7) vec.w = value;
    lithoColorShader.setUniform("u_visibility1", vec);
  } else {
    const vec = classVisibility.u_visibility2;
    if (classId === 8) vec.x = value;
    else if (classId === 9) vec.y = value;
    else if (classId === 10) vec.z = value;
    lithoColorShader.setUniform("u_visibility2", vec);
  }
}

// Track current voxel primitive for debug toggle
let currentVoxelPrimitive = null;

// Store actual voxel bounds for slider mapping
let voxelBounds = {
  minX: 0, maxX: 1,
  minY: 0, maxY: 1,
  minZ: 0, maxZ: 1,
};

// Clipping state (using -Infinity/Infinity means no clipping on that axis)
const clippingState = {
  minX: -Infinity,
  maxX: Infinity,
  minY: -Infinity,
  maxY: Infinity,
  minZ: -Infinity,
  maxZ: Infinity,
};

function createPrimitive(provider) {
  viewer.scene.primitives.removeAll();

  const voxelPrimitive = viewer.scene.primitives.add(
    new Cesium.VoxelPrimitive({
      provider: provider,
      customShader: lithoColorShader,
    })
  );

  voxelPrimitive.nearestSampling = true;
  voxelPrimitive.jitter = false; // Disable jitter for more consistent volume rendering

  // Force proper depth testing and disable face culling
  voxelPrimitive.depthTest = true;
  voxelPrimitive.blendOption = Cesium.BlendOption.TRANSLUCENT;

  // Preserve debug draw state when switching datasets
  const showBoundsCheckbox = document.getElementById("show-bounds");
  if (showBoundsCheckbox?.checked) {
    voxelPrimitive.debugDraw = true;
  }

  viewer.voxelInspector.viewModel.voxelPrimitive = voxelPrimitive;
  currentVoxelPrimitive = voxelPrimitive;

  // Apply current clipping state
  voxelPrimitive.minClippingBounds = new Cesium.Cartesian3(
    clippingState.minX,
    clippingState.minY,
    clippingState.minZ
  );
  voxelPrimitive.maxClippingBounds = new Cesium.Cartesian3(
    clippingState.maxX,
    clippingState.maxY,
    clippingState.maxZ
  );

  // Wait for the primitive to be ready before positioning camera
  const waitForReady = () => {
    if (voxelPrimitive.ready) {
      // Capture actual voxel bounds for slider mapping
      // Try different sources for bounds
      const prim = voxelPrimitive;

      // Check what's available
      console.log("VoxelPrimitive properties:", {
        shape: prim.shape,
        provider: prim.provider,
        minBounds: prim.minBounds,
        maxBounds: prim.maxBounds,
        boundingSphere: prim.boundingSphere,
      });

      // Try to get bounds from provider or primitive
      if (prim.provider?.minBounds && prim.provider?.maxBounds) {
        voxelBounds = {
          minX: prim.provider.minBounds.x,
          maxX: prim.provider.maxBounds.x,
          minY: prim.provider.minBounds.y,
          maxY: prim.provider.maxBounds.y,
          minZ: prim.provider.minBounds.z,
          maxZ: prim.provider.maxBounds.z,
        };
      } else if (prim.minBounds && prim.maxBounds) {
        voxelBounds = {
          minX: prim.minBounds.x,
          maxX: prim.maxBounds.x,
          minY: prim.minBounds.y,
          maxY: prim.maxBounds.y,
          minZ: prim.minBounds.z,
          maxZ: prim.maxBounds.z,
        };
      } else {
        // Fallback: estimate from bounding sphere
        const sphere = prim.boundingSphere;
        const r = sphere.radius;
        voxelBounds = {
          minX: -r, maxX: r,
          minY: -r, maxY: r,
          minZ: -r, maxZ: r,
        };
      }
      console.log("Voxel bounds:", voxelBounds);

      // Fly to bounding sphere
      viewer.camera.flyToBoundingSphere(voxelPrimitive.boundingSphere, {
        duration: 0.0,
      });
    } else {
      // Check again in 100ms
      setTimeout(waitForReady, 100);
    }
  };

  waitForReady();

  return voxelPrimitive;
}

const voxelPrim = createPrimitive(voxelProvider);

// Globe opacity slider
document.querySelector("#alpha")?.addEventListener("input", (event) => {
  const alpha = event.target.valueAsNumber;
  // Update translucency using distance-based approach
  globe.translucency.frontFaceAlphaByDistance.nearValue = alpha;
  globe.translucency.frontFaceAlphaByDistance.farValue = alpha;
  // imageryLayer.alpha = alpha;
});

// Bounding box toggle
document.getElementById("show-bounds")?.addEventListener("change", (event) => {
  if (currentVoxelPrimitive) {
    currentVoxelPrimitive.debugDraw = event.target.checked;
  }
});

// Voxel edges toggle
document.getElementById("show-edges")?.addEventListener("change", (event) => {
  lithoColorShader.setUniform("u_showEdges", event.target.checked ? 1.0 : 0.0);
});

// Clipping controls
function updateClipping() {
  if (currentVoxelPrimitive) {
    currentVoxelPrimitive.minClippingBounds = new Cesium.Cartesian3(
      clippingState.minX,
      clippingState.minY,
      clippingState.minZ
    );
    currentVoxelPrimitive.maxClippingBounds = new Cesium.Cartesian3(
      clippingState.maxX,
      clippingState.maxY,
      clippingState.maxZ
    );
  }
}

// Map slider 0-1 to actual voxel bounds
// At 0 for min sliders -> -Infinity (no clipping)
// At 1 for max sliders -> Infinity (no clipping)
function sliderToClipMin(sliderVal, boundsMin, boundsMax) {
  if (sliderVal <= 0.001) return -Infinity;
  return boundsMin + sliderVal * (boundsMax - boundsMin);
}

function sliderToClipMax(sliderVal, boundsMin, boundsMax) {
  if (sliderVal >= 0.999) return Infinity;
  return boundsMin + sliderVal * (boundsMax - boundsMin);
}

document.getElementById("clip-x-min")?.addEventListener("input", (e) => {
  clippingState.minX = sliderToClipMin(e.target.valueAsNumber, voxelBounds.minX, voxelBounds.maxX);
  updateClipping();
});
document.getElementById("clip-x-max")?.addEventListener("input", (e) => {
  clippingState.maxX = sliderToClipMax(e.target.valueAsNumber, voxelBounds.minX, voxelBounds.maxX);
  updateClipping();
});
document.getElementById("clip-y-min")?.addEventListener("input", (e) => {
  clippingState.minY = sliderToClipMin(e.target.valueAsNumber, voxelBounds.minY, voxelBounds.maxY);
  updateClipping();
});
document.getElementById("clip-y-max")?.addEventListener("input", (e) => {
  clippingState.maxY = sliderToClipMax(e.target.valueAsNumber, voxelBounds.minY, voxelBounds.maxY);
  updateClipping();
});
document.getElementById("clip-z-min")?.addEventListener("input", (e) => {
  clippingState.minZ = sliderToClipMin(e.target.valueAsNumber, voxelBounds.minZ, voxelBounds.maxZ);
  updateClipping();
});
document.getElementById("clip-z-max")?.addEventListener("input", (e) => {
  clippingState.maxZ = sliderToClipMax(e.target.valueAsNumber, voxelBounds.minZ, voxelBounds.maxZ);
  updateClipping();
});

document.getElementById("reset-clipping")?.addEventListener("click", () => {
  clippingState.minX = -Infinity;
  clippingState.maxX = Infinity;
  clippingState.minY = -Infinity;
  clippingState.maxY = Infinity;
  clippingState.minZ = -Infinity;
  clippingState.maxZ = Infinity;

  document.getElementById("clip-x-min").value = 0;
  document.getElementById("clip-x-max").value = 1;
  document.getElementById("clip-y-min").value = 0;
  document.getElementById("clip-y-max").value = 1;
  document.getElementById("clip-z-min").value = 0;
  document.getElementById("clip-z-max").value = 1;

  updateClipping();
});

function generateDatasetControls() {
  const controlsSection = document.querySelector("#datasets");

  const controlsHTML = datasets
    .map(
      (dataset) => `
  <div class="radio-item">
    <input type="radio" name="dataset"  id="${dataset.name}-radio" ${
        dataset.enabled ? "checked" : ""
      }>
    <label for="${dataset.name}-radio">${dataset.name}</label>
  </div>
`
    )
    .join("");

  controlsSection.innerHTML = controlsSection.innerHTML + controlsHTML;

  // Add event listeners to checkboxes
  for (const dataset of datasets) {
    const radioButton = document.getElementById(`${dataset.name}-radio`);

    radioButton.addEventListener("change", async (event) => {
      dataset.enabled = event.target.checked;
      if (event.target.checked) {
        const voxelProvider = await Cesium.Cesium3DTilesVoxelProvider.fromUrl(
          `${dataset.url}/tileset.json`
        );

        const voxelPrim = createPrimitive(voxelProvider);
      }
    });
  }
}

generateDatasetControls();

const toggleBtn = document.getElementById("toggle-controls");
const controls = document.getElementById("controls");

toggleBtn.addEventListener("click", () => {
  const isOpen = controls.dataset.open === "true";
  controls.dataset.open = String(!isOpen);
  toggleBtn.setAttribute("aria-expanded", String(!isOpen));
  toggleBtn.textContent = isOpen ? "☰" : "×";
});

// Legend visibility toggles
const legendItems = document.querySelectorAll("#legend .legend-item");
legendItems.forEach((item) => {
  const classId = parseInt(item.dataset.class, 10);
  const checkbox = item.querySelector('input[type="checkbox"]');

  checkbox.addEventListener("change", (event) => {
    const visible = event.target.checked;
    setClassVisibility(classId, visible);
    item.classList.toggle("hidden", !visible);
  });
});
