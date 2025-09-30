import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";

const layers = [
  {
    type: "limestone",
    baseThickness: 0.15,
    variation: { x: 0.05, z: 0.03 },
    color: "hsl(106, 3%, 53%)",
    name: "Limestone/Chalk",
  },
  {
    type: "sand",
    baseThickness: 0.25,
    variation: { x: 0.08, z: 0.12 },
    color: "hsl(34, 20%, 50%)",
    name: "Sand/Pleistocene deposits",
  },
  {
    type: "limestone",
    baseThickness: 0.2,
    variation: { x: 0.06, z: 0.04 },
    color: "#806c4f",
    name: "Limestone/Marl",
  },
  {
    type: "shale",
    baseThickness: 0.2,
    variation: { x: 0.04, z: 0.08 },
    color: "#97b38f",
    name: "Clay/Shale",
  },
  {
    type: "silt",
    baseThickness: 0.18,
    variation: { x: 0.07, z: 0.05 },
    color: "#4b6647",
    name: "Silt/Loam",
  },
  {
    type: "clay",
    baseThickness: 0.22,
    variation: { x: 0.09, z: 0.06 },
    color: "hsl(111, 15%, 43%)",
    name: "Clay/Tertiary deposits",
  },
];

const createHorizontalLinesTexture = (baseColor) => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 64, 64);

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;

  for (let y = 4; y < 64; y += 8) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(64, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
};

const createThinHorizontalLinesTexture = (baseColor) => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 64, 64);

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 0.5;

  for (let y = 2; y < 64; y += 4) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(64, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
};

const createDotsTexture = (baseColor) => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 64, 64);

  ctx.fillStyle = "#000000";

  for (let x = 8; x < 64; x += 16) {
    for (let y = 8; y < 64; y += 16) {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
};

const createSmallDotsTexture = (baseColor) => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 64, 64);

  ctx.fillStyle = "#000000";

  for (let x = 6; x < 64; x += 12) {
    for (let y = 6; y < 64; y += 12) {
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
};

const createDashedLinesTexture = (baseColor) => {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 64, 64);

  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 1;
  ctx.setLineDash([4, 4]);

  for (let y = 6; y < 64; y += 12) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(64, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
};

function generateGeologicalData() {
  const resolution = 8;
  const blockSize = 2;
  const segmentSize = blockSize / resolution;
  const allLayerData = [];

  let currentBottom = Array.from({ length: resolution }, () =>
    Array.from({ length: resolution }, () => -0.6)
  );

  layers.forEach((layer, layerIndex) => {
    const layerSegments = [];
    const layerTop = Array.from({ length: resolution }, () =>
      Array(resolution)
    );

    for (let i = 0; i < resolution; i++) {
      for (let j = 0; j < resolution; j++) {
        const x = (i - resolution / 2 + 0.5) * segmentSize;
        const z = (j - resolution / 2 + 0.5) * segmentSize;

        const bottomY = currentBottom[i][j];
        const isTopLayer = layerIndex === layers.length - 1;

        let topY;
        if (isTopLayer) {
          topY = 0.6;
        } else {
          const xVariation = Math.sin(x * 2 + layerIndex) * layer.variation.x;
          const zVariation =
            Math.cos(z * 1.5 + layerIndex * 0.7) * layer.variation.z;
          const randomVariation = (Math.random() - 0.5) * 0.06;
          const thickness = Math.max(
            0.02,
            layer.baseThickness + xVariation + zVariation + randomVariation
          );
          topY = bottomY + thickness;
        }

        const actualThickness = topY - bottomY;
        layerTop[i][j] = topY;

        layerSegments.push({
          position: [x, bottomY + actualThickness / 2, z],
          thickness: actualThickness,
          key: `${i}-${j}`,
        });
      }
    }

    allLayerData.push({
      layer,
      layerIndex,
      segments: layerSegments,
    });

    currentBottom = layerTop;
  });

  return allLayerData;
}

function GeologicalLayer({ layerData }) {
  const texture = useMemo(() => {
    const baseColor = layerData.layer.color;
    switch (layerData.layer.type) {
      case "limestone":
        return createHorizontalLinesTexture(baseColor);
      case "shale":
        return createThinHorizontalLinesTexture(baseColor);
      case "sand":
        return createDotsTexture(baseColor);
      case "silt":
        return createSmallDotsTexture(baseColor);
      case "clay":
        return createDashedLinesTexture(baseColor);
      default:
        return createHorizontalLinesTexture(baseColor);
    }
  }, [layerData.layer]);

  return (
    <group>
      {layerData.segments.map((segment) => (
        <mesh
          key={segment.key}
          position={segment.position}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.24, segment.thickness, 0.24]} />
          <meshLambertMaterial map={texture} />
        </mesh>
      ))}
    </group>
  );
}

function GeologicalBlock() {
  const geologicalData = useMemo(() => generateGeologicalData(), []);

  return (
    <group>
      {geologicalData.map((layerData, index) => (
        <GeologicalLayer
          key={`${layerData.layer.type}-${index}`}
          layerData={layerData}
        />
      ))}
    </group>
  );
}

export function GeologicalModel({ width = 300, height = 300 }) {
  return (
    <div
      className="mx-auto my-auto shrink-0 min-w-0 aspect-square "
      style={{
        maxWidth: width,
        maxWeight: height,
      }}
    >
      <Canvas
        shadows
        camera={{ position: [1.8, 1.8, 1.8], fov: 75 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[1, 1, 1]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
        />

        <GeologicalBlock />
      </Canvas>
    </div>
  );
}
