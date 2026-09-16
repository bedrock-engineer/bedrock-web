---
title: BROParser
prev: false
next: false
editUrl: false
---

# Class: BROParser

Defined in: [src/parser.ts:48](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/parser.ts#L48)

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

Defined in: [src/parser.ts:58](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/parser.ts#L58)

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

Defined in: [src/parser.ts:102](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/parser.ts#L102)

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

Defined in: [src/parser.ts:135](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/parser.ts#L135)

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

Defined in: [src/parser.ts:168](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/parser.ts#L168)

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

### parse()

```ts
parse(xmlText): BROData;
```

Defined in: [src/parser.ts:207](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/parser.ts#L207)

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
parseCustom(
   xmlText, 
   schema, 
   dataType?
): Record<string, unknown> & object;
```

Defined in: [src/parser.ts:261](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/parser.ts#L261)

Parse BRO XML with a custom schema for selective extraction

This allows you to extract only the fields you need, which can be
more efficient and gives you full control over the output structure.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `xmlText` | `string` | BRO/XML document as string |
| `schema` | [`Schema`](/docs/bro-xml-parser/reference/api/general/schema/) | Custom schema defining fields to extract |
| `dataType?` | [`BROFileType`](/docs/bro-xml-parser/reference/api/general/brofiletype/) | The BRO data type (for version validation) |

#### Returns

`Record`\<`string`, `unknown`\> & `object`

Object with extracted fields matching your schema

#### Example

```typescript
import { BROParser, resolvers } from '@bedrock-engineer/bro-xml-parser';

const parser = new BROParser(new XMLAdapter());

// Define only the fields you need
const mySchema = {
  id: { xpath: 'brocom:broId' },
  depth: {
    xpath: './/cptcommon:finalDepth',
    resolver: resolvers.parseFloat
  },
  location: {
    xpath: './dscpt:deliveredLocation/cptcommon:location',
    resolver: resolvers.parseGMLLocation
  }
};

const result = parser.parseCustom(xmlText, mySchema, 'CPT');
// { id: "CPT000000099543", depth: 25.5, location: { x: 155000, y: 463000, epsg: "EPSG:28992" } }
```

***

### getAdapter()

```ts
getAdapter(): XMLAdapter;
```

Defined in: [src/parser.ts:298](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/parser.ts#L298)

Get the underlying XML adapter
(useful for advanced use cases or testing)

#### Returns

`XMLAdapter`
