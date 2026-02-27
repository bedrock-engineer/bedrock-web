const nlRectangle = Cesium.Rectangle.fromDegrees(3, 50.7, 7.3, 53.6);

const viewer = new Cesium.Viewer("map", {
  animation: false,
  timeline: false,
  terrainProvider: await Cesium.CesiumTerrainProvider.fromUrl(
    "https://api.pdok.nl/kadaster/3d-basisvoorziening/ogc/v1_0/collections/digitaalterreinmodel/quantized-mesh",
  ),
  // terrain: Cesium.Terrain.fromWorldTerrain(),
  fullscreenButton: false,
  vrButton: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  imageryProvider: false, // no default Bing layer

  navigationHelpButton: false,
  geocoder: false,
  homeButton: false,
});

const { scene, camera } = viewer;
const { globe } = scene;

scene.pickTranslucentDepth = false;
scene.postProcessStages.fxaa.enabled = false;
scene.fog.enabled = false;

scene.highDynamicRange = false;
scene.msaaSamples = 1; 

scene.postProcessStages.ambientOcclusion.enabled = false;
scene.postProcessStages.bloom.enabled = false;

scene.skyAtmosphere.show = false;
scene.skyBox.show = false;
scene.sun.show = false;
scene.moon.show = false;

globe.showGroundAtmosphere = false;
globe.enableLighting = false;


Cesium.Ion.defaultAccessToken = null;

// viewer.extend(Cesium.viewerVoxelInspectorMixin);

const initAlpha = 0.4;
// Configure globe for underground visualization
// https://cesium.com/blog/2020/06/16/visualizing-underground/
globe.translucency.enabled = true;
globe.depthTestAgainstTerrain = true;
// globe.translucency.frontFaceAlpha = initAlpha;
globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
  200, // The lower bound of the camera range.
  0.1, // Minimum alpha at close distance
  800, // The upper bound of the camera range.
  initAlpha, //  Maximum alpha at far distance
);
globe.translucency.backFaceAlpha = 1.0; // Keep back face opaque

// globe.undergroundColor = Cesium.Color.fromCssColorString("#e8e4e0"); // Solid color to block view to opposite side of globe
// globe.translucency.backFaceAlpha = 1.0; // Keep back face opaque so we don't see the opposite side of the globe

// const terrainProvider =
// viewer.scene.terrainProvider = terrainProvider;

const bgt = new Cesium.WebMapTileServiceImageryProvider({
  url: "https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0?",
  layer: "standaard",
  style: "default",
  format: "image/png",
  tileMatrixSetID: "EPSG:3857",
  rectangle: nlRectangle,
  minimumLevel: 7, // start where tiles actually exist
  maximumLevel: 18, // PDOK max zoom
  credit: new Cesium.Credit(
    'BGT (Basisregistratie Grootschalige Topografie) - <a href="https://www.pdok.nl/introductie/-/article/basisregistratie-grootschalige-topografie-bgt-">PDOK</a>',
  ),
});

viewer.imageryLayers.addImageryProvider(bgt);

scene.globe.depthTestAgainstTerrain = true;
scene.screenSpaceCameraController.enableCollisionDetection = false; // So we can move the camera below the surface

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
  `${currentDataset.url}/tileset.json`,
);

// Visibility state for each class (1.0 = visible, 0.0 = hidden)
const classVisibility = {
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
        material.alpha = 0.5;
      }
    `,
});

// Update class visibility in the shader
function setClassVisibility(classId, visible) {
  const value = visible ? 1.0 : 0.0;

  if (classId < 4) {
    const vec = classVisibility.u_visibility0;
    if (classId === 0) vec.x = value;
    else if (classId === 1) {
      vec.y = value;
    } else if (classId === 2) {
      vec.z = value;
    } else if (classId === 3) {
      vec.w = value;
    }
    lithoColorShader.setUniform("u_visibility0", vec);
  } else if (classId < 8) {
    const vec = classVisibility.u_visibility1;
    if (classId === 4) vec.x = value;
    else if (classId === 5) {
      vec.y = value;
    } else if (classId === 6) {
      vec.z = value;
    } else if (classId === 7) {
      vec.w = value;
    }
    lithoColorShader.setUniform("u_visibility1", vec);
  } else {
    const vec = classVisibility.u_visibility2;
    if (classId === 8) {
      vec.x = value;
    } else if (classId === 9) {
      vec.y = value;
    } else if (classId === 10) {
      vec.z = value;
    }
    lithoColorShader.setUniform("u_visibility2", vec);
  }
}

// Track current voxel primitive for debug toggle
let currentVoxelPrimitive = null;

// Store actual voxel bounds for slider mapping
let voxelBounds = {
  minX: 0,
  maxX: 1,
  minY: 0,
  maxY: 1,
  minZ: 0,
  maxZ: 1,
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
  scene.primitives.removeAll();

  const voxelPrimitive = scene.primitives.add(
    new Cesium.VoxelPrimitive({
      provider: provider,
      customShader: lithoColorShader,
    }),
  );

  // viewer.voxelInspector.viewModel.voxelPrimitive = voxelPrimitive;

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

  currentVoxelPrimitive = voxelPrimitive;

  // Apply current clipping state
  voxelPrimitive.minClippingBounds = new Cesium.Cartesian3(
    clippingState.minX,
    clippingState.minY,
    clippingState.minZ,
  );

  voxelPrimitive.maxClippingBounds = new Cesium.Cartesian3(
    clippingState.maxX,
    clippingState.maxY,
    clippingState.maxZ,
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
          minX: -r,
          maxX: r,
          minY: -r,
          maxY: r,
          minZ: -r,
          maxZ: r,
        };
      }
      console.log("Voxel bounds:", voxelBounds);

      // Apply current vertical exaggeration
      setVoxelExaggeration(voxelPrimitive, voxelExaggeration);

      // Fly to bounding sphere
      camera.flyToBoundingSphere(voxelPrimitive.boundingSphere, {
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

// Vertical exaggeration — applied only to the voxel primitive via modelMatrix.
// Scales the voxel volume in the local vertical (Up) direction, anchored at the
// terrain surface so shallow voxels stay near the surface and deep ones stretch down.
let voxelExaggeration = 1;

function setVoxelExaggeration(primitive, exaggeration) {
  if (!primitive || !primitive.ready) return;

  if (exaggeration === 1) {
    primitive.modelMatrix = Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY);
    return;
  }

  // Surface point directly above the voxel centre (height = 0 = sea level).
  // Scaling from here keeps the surface-level voxels stationary and stretches
  // deeper voxels further underground.
  const center = primitive.boundingSphere.center;
  const carto = Cesium.Cartographic.fromCartesian(center);
  carto.height = 0;
  const surfacePoint = Cesium.Cartographic.toCartesian(carto);

  // ENU frame at surface: Z axis = vertical "up".
  const enuToEcef = Cesium.Transforms.eastNorthUpToFixedFrame(surfacePoint);
  const ecefToEnu = Cesium.Matrix4.inverse(enuToEcef, new Cesium.Matrix4());

  // Non-uniform scale: keep X/Y, stretch Z (vertical) by exaggeration factor.
  const scaleMatrix = Cesium.Matrix4.fromScale(
    new Cesium.Cartesian3(1, 1, exaggeration),
  );

  // modelMatrix = enuToEcef * scale * ecefToEnu
  const result = new Cesium.Matrix4();
  Cesium.Matrix4.multiply(enuToEcef, scaleMatrix, result);
  Cesium.Matrix4.multiply(result, ecefToEnu, result);

  primitive.modelMatrix = result;
}

document
  .querySelector("#vertical-exaggeration")
  ?.addEventListener("input", (event) => {
    voxelExaggeration = event.target.valueAsNumber;
    if (currentVoxelPrimitive?.ready) {
      setVoxelExaggeration(currentVoxelPrimitive, voxelExaggeration);
    }
  });

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
      clippingState.minZ,
    );
    currentVoxelPrimitive.maxClippingBounds = new Cesium.Cartesian3(
      clippingState.maxX,
      clippingState.maxY,
      clippingState.maxZ,
    );
  }
}

// Map slider 0-1 to actual voxel bounds
// At 0 for min sliders -> -Infinity (no clipping)
// At 1 for max sliders -> Infinity (no clipping)
function sliderToClipMin(sliderVal, boundsMin, boundsMax) {
  if (sliderVal <= 0.001) {
    return -Infinity;
  }
  return boundsMin + sliderVal * (boundsMax - boundsMin);
}

function sliderToClipMax(sliderVal, boundsMin, boundsMax) {
  if (sliderVal >= 0.999) {
    return Infinity;
  }
  return boundsMin + sliderVal * (boundsMax - boundsMin);
}

document.getElementById("clip-x-min")?.addEventListener("input", (e) => {
  clippingState.minX = sliderToClipMin(
    e.target.valueAsNumber,
    voxelBounds.minX,
    voxelBounds.maxX,
  );
  updateClipping();
});

document.getElementById("clip-x-max")?.addEventListener("input", (e) => {
  clippingState.maxX = sliderToClipMax(
    e.target.valueAsNumber,
    voxelBounds.minX,
    voxelBounds.maxX,
  );
  updateClipping();
});

document.getElementById("clip-y-min")?.addEventListener("input", (e) => {
  clippingState.minY = sliderToClipMin(
    e.target.valueAsNumber,
    voxelBounds.minY,
    voxelBounds.maxY,
  );
  updateClipping();
});

document.getElementById("clip-y-max")?.addEventListener("input", (e) => {
  clippingState.maxY = sliderToClipMax(
    e.target.valueAsNumber,
    voxelBounds.minY,
    voxelBounds.maxY,
  );
  updateClipping();
});

document.getElementById("clip-z-min")?.addEventListener("input", (e) => {
  clippingState.minZ = sliderToClipMin(
    e.target.valueAsNumber,
    voxelBounds.minZ,
    voxelBounds.maxZ,
  );
  updateClipping();
});

document.getElementById("clip-z-max")?.addEventListener("input", (e) => {
  clippingState.maxZ = sliderToClipMax(
    e.target.valueAsNumber,
    voxelBounds.minZ,
    voxelBounds.maxZ,
  );
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
`,
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
          `${dataset.url}/tileset.json`,
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
