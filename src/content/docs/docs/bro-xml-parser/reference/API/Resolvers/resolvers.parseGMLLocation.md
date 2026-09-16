---
title: parseGMLLocation
prev: false
next: false
editUrl: false
---

# Function: parseGMLLocation()

```ts
function parseGMLLocation(_value, context): Location | null;
```

Defined in: [src/resolvers/gml-resolvers.ts:17](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/gml-resolvers.ts#L17)

Parse GML Point location with coordinates and EPSG code

Handles location elements like:
<location srsName="urn:ogc:def:crs:EPSG::28992">
  <gml:Point>
    <gml:pos>155000.0 463000.0</gml:pos>
  </gml:Point>
</location>

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`Location`](/docs/bro-xml-parser/reference/api/general/location/) \| `null`
