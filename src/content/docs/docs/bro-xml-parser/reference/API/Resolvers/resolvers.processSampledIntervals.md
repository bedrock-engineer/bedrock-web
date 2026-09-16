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

Defined in: [src/resolvers/bore-resolvers.ts:1544](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bore-resolvers.ts#L1544)

Process sampled intervals from boring element

Extracts array of sampled intervals with method, quality, and optional sampler details.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`SampledInterval`](/docs/bro-xml-parser/reference/api/general/sampledinterval/)[]
