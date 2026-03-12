// Reusable UI components for CesiumJS voxel demos.
// Copy this file (and components.css) into a new demo folder to reuse.

// ---------------------------------------------------------------------------
// Panel arrow SVG (shared across all panels)
// ---------------------------------------------------------------------------
const ARROW_SVG = `<svg class="panel-arrow" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M3 5l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// ---------------------------------------------------------------------------
// createPanel
// Collapsible panel using <details>/<summary>. Optionally draggable via
// Draggabilly (loaded globally). Drag handle is the summary bar — inputs,
// sliders, and buttons inside .panel-body remain interactive.
//
// Returns { el, body, details } — append content to `body`.
// ---------------------------------------------------------------------------
export function createPanel({ title, open = true, draggable = true } = {}) {
  const panel = document.createElement("div");
  panel.className = "panel";

  const details = document.createElement("details");
  if (open) details.open = true;

  const summary = document.createElement("summary");
  summary.innerHTML = `<span class="panel-title">${title}</span>${ARROW_SVG}`;

  const body = document.createElement("div");
  body.className = "panel-body";

  details.append(summary, body);
  panel.appendChild(details);

  if (draggable && typeof Draggabilly !== "undefined") {
    panel.classList.add("is-draggable");

    // Convert any right/bottom CSS positioning to left/top on first drag
    // so Draggabilly can track position correctly.
    let positionConverted = false;

    const draggie = new Draggabilly(panel, { handle: "summary" });
    // Draggabilly sets position:relative on detached elements (getComputedStyle
    // returns 'static' before DOM insertion). Force absolute back.
    panel.style.position = "absolute";

    draggie.on("dragStart", () => {
      panel.classList.add("is-dragging");
      if (!positionConverted) {
        const rect = panel.getBoundingClientRect();
        panel.style.left = rect.left + "px";
        panel.style.top = rect.top + "px";
        panel.style.right = "";
        panel.style.bottom = "";
        positionConverted = true;
      }
    });

    draggie.on("dragEnd", () => {
      panel.classList.remove("is-dragging");
    });

    // Draggabilly suppresses click during drag, so the native
    // <details> toggle only fires on a true click (no movement).
    // If that ever breaks, uncomment the staticClick fallback:
    //
    // summary.addEventListener('click', e => e.preventDefault());
    // draggie.on('staticClick', () => { details.open = !details.open; });
  }

  return { el: panel, body, details };
}

// ---------------------------------------------------------------------------
// createRangeSlider
// Multi-thumb range slider. Creates its own DOM, returns { el, interval }.
// interval.value → [min, max]; interval.value = [a, b] sets programmatically.
// el dispatches 'input' events when the value changes.
// ---------------------------------------------------------------------------
export function createRangeSlider({
  label = "",
  min = 0,
  max = 1,
  step = 0.01,
  value,
  format,
} = {}) {
  value = value ?? [min, max];
  format = format ?? (([a, b]) => `${a.toFixed(2)} – ${b.toFixed(2)}`);

  const row = document.createElement("div");
  row.className = "clip-row";
  row.innerHTML = `
    <span class="clip-axis-label">${label}</span>
    <div class="clip-range-slider">
      <div class="range-track">
        <div class="range-track-zone">
          <div class="range-select">
            <div class="thumb thumb-min"></div>
            <div class="thumb thumb-max"></div>
          </div>
        </div>
      </div>
    </div>
    <output class="clip-range-output"></output>
  `;

  const zone = row.querySelector(".range-track-zone");
  const select = row.querySelector(".range-select");
  const thumbMin = row.querySelector(".thumb-min");
  const thumbMax = row.querySelector(".thumb-max");
  const output = row.querySelector("output");

  const clamp = (a, b, v) => Math.min(Math.max(v, a), b);
  let current = [...value];

  function sanitize(a, b) {
    a = isNaN(a) ? min : clamp(min, max, a);
    b = isNaN(b) ? max : clamp(min, max, b);
    return [Math.min(a, b), Math.max(a, b)];
  }

  function ratio(v) {
    return (v - min) / (max - min);
  }

  function render() {
    const [vmin, vmax] = current;
    row.style.setProperty("--range-min", ratio(vmin) * 100 + "%");
    row.style.setProperty("--range-max", ratio(vmax) * 100 + "%");
    output.textContent = format(current);
  }

  function setValue(a, b) {
    current = sanitize(a, b);
    render();
    row.dispatchEvent(new Event("input"));
  }

  function ptr(e) {
    return e.touches ? e.touches[0] : e;
  }

  let dragTarget = null;
  let startX = 0;
  let startValue = null;

  function onMove(e) {
    if (!dragTarget) return;
    const rect = zone.getBoundingClientRect();
    const delta = ((ptr(e).clientX - startX) / rect.width) * (max - min);
    const [a, b] = startValue;

    if (dragTarget === thumbMin) {
      setValue(a + delta, b);
    } else if (dragTarget === thumbMax) {
      setValue(a, b + delta);
    } else {
      const width = b - a;
      const newMin = clamp(min, max - width, a + delta);
      setValue(newMin, newMin + width);
    }
    e.preventDefault();
  }

  function stopMove() {
    dragTarget = null;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", stopMove);
    document.removeEventListener("touchmove", onMove);
    document.removeEventListener("touchend", stopMove);
  }

  function startMove(e) {
    dragTarget = e.target;
    startX = ptr(e).clientX;
    startValue = [...current];
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", stopMove);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("touchend", stopMove);
  }

  thumbMin.addEventListener("mousedown", startMove);
  thumbMax.addEventListener("mousedown", startMove);
  select.addEventListener("mousedown", startMove);
  thumbMin.addEventListener("touchstart", startMove);
  thumbMax.addEventListener("touchstart", startMove);
  select.addEventListener("touchstart", startMove);

  zone.addEventListener("click", (e) => {
    if (dragTarget) return;
    const rect = zone.getBoundingClientRect();
    const t = clamp(0, 1, (ptr(e).clientX - rect.left) / rect.width);
    const v = min + t * (max - min);
    const [a, b] = current;
    const d = b - a;
    if (v < a) setValue(v, v + d);
    else if (v > b) setValue(v - d, v);
  });

  setValue(...value);

  return {
    el: row,
    interval: {
      get value() {
        return [...current];
      },
      set value(v) {
        setValue(v[0], v[1]);
      },
    },
  };
}

export function createClippingControlsZ(voxelPrimitive, { onReset } = {}) {
  const formatPercentage = ([a, b]) =>
    `${(a * 100).toFixed(0)}–${(b * 100).toFixed(0)}%`;
  const opts = {
    min: 0,
    max: 1,
    step: 0.01,
    value: [0, 1],
    format: formatPercentage,
  };

  const { el: zEl, interval: z } = createRangeSlider({ label: "Z", ...opts });

  const resetBtn = document.createElement("button");
  resetBtn.className = "btn btn--accent";
  resetBtn.type = "button";
  resetBtn.textContent = "Reset";

  const el = document.createElement("div");
  el.className = "clipping-controls";

  const label = document.createElement("div");
  label.className = "section-label";
  label.textContent = "Clipping";
  el.append(label, zEl, resetBtn);

  function getBounds() {
    const p = voxelPrimitive;
    if (p.provider?.minBounds && p.provider?.maxBounds) {
      return { min: p.provider.minBounds, max: p.provider.maxBounds };
    }
    if (p.minBounds && p.maxBounds) {
      return { min: p.minBounds, max: p.maxBounds };
    }
    const r = p.boundingSphere.radius;

    return {
      min: { x: -r, y: -r, z: -r },
      max: { x: r, y: r, z: r },
    };
  }

  function toMin(t, lo, hi) {
    return t <= 0.001 ? -Infinity : lo + t * (hi - lo);
  }
  function toMax(t, lo, hi) {
    return t >= 0.999 ? Infinity : lo + t * (hi - lo);
  }

  function update() {
    const { min, max } = getBounds();

    const [zLo, zHi] = z.value;
    voxelPrimitive.minClippingBounds = new Cesium.Cartesian3(
      0,
      0,
      toMin(zLo, min.z, max.z),
    );
    voxelPrimitive.maxClippingBounds = new Cesium.Cartesian3(
      1,
      1,
      toMax(zHi, min.z, max.z),
    );
  }

  zEl.addEventListener("input", update);

  resetBtn.addEventListener("click", () => {
    z.value = [0, 1];
    update();
    onReset?.();
  });

  return el
}


// ---------------------------------------------------------------------------
// createBasemapOpacitySlider
// Slider that scales both the imagery layer alpha and globe translucency together.
// nearAlpha/farAlpha are the full-opacity values for frontFaceAlphaByDistance.
// Returns { el }.
// ---------------------------------------------------------------------------
export function createBasemapOpacitySlider(
  viewer,
  { globe, nearAlpha = 0.1, farAlpha = 1.0, value = 1 } = {},
) {
  const el = document.createElement("div");
  el.className = "labeled-slider";
  el.innerHTML = `
    <label>Basemap Opacity</label>
    <input type="range" min="0" max="1" step="0.05" value="${value}" />
  `;

  function apply(v) {
    for (let i = 0; i < viewer.imageryLayers.length; i++) {
      viewer.imageryLayers.get(i).alpha = v;
    }
    if (globe) {
      globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(
        200,
        nearAlpha * v,
        800,
        farAlpha * v,
      );
    }
  }

  apply(value);
  el.querySelector("input").addEventListener("input", (e) =>
    apply(e.target.valueAsNumber),
  );
  return { el };
}

// ---------------------------------------------------------------------------
// createVerticalExaggerationSlider
// Slider that controls scene.verticalExaggeration, with a value readout.
// Returns { el, value } — set value programmatically to sync scene + DOM.
// ---------------------------------------------------------------------------
export function createVerticalExaggerationSlider(
  scene,
  { min = 1, max = 70, step = 1, value = 1 } = {},
) {
  const el = document.createElement("div");
  el.className = "labeled-slider";
  el.innerHTML = `
    <div class="slider-header">
      <label>Verticale overdrijving</label>
      <output class="slider-value">${value}×</output>
    </div>
    <input type="range" min="${min}" max="${max}" step="${step}" value="${value}" />
  `;

  const input = el.querySelector("input");
  const display = el.querySelector("output.slider-value");

  function set(v) {
    v = Math.min(max, Math.max(min, v));
    input.value = v;
    display.textContent = `${Math.round(v)}×`;
    scene.verticalExaggeration = v;
  }

  input.addEventListener("input", (e) => set(e.target.valueAsNumber));
  set(value);

  return {
    el,
    get value() {
      return scene.verticalExaggeration;
    },
    set value(v) {
      set(v);
    },
  };
}

// ---------------------------------------------------------------------------
// createSequentialLegend
// Canvas-based gradient legend for continuous scales (e.g. d3.scaleSequential).
// Returns a DOM element (not wrapped).
// ---------------------------------------------------------------------------
export function createSequentialLegend({
  scale,
  title,
  width = 200,
  height = 16,
} = {}) {
  const container = document.createElement("div");
  container.className = "legend-content";

  if (title) {
    const h = document.createElement("div");
    h.className = "section-label";
    h.textContent = title;
    container.appendChild(h);
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = "block";
  canvas.style.width = "100%";
  canvas.style.height = height + "px";
  canvas.style.borderRadius = "2px";
  canvas.style.marginTop = "6px";
  const context = canvas.getContext("2d");

  const [start, end] = scale.domain();
  for (let i = 0; i < width; ++i) {
    context.fillStyle = scale(start + ((end - start) * i) / (width - 1));
    context.fillRect(i, 0, 1, height);
  }

  const labelsDiv = document.createElement("div");
  labelsDiv.style.display = "flex";
  labelsDiv.style.justifyContent = "space-between";
  labelsDiv.style.fontSize = "10px";
  labelsDiv.style.color = "var(--ui-text-muted)";
  labelsDiv.style.marginTop = "4px";
  labelsDiv.innerHTML = `<span>${start}</span><span>${end}</span>`;

  container.append(canvas, labelsDiv);
  return container;
}

// ---------------------------------------------------------------------------
// createLegend
// Toggleable color legend. Creates its own DOM, returns the element.
// items: [{ label, color, group?, badge?, visible? }]
// onToggle: (index, visible) => void
// ---------------------------------------------------------------------------
export function createLegend({ title, items = [], onToggle } = {}) {
  const container = document.createElement("div");
  container.className = "legend-content";

  if (title) {
    const h = document.createElement("h3");
    h.textContent = title;
    container.appendChild(h);
  }

  let currentGroup = undefined;

  items.forEach((item, index) => {
    const { label, color, group, badge, visible = true } = item;

    if (group !== undefined && group !== currentGroup) {
      currentGroup = group;
      if (group) {
        const header = document.createElement("div");
        header.className = "legend-period";
        header.textContent = group;
        container.appendChild(header);
      }
    }

    const div = document.createElement("div");
    div.className = "legend-item";
    if (!visible) div.classList.add("legend-item--hidden");

    const swatch = document.createElement("button");
    swatch.className = "legend-swatch";
    swatch.style.background = color;
    if (!onToggle) swatch.style.pointerEvents = "none";
    else swatch.title = `Toggle ${label}`;

    const labelEl = document.createElement("span");
    labelEl.textContent = label;

    div.append(swatch, labelEl);

    if (badge !== undefined) {
      const badgeEl = document.createElement("span");
      badgeEl.className = "legend-number";
      badgeEl.textContent = badge;
      div.appendChild(badgeEl);
    }

    container.appendChild(div);

    swatch.addEventListener("click", () => {
      item.visible = !item.visible;
      div.classList.toggle("legend-item--hidden", !item.visible);
      onToggle?.(index, item.visible);
    });
  });

  return container;
}
