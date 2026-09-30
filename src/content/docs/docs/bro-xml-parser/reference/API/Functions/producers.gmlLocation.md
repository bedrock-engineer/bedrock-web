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

Defined in: [src/schemas/common-fields.ts:21](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/schemas/common-fields.ts#L21)

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
