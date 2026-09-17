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

Defined in: [src/resolvers/bhrg-resolvers.ts:424](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bhrg-resolvers.ts#L424)

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
