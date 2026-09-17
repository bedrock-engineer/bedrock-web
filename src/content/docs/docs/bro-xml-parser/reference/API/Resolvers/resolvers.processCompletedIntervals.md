---
title: processCompletedIntervals
prev: false
next: false
editUrl: false
---

# Function: processCompletedIntervals()

```ts
function processCompletedIntervals(_value, context): CompletedInterval[];
```

Defined in: [src/resolvers/bore-resolvers.ts:1758](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bore-resolvers.ts#L1758)

Process completed intervals from boring element

Extracts array of completed intervals with backfill information.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`CompletedInterval`](/docs/bro-xml-parser/reference/api/bhr-gt/completedinterval/)[]
