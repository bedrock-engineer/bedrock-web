---
title: processBHRGBoredIntervals
prev: false
next: false
editUrl: false
---

# Function: processBHRGBoredIntervals()

```ts
function processBHRGBoredIntervals(_value, context): BoredInterval[];
```

Defined in: [src/resolvers/bhrg-resolvers.ts:78](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bhrg-resolvers.ts#L78)

Process bored intervals from BHR-G boring element

BHR-G uses wrapper elements: bhrgcom:boredInterval/bhrgcom:BoredInterval

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`BoredInterval`](/docs/bro-xml-parser/reference/api/general/boredinterval/)[]
