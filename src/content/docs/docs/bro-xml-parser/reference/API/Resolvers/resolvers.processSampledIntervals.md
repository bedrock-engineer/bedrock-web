---
title: processSampledIntervals
prev: false
next: false
editUrl: false
---

# Function: processSampledIntervals()

```ts
function processSampledIntervals(_value, context): SampledInterval[];
```

Defined in: [src/resolvers/bore-resolvers.ts:1667](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bore-resolvers.ts#L1667)

Process sampled intervals from boring element

Extracts array of sampled intervals with method, quality, and optional sampler details.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`SampledInterval`](/docs/bro-xml-parser/reference/api/general/sampledinterval/)[]
