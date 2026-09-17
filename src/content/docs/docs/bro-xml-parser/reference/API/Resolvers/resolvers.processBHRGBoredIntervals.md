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

Defined in: [src/resolvers/bhrg-resolvers.ts:381](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bhrg-resolvers.ts#L381)

Process bored intervals from BHR-G boring element

BHR-G uses wrapper elements: bhrgcom:boredInterval/bhrgcom:BoredInterval

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`BoredInterval`](/docs/bro-xml-parser/reference/api/general/boredinterval/)[]
