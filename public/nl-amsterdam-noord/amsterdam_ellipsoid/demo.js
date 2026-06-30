
// ---------------------------------------------------------------------------
// Demo animation — Amsterdam Noord site-scale flythrough
// ---------------------------------------------------------------------------
// Keyframes: [time_s, pitch_deg, range_m, zLo, zHi, voxelOpacity, basemapOpacity]
// range_m is absolute distance from the orbit center in meters.

const ORBIT_DEG_PER_SEC = 16;
const HEADING_OFFSET_DEG = 95;

// Orbit center: centroid of the CPT locations (from cpt.geojson)
const CENTER_LON_RAD = 0.085598019392416;
const CENTER_LAT_RAD = 0.914293666243604;

const KEYFRAMES = [
  //  t    pitch  range_m  zLo  zHi  voxOpac  basemap
  [0, -30, 800, 0, 1, 0, 1.0], // site overview with buildings + CPTs
  [6, -22, 250, 0, 1, 0, 0.8], // zoom in on CPTs
  [8, -20, 250, 0, 1, 0, 0.7], // orbit around CPTs
  [10, -20, 250, 0, 1, 1, 0.6], // GeoTOP fades in
  [13, -25, 500, 0, 1, 1, 0.6], // pull back to see GeoTOP in context
  [16, -28, 700, 0, 1, 0, 0.9], // pull back more, GeoTOP fades out
  [18, -30, 800, 0, 1, 0, 1.0], // return to start
];

// One-shot events
const EVENTS = [
  { time: 9, action: "enableGeoTOP" },
  { time: 4, action: "hideBuildings" },
  { time: 15, action: "showBuildings" },
  { time: 15, action: "disableGeoTOP" },
];

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

export function initDemo({
  viewer,
  scene,
  camera,
  globe,
  voxelPrimitive,
  controlsPanel,
}) {
  let listener = null;
  let startTime = null;
  let firedEvents = new Set();
  let savedBasemapOpacity = null;

  // Fixed orbit center at the CPT site, at ground level
  const center = Cesium.Cartesian3.fromRadians(
    CENTER_LON_RAD,
    CENTER_LAT_RAD,
    0,
  );

  const btn = document.createElement("button");
  btn.className = "btn btn--accent";
  btn.textContent = "▶ Demo";
  btn.dataset.label = "▶ Demo";
  btn.style.marginTop = "8px";
  btn.style.width = "100%";

  function applyBasemapOpacity(v) {
    for (let i = 0; i < viewer.imageryLayers.length; i++) {
      viewer.imageryLayers.get(i).alpha = v;
    }
    globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
      200,
      0.1 * v,
      800,
      0.8 * v,
    );
  }

  function setBuildingsVisible(visible) {
    const toggle = document.querySelector("#buildings-toggle");
    if (toggle && toggle.checked !== visible) {
      toggle.click();
    }
  }

  function setGeoTOPEnabled(enabled) {
    const toggle = document.querySelector("#geotop-toggle");
    if (toggle && toggle.checked !== enabled) {
      toggle.click();
    }
  }

  function stop() {
    if (!listener) return;
    scene.preUpdate.removeEventListener(listener);
    listener = null;
    startTime = null;
    firedEvents.clear();
    camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    // Reset z-clipping
    if (voxelPrimitive.ready) {
      voxelPrimitive.minClippingBounds = new Cesium.Cartesian3(
        0,
        0,
        -Infinity,
      );
      voxelPrimitive.maxClippingBounds = new Cesium.Cartesian3(1, 1, Infinity);
    }

    // Restore basemap opacity
    if (savedBasemapOpacity !== null) {
      applyBasemapOpacity(savedBasemapOpacity);
      savedBasemapOpacity = null;
    }

    // Ensure clean state: buildings on, GeoTOP off
    setBuildingsVisible(true);
    setGeoTOPEnabled(false);

    btn.textContent = btn.dataset.label;
    btn.classList.remove("running");
  }

  function getProviderBounds() {
    const p = voxelPrimitive;
    if (p.provider?.minBounds && p.provider?.maxBounds) {
      return { min: p.provider.minBounds, max: p.provider.maxBounds };
    }
    if (p.minBounds && p.maxBounds) {
      return { min: p.minBounds, max: p.maxBounds };
    }
    const r = p.boundingSphere.radius;
    return { min: { z: -r }, max: { z: r } };
  }

  function start() {
    if (listener) {
      stop();
      return;
    }

    savedBasemapOpacity =
      viewer.imageryLayers.length > 0 ? viewer.imageryLayers.get(0).alpha : 1;

    btn.textContent = "■ Stop";
    btn.classList.add("running");

    const duration = KEYFRAMES.at(-1)[0];
    startTime = null;

    listener = () => {
      const now = performance.now();
      if (startTime === null) startTime = now;
      const t = (now - startTime) / 1000;

      if (t >= duration) {
        stop();
        return;
      }

      // Find surrounding keyframes
      let prev = KEYFRAMES[0],
        next = KEYFRAMES.at(-1);
      for (let i = 0; i < KEYFRAMES.length - 1; i++) {
        if (t >= KEYFRAMES[i][0] && t <= KEYFRAMES[i + 1][0]) {
          prev = KEYFRAMES[i];
          next = KEYFRAMES[i + 1];
          break;
        }
      }

      const span = next[0] - prev[0];
      const alpha = span > 0 ? easeInOut((t - prev[0]) / span) : 1;
      const mix = (a, b) => a + (b - a) * alpha;

      // Camera orbit around the CPT site
      const heading = Cesium.Math.toRadians(
        HEADING_OFFSET_DEG + t * ORBIT_DEG_PER_SEC,
      );
      const pitch = Cesium.Math.toRadians(mix(prev[1], next[1]));
      const range = mix(prev[2], next[2]);
      camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));

      // Voxel opacity
      const opacity = mix(prev[5], next[5]);
      if (voxelPrimitive.customShader?.uniforms?.u_opacity) {
        voxelPrimitive.customShader.uniforms.u_opacity.value = opacity;
      }

      // Basemap opacity
      applyBasemapOpacity(mix(prev[6], next[6]));

      // Z clipping
      if (voxelPrimitive.ready) {
        const zLo = mix(prev[3], next[3]);
        const zHi = mix(prev[4], next[4]);
        const bounds = getProviderBounds();
        const zRange = bounds.max.z - bounds.min.z;
        const lo = zLo <= 0.001 ? -Infinity : bounds.min.z + zLo * zRange;
        const hi = zHi >= 0.999 ? Infinity : bounds.min.z + zHi * zRange;
        voxelPrimitive.minClippingBounds = new Cesium.Cartesian3(0, 0, lo);
        voxelPrimitive.maxClippingBounds = new Cesium.Cartesian3(1, 1, hi);
      }

      // One-shot events
      for (const event of EVENTS) {
        if (t >= event.time && !firedEvents.has(event.action)) {
          firedEvents.add(event.action);

          if (event.action === "enableGeoTOP") {
            setGeoTOPEnabled(true);
            if (voxelPrimitive.customShader?.uniforms?.u_opacity) {
              voxelPrimitive.customShader.uniforms.u_opacity.value = 0;
            }
          }

          if (event.action === "disableGeoTOP") {
            setGeoTOPEnabled(false);
          }

          if (event.action === "hideBuildings") {
            setBuildingsVisible(false);
          }

          if (event.action === "showBuildings") {
            setBuildingsVisible(true);
          }
        }
      }
    };

    scene.preUpdate.addEventListener(listener);
  }

  btn.addEventListener("click", start);
  controlsPanel.body.appendChild(btn);
}
