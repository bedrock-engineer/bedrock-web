---
title: processBHRGTLayerData
prev: false
next: false
editUrl: false
---

# Function: processBHRGTLayerData()

```ts
function processBHRGTLayerData(_value, context): BHRGTLayer[];
```

Defined in: [src/resolvers/bore-resolvers.ts:230](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bore-resolvers.ts#L230)

Parse BHR-GT descriptive-log layers into a discriminated union of soil / rock
layers. A layer describes either soil or rock; we branch on which is present
so rock layers aren't forced through the soil shape (and vice versa).

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`BHRGTLayer`](/docs/bro-xml-parser/reference/api/bhr-gt/bhrgtlayer/)[]
