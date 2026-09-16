---
title: processNotDescribedIntervals
prev: false
next: false
editUrl: false
---

# Function: processNotDescribedIntervals()

```ts
function processNotDescribedIntervals(_value, context): NotDescribedInterval[];
```

Defined in: [src/resolvers/bore-resolvers.ts:1661](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bore-resolvers.ts#L1661)

Process not described intervals from boreholeSampleDescription element

Extracts array of intervals that were not described and the reason.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`NotDescribedInterval`](/docs/bro-xml-parser/reference/api/bhr-gt/notdescribedinterval/)[]
