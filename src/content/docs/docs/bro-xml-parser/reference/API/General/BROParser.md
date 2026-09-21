---
title: BROParser
prev: false
next: false
editUrl: false
---

# Class: BROParser

Defined in: [src/parser.ts:53](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L53)

Main BRO Parser class

Usage:
```typescript
import { BROParser, XMLAdapter } from '@bedrock-engineer/bro-xml-parser';

const parser = new BROParser(new XMLAdapter());
const cptData = parser.parseCPT(xmlString);

// Check for warnings
if (cptData.meta.warnings.length > 0) {
  console.warn('Parse warnings:', cptData.meta.warnings);
}
```

## Constructors

### Constructor

```ts
new BROParser(adapter, namespaces?): BROParser;
```

Defined in: [src/parser.ts:63](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L63)

Create a BRO parser instance

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `adapter` | `XMLAdapter` | XML adapter for the target environment (browser/Node.js) |
| `namespaces?` | [`Namespaces`](/docs/bro-xml-parser/reference/api/general/namespaces/) | Optional namespace overrides (defaults to BRO_NAMESPACES) |

#### Returns

`BROParser`

## Methods

### parseCPT()

```ts
parseCPT(xmlText): CPTData;
```

Defined in: [src/parser.ts:107](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L107)

Parse CPT data from BRO/XML string

Extracts all 41 metadata fields and measurement data following
the IMBRO CPT schema (dscpt/1.1).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xmlText` | `string` | BRO/XML document as string |

#### Returns

[`CPTData`](/docs/bro-xml-parser/reference/api/cpt/cptdata/)

Parsed CPT data with metadata and measurements

#### Throws

If parsing fails or required fields are missing

#### Example

```typescript
const parser = new BROParser(new XMLAdapter());
const cptData = parser.parseCPT(xmlString);

console.log(cptData.broId);              // "CPT000000155283"
console.log(cptData.finalDepth);          // 10.5
console.log(cptData.data.length);          // 525 measurements
console.log(cptData.data[0].coneResistance); // 1.234
console.log(cptData.meta.schemaVersion);   // "1.1"
```

***

### parseBHRGT()

```ts
parseBHRGT(xmlText): BHRGTData;
```

Defined in: [src/parser.ts:141](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L141)

Parse Bore (borehole) data from BRO/XML string

Extracts metadata and layer information following
the IMBRO Bore schema (dsbhr-gt/2.1).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xmlText` | `string` | BRO/XML document as string |

#### Returns

[`BHRGTData`](/docs/bro-xml-parser/reference/api/bhr-gt/bhrgtdata/)

Parsed BHR-GT data with metadata and soil layers

#### Throws

If parsing fails or required fields are missing

#### Example

```typescript
const parser = new BROParser(new XMLAdapter());
const BHRGTData = parser.parseBHRGT(xmlString);

console.log(BHRGTData.broId);              // "BHR000000123456"
console.log(BHRGTData.finalBoreDepth);    // 5.5
console.log(BHRGTData.data.length);         // 8 layers
console.log(BHRGTData.data[0].geotechnicalSoilName); // "zand"
console.log(BHRGTData.meta.schemaVersion);  // "2.1"
```

***

### parseBHRG()

```ts
parseBHRG(xmlText): BHRGData;
```

Defined in: [src/parser.ts:175](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L175)

Parse BHR-G (Geological Borehole) data from BRO/XML string

Extracts metadata and layer information following
the IMBRO BHR-G schema (dsbhrg/3.1).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xmlText` | `string` | BRO/XML document as string |

#### Returns

[`BHRGData`](/docs/bro-xml-parser/reference/api/bhr-g/bhrgdata/)

Parsed BHR-G data with metadata and soil layers

#### Throws

If parsing fails or required fields are missing

#### Example

```typescript
const parser = new BROParser(new XMLAdapter());
const BHRGData = parser.parseBHRG(xmlString);

console.log(BHRGData.broId);              // "BHR000000123456"
console.log(BHRGData.finalBoreDepth);    // 3.0
console.log(BHRGData.data.length);         // 5 layers
console.log(BHRGData.data[0].soilNameNEN5104); // "zwakZandigeKlei"
console.log(BHRGData.meta.schemaVersion);  // "3.1"
```

***

### parseGMW()

```ts
parseGMW(xmlText): GMWData;
```

Defined in: [src/parser.ts:209](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L209)

Parse GMW (groundwater monitoring well) data from BRO/XML string

Extracts well metadata and its monitoring tubes following the IMBRO GMW
schema (dsgmw/1.1). Works on the public dispatch document (`GMW_PPO`) as
well as the `GMW_PO` / `GMW_O` variants, which share one leaf surface.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xmlText` | `string` | BRO/XML document as string |

#### Returns

[`GMWData`](/docs/bro-xml-parser/reference/api/gmw/gmwdata/)

Parsed GMW data with metadata and monitoring tubes

#### Throws

If parsing fails or required fields are missing

#### Example

```typescript
const parser = new BROParser(new XMLAdapter());
const gmw = parser.parseGMW(xmlString);

console.log(gmw.broId);                         // "GMW000000048066"
console.log(gmw.numberOfMonitoringTubes);       // 1
console.log(gmw.monitoringTubes[0].screenLength); // 1.0
console.log(gmw.meta.schemaVersion);            // "1.1"
```

***

### parseGLD()

```ts
parseGLD(xmlText): GLDData;
```

Defined in: [src/parser.ts:246](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L246)

Parse GLD (groundwater level research) data from BRO/XML string

Extracts the monitoring-point reference, monitoring-net membership and the
groundwater level observation time-series following the IMBRO GLD schema
(dsgld/1.0).

Note: full GLD dispatch documents can be very large (years of time-series
measurements). Consider requesting a bounded observation period from the BRO
REST API before parsing.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xmlText` | `string` | BRO/XML document as string |

#### Returns

[`GLDData`](/docs/bro-xml-parser/reference/api/gld/glddata/)

Parsed GLD data with metadata and observation series

#### Throws

If parsing fails or required fields are missing

#### Example

```typescript
const parser = new BROParser(new XMLAdapter());
const gld = parser.parseGLD(xmlString);

console.log(gld.broId);                       // "GLD000000010000"
console.log(gld.monitoringPoint?.broId);      // "GMW000000020142"
console.log(gld.observations[0].points.length); // 8760
```

***

### parse()

```ts
parse(xmlText): BROData;
```

Defined in: [src/parser.ts:286](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L286)

Parse any BRO XML document, auto-detecting the data type

This is the recommended entry point when you don't know the file type
in advance. The method detects the data type from the XML namespace
and calls the appropriate parser.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xmlText` | `string` | BRO/XML document as string |

#### Returns

[`BROData`](/docs/bro-xml-parser/reference/api/general/brodata/)

Parsed data (CPTData, BHRGTData, or BHRGData)

#### Throws

If parsing fails or data type is unknown

#### Example

```typescript
const parser = new BROParser(new XMLAdapter());
const data = parser.parse(xmlString);

// Use meta.dataType to discriminate
switch (data.meta.dataType) {
  case 'CPT':
    console.log(data.finalDepth);
    break;
  case 'BHR-GT':
  case 'BHR-G':
    console.log(data.finalBoreDepth);
    break;
}
```

***

### parseCustom()

```ts
parseCustom<F>(
   xmlText, 
   fields, 
   dataType?
): { [K in string | number | symbol]: ({ [K in string | number | symbol]: Produced<F[K]> } & { [K in string | number | symbol]?: Produced<F[K]> })[K] } & object;
```

Defined in: [src/parser.ts:344](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L344)

Parse BRO XML with a custom schema for selective extraction

This allows you to extract only the fields you need, which can be
more efficient and gives you full control over the output structure.

Pass a bare map of field name → [Producer](/docs/bro-xml-parser/reference/api/general/producer/), built from the `producers`
authoring surface. The return type is inferred from the map: each field's
type is its producer's output type, plus a `meta` block. Author the map as
an inline literal (or with `satisfies Record<string, Producer<unknown>>`) so
the field types are preserved for inference.

#### Type Parameters

| Type Parameter |
| ------ |
| `F` *extends* `Record`\<`string`, [`Producer`](/docs/bro-xml-parser/reference/api/general/producer/)\<`unknown`, `Presence`\>\> |

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xmlText` | `string` | BRO/XML document as string |
| `fields` | `F` | Field name → producer map defining what to extract |
| `dataType?` | [`BROFileType`](/docs/bro-xml-parser/reference/api/general/brofiletype/) | The BRO data type (for version validation) |

#### Returns

\{ \[K in string \| number \| symbol\]: (\{ \[K in string \| number \| symbol\]: Produced\<F\[K\]\> \} & \{ \[K in string \| number \| symbol\]?: Produced\<F\[K\]\> \})\[K\] \} & `object`

Object with extracted fields matching your map, plus `meta`

#### Example

```typescript
import { BROParser, producers as p } from '@bedrock-engineer/bro-xml-parser';

const parser = new BROParser(new XMLAdapter());

// Define only the fields you need
const result = parser.parseCustom(xmlText, {
  id: p.text('brocom:broId'),                                       // string | null
  depth: p.number_('./dscpt:conePenetrometerSurvey/cptcommon:trajectory/cptcommon:finalDepth'),
  location: p.gmlLocation('./dscpt:deliveredLocation/cptcommon:location'),
}, 'CPT');

result.depth;    // number | null — inferred, no casts
result.location; // Location | null
```

***

### getAdapter()

```ts
getAdapter(): XMLAdapter;
```

Defined in: [src/parser.ts:382](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/parser.ts#L382)

Get the underlying XML adapter
(useful for advanced use cases or testing)

#### Returns

`XMLAdapter`
