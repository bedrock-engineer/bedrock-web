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

Defined in: [src/resolvers/bore-resolvers.ts:1617](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bore-resolvers.ts#L1617)

Process completed intervals from boring element

Extracts array of completed intervals with backfill information.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`CompletedInterval`](/docs/bro-xml-parser/reference/api/bhr-gt/completedinterval/)[]
