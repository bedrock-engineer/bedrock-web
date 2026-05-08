import type { ImageMetadata } from "astro";

import kaiTakCesium from "../assets/hk_kaitak_cesium.webp";
import broXmlApp from "../assets/bro-viewer.png";
import gefApp from "../assets/gef.webp";
import amsterdamNoord from "../assets/nl-amsterdam-noord.webp";
import geotop from "../assets/geotop.png";
import antwerpen from "../assets/antwerpen.png";
import broCpt from "../assets/bro-cpt.png";
import kaiTakSpeckle from "../assets/KaiTak_BrGI_Speckle.png";
import amsterdamSpeckle from "../assets/amsterdam-noord-speckle.png";
import wekaHills from "../assets/WekaHills_Speckle.webp";
import zalmhaven from "../assets/zalmhaven.jpeg";

export type Country = "NL" | "UK" | "HK" | "NO" | "NZ" | "BE";
export type DemoType = "BIM" | "GIS" | "Web app";
export type SourceData = "BRO-XML" | "GEF" | "AGS" | "CSV" | "NetCDF";
export type GroundModel =
  | "Voxel"
  | "Mesh"
  | "Geological"
  | "Geophysical"
  | "Geotechnical"
  | "Geohydrological";

export interface Demo {
  id: string;
  title: string;
  description: string;
  href?: string;
  linkText?: string;
  image: ImageMetadata;
  imageAlt?: string;
  country: Country;
  type: DemoType[];
  sourceData: SourceData[];
  gm: GroundModel[];
}

export const demos: Demo[] = [
  {
    id: "kai-tak-cesium",
    title: "Kai Tak, Hong Kong - CesiumJS",
    description:
      "Ground investigation data from Kai Tak, Hong Kong visualized in an interactive CesiumJS map. Borehole locations, SPT results, and weathering grades in 3D, transformed from AGS3 to GeoJSON with bedrock-ge.",
    href: "https://bedrock.engineer/hk-kaitak",
    linkText: "Explore demo",
    image: kaiTakCesium,
    country: "HK",
    type: ["Web app", "GIS"],
    sourceData: ["AGS"],
    gm: ["Geotechnical"],
  },
  {
    id: "bro-xml-viewer",
    title: "BRO/XML File Viewer",
    description:
      "Free web-based viewer for BRO/XML (Basisregistratie Ondergrond) files. Upload and visualize CPT, geotechnical borehole and lab analysis, and geological borehole data in your browser.",
    href: "https://bro.bedrock.engineer",
    linkText: "Open BRO/XML viewer",
    image: broXmlApp,
    country: "NL",
    type: ["Web app"],
    sourceData: ["BRO-XML"],
    gm: ["Geotechnical", "Geological"],
  },
  {
    id: "gef-viewer",
    title: "GEF File Viewer",
    description:
      "Free web-based viewer for GEF (Geotechnical Exchange Format) files. Upload and visualize CPT and bore data in your browser.",
    href: "https://gef.bedrock.engineer",
    linkText: "Open GEF viewer",
    image: gefApp,
    country: "NL",
    type: ["Web app"],
    sourceData: ["GEF"],
    gm: ["Geotechnical"],
  },
  {
    id: "amsterdam-noord-cesium",
    title: "Amsterdam Noord - CesiumJS",
    description:
      "Interactive 3D web map combining interpreted CPT data, the 3DBag building dataset, and the GeoTOP geological model in Amsterdam Noord, rendered in CesiumJS.",
    href: "https://bedrock.engineer/nl-amsterdam-noord",
    linkText: "Explore demo",
    image: amsterdamNoord,
    country: "NL",
    type: ["Web app", "GIS"],
    sourceData: ["BRO-XML"],
    gm: ["Geotechnical", "Geological"],
  },
  {
    id: "geotop-voxels-cesium",
    title: "GeoTOP Voxels - CesiumJS",
    description:
      "The Dutch GeoTOP shallow subsurface model rendered in 3D in a browser for the first time. 100×100×0.5 m voxels with lithoclass information across Amsterdam, Delft, and Utrecht using CesiumJS with the 3D Tiles Voxel extension.",
    href: "https://bedrock.engineer/geotop-voxels",
    linkText: "Explore demo",
    image: geotop,
    country: "NL",
    type: ["Web app", "GIS"],
    sourceData: ["NetCDF"],
    gm: ["Voxel", "Geological"],
  },
  {
    id: "antwerp-cesium",
    title: "Antwerp Geological Model - CesiumJS",
    description:
      "The Flemish DOV shallow subsurface model of Antwerp and its harbor as 3D Tiles Voxels in CesiumJS. 25×25×0.5 m voxels — over 21 million in total — with proportional lithology (peat, clay, silt, sand, gravel) from surface to 50 m depth.",
    href: "https://antwerpen.bedrock.engineer",
    linkText: "Explore demo",
    image: antwerpen,
    country: "BE",
    type: ["Web app", "GIS"],
    sourceData: ["NetCDF"],
    gm: ["Voxel", "Geological"],
  },
  {
    id: "bro-cpt-maplibre",
    title: "Dutch BRO CPTs - MapLibre GL & PMTiles",
    description:
      "All 237,297 Cone Penetration Tests from the Dutch subsurface registry rendered instantly in the browser with MapLibre GL. Zoom, filter, and recolor without lag from a 35 MB PMTiles file served as a static asset.",
    href: "https://bedrock.engineer/bro-cpt",
    linkText: "Explore demo",
    image: broCpt,
    country: "NL",
    type: ["Web app", "GIS"],
    sourceData: ["BRO-XML"],
    gm: ["Geotechnical"],
  },
  {
    id: "kai-tak-speckle",
    title: "Kai Tak - Speckle",
    description:
      "Building models from Revit and Civil3D combined with geotechnical data in Speckle. View subsurface conditions alongside structural designs.",
    href: "https://app.speckle.systems/projects/dea5d61543/models/9962662abe,c82c54493a#savedView%3D%7B%2522id%2522%3A%2522a2369ea45a%2522%7D",
    linkText: "Open in Speckle",
    image: kaiTakSpeckle,
    imageAlt: "Kai Tak GI data in Speckle with 3D buildings",
    country: "HK",
    type: ["BIM"],
    sourceData: ["AGS"],
    gm: ["Geotechnical"],
  },
  {
    id: "amsterdam-noord-speckle",
    title: "Amsterdam Noord - Speckle",
    description:
      "Subsurface data from Amsterdam Noord visualized in Speckle for multi-disciplinary collaboration and BIM integration.",
    href: "https://app.speckle.systems/projects/d083a8bd5c/models/7d52f6a137,8e05ffa635,90726f9281,95af0442f1,f96a046aed#savedView%3D%7B%2522id%2522%3A%2522faa8d15f95%2522%7D",
    linkText: "Open in Speckle",
    image: amsterdamSpeckle,
    imageAlt: "Amsterdam Noord in Speckle",
    country: "NL",
    type: ["BIM"],
    sourceData: ["BRO-XML"],
    gm: ["Geotechnical"],
  },
  {
    id: "weka-hills-speckle",
    title: "Weka Hills - Speckle",
    description:
      "Geological data visualization in Speckle showing subsurface conditions for infrastructure planning and design coordination.",
    href: "https://app.speckle.systems/projects/bc2ef86a30/models/53ad71f84a,639810d7b2,6dcde3dafa,7d83fae8e5#savedView%3D%7B%2522id%2522%3A%2522025a4dcbd1%2522%7D",
    linkText: "Open in Speckle",
    image: wekaHills,
    imageAlt: "Weka Hills project in Speckle",
    country: "NZ",
    type: ["BIM"],
    sourceData: ["AGS"],
    gm: ["Geological"],
  },
  {
    id: "rotterdam-speckle",
    title: "Rotterdam Buildings & GeoTOP - Speckle",
    description:
      "Prominent Rotterdam buildings (Zalmhaven, Maastoren, Blaak/Markthal) shown in Speckle with their foundations and the GeoTOP voxel model — the first 50 m of Dutch subsurface as 100×100×0.5 m voxels with lithoclass and lithology information.",
    image: zalmhaven,
    imageAlt:
      "Building model of the De Zalmhaven along with foundation and GeoTOP voxel model in Speckle",
    country: "NL",
    type: ["BIM"],
    sourceData: ["NetCDF"],
    gm: ["Voxel", "Geological"],
  },
];

export const demosById: Record<string, Demo> = Object.fromEntries(
  demos.map((d) => [d.id, d]),
);

const canonicalOrder = {
  country: ["NL", "UK", "HK", "NO", "NZ", "BE"] satisfies Country[],
  type: ["BIM", "GIS", "Web app"] satisfies DemoType[],
  sourceData: ["BRO-XML", "GEF", "AGS", "CSV", "NetCDF"] satisfies SourceData[],
  gm: [
    "Voxel",
    "Mesh",
    "Geological",
    "Geophysical",
    "Geotechnical",
    "Geohydrological",
  ] satisfies GroundModel[],
};

const inUse = <T extends string>(values: T[], canonical: readonly T[]): T[] =>
  canonical.filter((c) => values.includes(c));

export const availableTags = {
  country: inUse(
    demos.map((d) => d.country),
    canonicalOrder.country,
  ),
  type: inUse(
    demos.flatMap((d) => d.type),
    canonicalOrder.type,
  ),
  sourceData: inUse(
    demos.flatMap((d) => d.sourceData),
    canonicalOrder.sourceData,
  ),
  gm: inUse(
    demos.flatMap((d) => d.gm),
    canonicalOrder.gm,
  ),
};

export const tagDimensions = [
  { key: "country", label: "Country" },
  { key: "type", label: "Type" },
  { key: "sourceData", label: "Source data" },
  { key: "gm", label: "Ground model" },
] as const;
