---
title: gmlLocation
prev: false
next: false
editUrl: false
---

# Function: gmlLocation()

```ts
function gmlLocation(at): CustomProducer<Location | null>;
```

Defined in: [src/schemas/common-fields.ts:69](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/schemas/common-fields.ts#L69)

A GML `Point` location → [Location](/docs/bro-xml-parser/reference/api/general/location/), as a custom producer.

Reads the EPSG code from the `srsName` attribute (on the location element or a
nested `gml:Point`) and the `gml:pos` coordinates. Returns `null` when the CRS
or coordinates are absent/unparseable. `at` is the relative XPath to the
location element (differs per domain).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `at` | `string` |

## Returns

`CustomProducer`\<[`Location`](/docs/bro-xml-parser/reference/api/general/location/) \| `null`\>
