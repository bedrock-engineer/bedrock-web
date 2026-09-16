---
title: Read parsed results
description: The shape of CPT, BHR-GT, and BHR-G results, and how to narrow the union returned by parse.
sidebar:
  order: 1
---

Every parse method returns one object. The three file types share a common
outline and differ in what fills the `data` array.

## Common shape

Each result carries a `meta` object, top-level fields that describe the
investigation, and a `data` array of rows.

```typescript
const cpt = parser.parseCPT(xmlText);

cpt.meta; // { dataType, schemaVersion, schemaNamespace, warnings }
cpt.broId; // "CPT000000099543" or null
cpt.data; // measurement rows for a CPT, soil layers for a borehole
```

Fields that the BRO marks optional are typed as `T | null`. A field parses to
`null` when the element is absent or explicitly nil, so guard against `null`
before using a value the source may leave out.

## CPT

`parseCPT` returns a `CPTData`. The `data` array holds one `CPTMeasurement` per
sampled depth. `penetrationLength` is always present. The rest depend on which
sensors the cone carried, so most are `number | null`.

```typescript
const cpt = parser.parseCPT(xmlText);

cpt.finalDepth; // 25.5
cpt.data.length; // e.g. 2540 rows

for (const row of cpt.data) {
  row.penetrationLength; // 12.34 (m)
  row.coneResistance; // 8.21 (MPa) or null
  row.localFriction; // 0.09 (MPa) or null
}
```

A CPT can pause at fixed depths to record how pore pressure decays over time.
Those runs land in `dissipationTests`, separate from the main `data` array.

## BHR-GT (geotechnical borehole)

`parseBHRGT` returns a `BHRGTData`. Here `data` is an array of `BHRGTLayer`
ordered by depth. Each layer spans `upperBoundary` to `lowerBoundary` and names
the soil in `geotechnicalSoilName`.

```typescript
const bore = parser.parseBHRGT(xmlText);

for (const layer of bore.data) {
  `${layer.upperBoundary}–${layer.lowerBoundary}m`; // "0–0.5m"
  layer.geotechnicalSoilName; // "zwakZandigeKlei"
  layer.color; // "standaardGrijs" or undefined
}
```

Laboratory determinations, when present, sit on the optional `analysis` field
rather than on the layers. It holds `investigatedIntervals`, each with the water
content, grain size, Atterberg, and other tests run on that depth range.

```typescript
if (bore.analysis) {
  for (const interval of bore.analysis.investigatedIntervals) {
    interval.waterContentDetermination?.waterContent; // 31.4 (%)
  }
}
```

## BHR-G (geological borehole)

`parseBHRG` returns a `BHRGData`. Its layers name the soil per NEN 5104 in
`soilNameNEN5104`. One difference from BHR-GT catches people out: fields such as
`anthropogenic` and `rooted` are string codes ("ja", "nee", "onbekend"), not
booleans, because that is how the BHR-G schema encodes them.

```typescript
const bore = parser.parseBHRG(xmlText);

for (const layer of bore.data) {
  layer.soilNameNEN5104; // "zand"
  layer.anthropogenic; // "nee"
}
```

## Detecting the type

When you do not know the file type in advance, call `parse`. It returns a
`BROData` union. Narrow it on `meta.dataType` before reaching for
type-specific fields:

```typescript
const data = parser.parse(xmlText);

switch (data.meta.dataType) {
  case "CPT": {
    console.log(data.finalDepth, data.data.length);
    break;
  }
  case "BHR-GT":
  case "BHR-G": {
    console.log(data.data.length, "layers");
    break;
  }
}
```

TypeScript narrows the union inside each branch, so `data.finalDepth` only
type-checks in the CPT case. For the full field list of each type, see the
[API reference](/docs/bro-xml-parser/reference/).
