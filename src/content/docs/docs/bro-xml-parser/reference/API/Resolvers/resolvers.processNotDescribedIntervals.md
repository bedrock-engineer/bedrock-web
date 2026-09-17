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

Defined in: [src/resolvers/bore-resolvers.ts:1915](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bore-resolvers.ts#L1915)

Process not described intervals from boreholeSampleDescription element

Extracts array of intervals that were not described and the reason.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`NotDescribedInterval`](/docs/bro-xml-parser/reference/api/bhr-gt/notdescribedinterval/)[]
