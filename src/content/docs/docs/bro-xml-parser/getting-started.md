---
title: Getting started
description: Install @bedrock-engineer/bro-xml-parser and parse a BRO XML document.
sidebar:
  order: 1
---

[`@bedrock-engineer/bro-xml-parser`](https://github.com/bedrock-engineer/bro-xml-parser-ts)
is a TypeScript parser for Dutch [Basisregistratie Ondergrond](https://basisregistratieondergrond.nl/)
(BRO) XML. It reads geotechnical and geological ground investigation data into
plain typed objects.

The BRO defines [many registration object types](https://basisregistratieondergrond.nl/inhoud-bro/registratieobjecten/).
This library covers five:

1. **CPT** (Cone Penetration Test)
2. **BHR-GT** (Geotechnical Borehole)
3. **BHR-G** (Geological Borehole)
4. **GMW** (Groundwater Monitoring Well) 
5. **GLD** (Groundwater Level)

You can see it running on real BRO data at [bro.bedrock.engineer](https://bro.bedrock.engineer/).

## Install

```bash
npm install @bedrock-engineer/bro-xml-parser
```

The parser works in three environments through separate entry points. The
browser build uses the native `DOMParser` and XPath APIs and has no
dependencies. The Node.js build needs two peer dependencies:

```bash
npm install @xmldom/xmldom fontoxpath
```

For edge runtimes (Cloudflare Workers, Deno), install `xpath` instead of
`fontoxpath`:

```bash
npm install @xmldom/xmldom xpath
```

## Load the XML

The parser takes an XML string, so read the document however fits your setup.
In the browser, fetch it:

```typescript
const xmlText = await fetch("/data/CPT000000099543.xml").then((r) => r.text());
```

In Node.js, read it from disk:

```typescript
import { readFile } from "node:fs/promises";

const xmlText = await readFile("CPT000000099543.xml", "utf8");
```

## Parse a document

A `BROParser` takes an `XMLAdapter` for its environment. Import both from the
entry point that matches where your code runs.

In the browser:

```typescript
import { BROParser, XMLAdapter } from "@bedrock-engineer/bro-xml-parser";

const parser = new BROParser(new XMLAdapter());
const cpt = parser.parseCPT(xmlText);

console.log(cpt.data.length); // number of measurements
```

In Node.js, import from the `/node` subpath:

```typescript
import { BROParser, XMLAdapter } from "@bedrock-engineer/bro-xml-parser/node";

const parser = new BROParser(new XMLAdapter());
```

On an edge runtime, import from the `/workers` subpath. It avoids fontoxpath,
so the whole parser bundles to roughly 66 kB gzipped. Bundlers that target
Cloudflare (the `workerd` export condition) resolve this entry automatically
from the bare package name:

```typescript
import { BROParser, XMLAdapter } from "@bedrock-engineer/bro-xml-parser/workers";

const parser = new BROParser(new XMLAdapter());
```

If you do not know the file type ahead of time, call `parse`. It detects the
type from the document and returns the matching shape. The result carries a
top-level `dataType` discriminant, so a `switch` narrows the union without
type guards:

```typescript
const data = parser.parse(xmlText);

switch (data.dataType) {
  // 'CPT' | 'BHR-GT' | 'BHR-G' | 'GMW' | 'GLD'
}
```

## What you get back

A parse method returns one object: identification and survey fields at the top
level, a `meta` object, and a `data` array of rows. For a CPT, `data` holds
measurement rows. For a borehole, it holds soil layers.

```typescript
const cpt = parser.parseCPT(xmlText);

cpt.broId; // "CPT000000099543"
cpt.conePenetrometerSurvey?.trajectory?.finalDepth; // { value: 25.5, uom: "m" }
cpt.data[0]; // { penetrationLength, coneResistance, localFriction, ... }
```

Fields that carry a physical quantity parse to a `Measure` — the numeric
`value` plus the `uom` unit of measure the XML declares — rather than a bare
number, so the unit is never silently dropped.

`meta` records the detected schema version and any non-fatal warnings. Check it
when a document might use a schema version the library does not target:

```typescript
if (cpt.meta.warnings.length > 0) {
  console.warn("Parse warnings:", cpt.meta.warnings);
}
```

The [Read parsed results](/docs/bro-xml-parser/guides/results/) guide covers the
shape of each file type.

## Resolve reference codes

BRO XML stores domain values as [codes](https://www.bro-productomgeving.nl/bpo/release-1.4_Q3_2021/informatie-voor-softwareleveranciers/url-s-publieke-rest-services/waardelijst-service-refcode-service) such as `"langwerpig"` or
`"ISO19901d8v2014"`. Coded fields parse to a `Coded` object that carries the
code plus its domain. The `/reference-codes` subpath exports a single
`describe` function, generated from the
[BRO reference codes API](https://publiek.broservices.nl/bro/refcodes/v1/codes),
that turns any `Coded` value into its official Dutch description. The
generated lookup tables cover all five registration object types:

```typescript
import { describe } from "@bedrock-engineer/bro-xml-parser/reference-codes";

const bore = parser.parseBHRGT(xmlText);

for (const layer of bore.data) {
  const name = describe(layer.geotechnicalSoilName);
  console.log(`${layer.upperBoundary?.value}–${layer.lowerBoundary?.value}m: ${name}`);
}
```

## Next steps

- Learn the shape of each result in [Read parsed results](/docs/bro-xml-parser/guides/results/).
- Extract only the fields you need with a [custom schema](/docs/bro-xml-parser/guides/custom-schemas/).
- Browse every exported class, function, and type in the [API reference](/docs/bro-xml-parser/reference/).
