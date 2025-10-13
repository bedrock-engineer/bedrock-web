// Legend generation functions
// Adapted from https://observablehq.com/@d3/color-legend
export function createSequentialLegend({
  scale,
  title,
  width = 200,
  height = 20,
}) {
  const container = document.createElement("section");
  container.classList.add("legend-section");

  const titleEl = document.createElement("h4");
  titleEl.textContent = title;
  container.appendChild(titleEl);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = "block";
  canvas.style.marginBottom = "4px";
  canvas.style.border = "1px solid #d9d9d9";
  const context = canvas.getContext("2d");

  const [start, end] = scale.domain();

  for (let i = 0; i < width; ++i) {
    const value = start + ((end - start) * i) / (width - 1);
    context.fillStyle = scale(value);
    context.fillRect(i, 0, 1, height);
  }

  // Add min/max labels
  const labelsDiv = document.createElement("div");
  labelsDiv.style.display = "flex";
  labelsDiv.style.justifyContent = "space-between";
  labelsDiv.style.fontSize = "10px";
  labelsDiv.innerHTML = `<span>${start}</span><span>${end}</span>`;

  container.appendChild(canvas);
  container.appendChild(labelsDiv);

  return container;
}

export function createOrdinalLegend({ scale, title, config = null }) {
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
    // config can be an object with label/color properties or just strings
    const displayName = config?.[value]
      ? typeof config[value] === "object"
        ? config[value].label
        : config[value]
      : value;

    item.innerHTML = `
      <div class="legend-circle" style="background-color: ${scale(
        value
      )}"></div>
      <span>${displayName}</span>
    `;
    itemsDiv.appendChild(item);
  });

  container.appendChild(itemsDiv);
  return container;
}
