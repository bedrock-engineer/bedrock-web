---
title: Extract fields with a custom schema
description: Use parseCustom, resolvers, and presets to pull only the fields you need from BRO XML.
sidebar:
  order: 2
---

The `parseCPT`, `parseBHRGT`, and `parseBHRG` methods return the full data model for
each file type. When you need only a few fields, you can define a schema and call
`parseCustom`. A schema maps output keys to an XPath expression and an optional
resolver that converts the matched node into a typed value.

```typescript
import { BROParser, XMLAdapter, resolvers } from "@bedrock-engineer/bro-xml-parser/node";

const parser = new BROParser(new XMLAdapter());

const schema = {
  id: { xpath: "brocom:broId" },
  depth: {
    xpath: ".//cptcommon:finalDepth",
    resolver: resolvers.parseFloat,
  },
  location: {
    xpath: "./dscpt:deliveredLocation/cptcommon:location",
    resolver: resolvers.parseGMLLocation,
  },
};

const result = parser.parseCustom(xmlText, schema, "CPT");
// { id: "CPT000000099543", depth: 25.5, location: { x: 155000, y: 463000, epsg: "28992" } }
```

The third argument is the data type. Passing it lets the parser validate the
schema version of the document before extracting.

## Resolvers

A resolver turns a matched XML node into a JavaScript value. Without one, a
field returns the raw text content. The `resolvers` namespace holds the built-in
converters, including `parseFloat`, `parseInt`, `parseBoolean`, `parseDate`, and
`parseGMLLocation`. You can also pass your own function with the same signature.

See the [`resolvers` reference](/docs/bro-xml-parser/reference/) for the full
list.

## Presets

For common cases, the `presets` namespace exports ready-made schemas, for
example ID-only, location-only, and metadata-only variants for each file type:

```typescript
import { BROParser, XMLAdapter, presets } from "@bedrock-engineer/bro-xml-parser/node";

const parser = new BROParser(new XMLAdapter());
const location = parser.parseCustom(xmlText, presets.CPT_LOCATION_ONLY, "CPT");
```
