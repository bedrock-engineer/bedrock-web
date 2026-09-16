---
title: processBHRGSampledIntervals
prev: false
next: false
editUrl: false
---

# Function: processBHRGSampledIntervals()

```ts
function processBHRGSampledIntervals(_value, context): SampledInterval[];
```

Defined in: [src/resolvers/bhrg-resolvers.ts:121](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bhrg-resolvers.ts#L121)

Process sampled intervals from BHR-G boring element

BHR-G uses wrapper elements: bhrgcom:sampledInterval/bhrgcom:SampledInterval
Note: BHR-G doesn't have the detailed sampler info that BHR-GT has

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`SampledInterval`](/docs/bro-xml-parser/reference/api/general/sampledinterval/)[]
