import type { ImageMetadata } from "astro";

// Demos hosted on the main domain (separate deploys routed under bedrock.engineer).
// Subdomain demos below keep their full URLs — they are different origins.
const SITE = import.meta.env.SITE;

import kaiTakCesium from "../assets/hk_kaitak_cesium.webp";
import broXmlApp from "../assets/bro-viewer.png";
import gefApp from "../assets/gef.webp";
import amsterdamNoord from "../assets/nl-amsterdam-noord.webp";
import geotop from "../assets/geotop-fences.png";
import antwerpen from "../assets/antwerpen.png";
import broCpt from "../assets/bro-cpt.png";
import emeraldFre16 from "../assets/emerald-fre16.png";
import wekaHills from "../assets/WekaHills_Speckle.webp";
import zalmhaven from "../assets/zalmhaven.jpeg";
import ifcGeoreferencer from "../assets/ifc-georeferencer.png";
import tnw from "../assets/tnw.png";

export type Country = "NL" | "UK" | "HK" | "NO" | "NZ" | "BE";
export type DemoType = "BIM" | "GIS" | "Web app";
export type SourceData =
  | "BRO-XML"
  | "GEF"
  | "AGS"
  | "CSV"
  | "NetCDF"
  | "SEG-Y"
  | "IFC";
export type GroundModel =
  | "Voxel"
  | "Mesh"
  | "Geological"
  | "Geophysical"
  | "Geotechnical"
  | "Geohydrological"
  | "Structural";

// "tool" = a free, usable browser app; "demo" = an example visualization of our work.
export type Category = "tool" | "demo";

export interface DemoLink {
  href: string;
  label: string;
  // A subtitle under the label, e.g. which model of a Speckle demo
  detail?: string;
}

export interface Demo {
  id: string;
  title: string;
  description: string;
  category: Category;
  href?: string;
  linkText?: string;
  image: ImageMetadata;
  imageAlt?: string;
  badge?: string;
  links?: DemoLink[];
  country?: Country;
  type: DemoType[];
  sourceData: SourceData[];
  gm: GroundModel[];
}

export const demos: Demo[] = [
  {
    id: "kai-tak",
    title: "Kai Tak, Hong Kong",
    description:
      "Ground investigation data from Kai Tak, Hong Kong, transformed from AGS3 with bedrock-ge. Borehole locations, SPT results and weathering grades in a 3D web map, and alongside building models from Revit and Civil3D in a web-based BIM viewer.",
    category: "demo",
    href: `${SITE}/hk-kaitak`,
    links: [
      {
        href: `${SITE}/hk-kaitak`,
        label: "Explore CesiumJS demo",
        detail: "GIS",
      },
      {
        href: "https://speckle.bedrock.engineer/projects/aa7ceaba47/models/all",
        label: "Explore Speckle demo",
        detail: "BIM",
      },
    ],
    image: kaiTakCesium,
    country: "HK",
    type: ["Web app", "GIS", "BIM"],
    sourceData: ["AGS"],
    gm: ["Geotechnical"],
  },
  {
    id: "bro-xml-viewer",
    title: "BRO/XML File Viewer",
    description:
      "Free web-based viewer for BRO/XML (Basisregistratie Ondergrond) files. Upload and visualize CPT, geotechnical borehole and lab analysis, and geological borehole data in your browser.",
    category: "tool",
    href: "https://bro.bedrock.engineer",
    linkText: "Open BRO/XML viewer",
    links: [{ href: "/nl/bro-xml", label: "What we build with BRO/XML (Dutch)" }],
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
    category: "tool",
    href: "https://gef.bedrock.engineer",
    linkText: "Open GEF viewer",
    image: gefApp,
    country: "NL",
    type: ["Web app"],
    sourceData: ["GEF"],
    gm: ["Geotechnical"],
  },
  {
    id: "ifc-georeferencer",
    title: "IFC Georeferencer",
    description:
      "Georeference an IFC file in your browser. Place the model on a map or enter survey points, solve a Helmert transformation, and download an IFC with correct IfcMapConversion and IfcProjectedCRS entities.",
    category: "tool",
    href: "https://geo.buildingsmart.nl",
    linkText: "Open IFC Georeferencer",
    badge: "Built for buildingSMART NL",
    links: [
      {
        href: "https://www.buildingsmart.nl/projecten/georefereren-ifc",
        label: "buildingSMART NL georeferencing guideline",
      },
      {
        href: "https://github.com/bedrock-engineer/ifc-georeferencer",
        label: "Source on GitHub",
      },
    ],
    image: ifcGeoreferencer,
    imageAlt: "IFC model placed on a map in the IFC Georeferencer browser tool",
    type: ["Web app", "BIM"],
    sourceData: ["IFC"],
    gm: ["Structural"],
  },
  {
    id: "amsterdam-noord",
    title: "Amsterdam Noord",
    description:
      "Interpreted CPT data, the GeoTOP geological model and 3D BAG buildings in Amsterdam Noord in a 3D web map, and the subsurface data next to BIM models in a web-based BIM viewer.",
    category: "demo",
    href: `${SITE}/nl-amsterdam-noord`,
    links: [
      {
        href: `${SITE}/nl-amsterdam-noord`,
        label: "Explore CesiumJS demo",
        detail: "GIS",
      },
      {
        href: "https://speckle.bedrock.engineer/projects/03f6fd3bc9/models/all",
        label: "Explore Speckle demo",
        detail: "BIM",
      },
    ],
    image: amsterdamNoord,
    imageAlt:
      "Amsterdam Noord in 3D: interpreted CPTs, the Overhoeks towers and the EYE film museum",
    country: "NL",
    type: ["Web app", "GIS", "BIM"],
    sourceData: ["BRO-XML"],
    gm: ["Geotechnical", "Geological"],
  },
  {
    id: "geotop-voxels-cesium",
    title: "GeoTOP Voxels",
    description:
      "The Dutch GeoTOP shallow subsurface model rendered in 3D in a browser for the first time. 100×100×0.5 m voxels with lithoclass information across Amsterdam, Delft, and Utrecht using CesiumJS with the 3D Tiles Voxel extension.",
    category: "demo",
    href: "https://geotop.bedrock.engineer",
    linkText: "Explore CesiumJS demo",
    links: [{ href: "/voxels", label: "More about our voxel work" }],
    image: geotop,
    country: "NL",
    type: ["Web app", "GIS"],
    sourceData: ["NetCDF"],
    gm: ["Voxel", "Geological"],
  },
  {
    id: "antwerp-cesium",
    title: "Antwerp Geological Model",
    description:
      "The Flemish DOV shallow subsurface model of Antwerp and its harbor as 3D Tiles Voxels in CesiumJS. 25×25×0.5 m voxels — over 21 million in total — with proportional lithology (peat, clay, silt, sand, gravel) from surface to 50 m depth.",
    category: "demo",
    href: "https://antwerpen.bedrock.engineer",
    linkText: "Explore CesiumJS demo",
    image: antwerpen,
    country: "BE",
    type: ["Web app", "GIS"],
    sourceData: ["NetCDF"],
    gm: ["Voxel", "Geological"],
  },
  {
    id: "tnw-cesium",
    title: "Ten noorden van de Waddeneilanden",
    description:
      "The integrated ground model for Ten noorden van de Waddeneilanden, an offshore wind zone north of the Wadden Islands, rendered as 3D Tiles Voxels in CesiumJS. Geological units on a 25×25×0.1 m grid, from the quantitative ground model built by NGI and SAND Geophysics for the Netherlands Enterprise Agency (RVO).",
    category: "demo",
    href: "https://tnw.bedrock.engineer",
    linkText: "Explore CesiumJS demo",
    links: [
      {
        href: "https://offshorewind.rvo.nl/page/view/be898bea-672f-464c-bfaf-74666cb8c489/soil-tnw",
        label: "Source ground model (RVO)",
      },
    ],
    image: tnw,
    imageAlt:
      "Ten noorden van de Waddeneilanden ground model as 3D voxels in CesiumJS",
    country: "NL",
    type: ["Web app", "GIS"],
    sourceData: ["SEG-Y"],
    gm: ["Voxel", "Geological"],
  },
  {
    id: "bro-cpt-maplibre",
    title: "Dutch BRO CPTs",
    description:
      "All 237,297 Cone Penetration Tests from the Dutch subsurface registry rendered instantly in the browser with MapLibre GL. Zoom, filter, and recolor without lag from a 35 MB PMTiles file served as a static asset.",
    category: "demo",
    href: `${SITE}/bro-cpt`,
    linkText: "Explore MapLibre demo",
    image: broCpt,
    country: "NL",
    type: ["Web app", "GIS"],
    sourceData: ["BRO-XML"],
    gm: ["Geotechnical"],
  },
  {
    id: "emerald-fre16-cesium",
    title: "Emerald FRE16, Norway",
    description:
      "Sensitive clay probability and resistivity along survey line FRE16 from Emerald Geomodelling, visualized as a 3D overlay on Norwegian terrain in CesiumJS. Toggle between sensitive clay probability and log-scale resistivity, and adjust basemap and globe opacity.",
    category: "demo",
    href: "https://emerald-sensitive-clay.bedrock.engineer/",
    linkText: "Explore CesiumJS demo",
    links: [
      {
        href: "https://www.emerald-geomodelling.com/",
        label: "Emerald Geomodelling",
      },
    ],
    image: emeraldFre16,
    imageAlt:
      "Emerald FRE16 sensitive clay probability overlay on Norwegian terrain in CesiumJS",
    country: "NO",
    type: ["Web app", "GIS"],
    sourceData: ["CSV"],
    gm: ["Geophysical", "Geotechnical"],
  },
  {
    id: "weka-hills-speckle",
    title: "Weka Hills",
    description:
      "Geological data visualization in Speckle showing subsurface conditions for infrastructure planning and design coordination.",
    category: "demo",
    href: "https://speckle.bedrock.engineer/projects/370cd6bbc7/models/all",
    linkText: "Explore Speckle demo",
    image: wekaHills,
    imageAlt: "Weka Hills project in Speckle",
    country: "NZ",
    type: ["BIM"],
    sourceData: ["AGS"],
    gm: ["Geological"],
  },
  {
    id: "rotterdam-speckle",
    title: "Rotterdam Buildings & GeoTOP",
    description:
      "Prominent Rotterdam buildings (Zalmhaven, Maastoren, Blaak/Markthal) shown in Speckle with their foundations and the GeoTOP voxel model — the first 50 m of Dutch subsurface as 100×100×0.5 m voxels with lithoclass and lithology information.",
    category: "demo",
    links: [
      {
        href: "https://app.speckle.systems/projects/adc3bec4c0/models/$zalmhaven",
        label: "Explore Speckle demo",
        detail: "De Zalmhaven",
      },
      {
        href: "https://app.speckle.systems/projects/adc3bec4c0/models/$maastoren",
        label: "Explore Speckle demo",
        detail: "Maastoren",
      },
      {
        href: "https://app.speckle.systems/projects/adc3bec4c0/models/$blaak-markthal",
        label: "Explore Speckle demo",
        detail: "Blaak & Markthal",
      },
    ],
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

// Free, usable browser apps, shown in their own section above the demos.
export const tools = demos.filter((d) => d.category === "tool");
// Example visualizations of our work — the filterable grid.
export const demoItems = demos.filter((d) => d.category === "demo");

const canonicalOrder = {
  country: ["NL", "UK", "HK", "NO", "NZ", "BE"] satisfies Country[],
  type: ["BIM", "GIS", "Web app"] satisfies DemoType[],
  sourceData: [
    "BRO-XML",
    "GEF",
    "AGS",
    "CSV",
    "NetCDF",
    "SEG-Y",
    "IFC",
  ] satisfies SourceData[],
  gm: [
    "Voxel",
    "Mesh",
    "Geological",
    "Geophysical",
    "Geotechnical",
    "Geohydrological",
    "Structural",
  ] satisfies GroundModel[],
};

const inUse = <T extends string>(values: T[], canonical: readonly T[]): T[] =>
  canonical.filter((c) => values.includes(c));

export const availableTags = {
  country: inUse(
    demoItems.map((d) => d.country).filter((c): c is Country => c !== undefined),
    canonicalOrder.country,
  ),
  type: inUse(
    demoItems.flatMap((d) => d.type),
    canonicalOrder.type,
  ),
  sourceData: inUse(
    demoItems.flatMap((d) => d.sourceData),
    canonicalOrder.sourceData,
  ),
  gm: inUse(
    demoItems.flatMap((d) => d.gm),
    canonicalOrder.gm,
  ),
};

export const tagDimensions = [
  { key: "country", label: "Country" },
  { key: "type", label: "Type" },
  { key: "sourceData", label: "Source data" },
  { key: "gm", label: "Ground model" },
] as const;
