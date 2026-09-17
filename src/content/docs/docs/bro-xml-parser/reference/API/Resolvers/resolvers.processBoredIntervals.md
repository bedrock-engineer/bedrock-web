---
title: processBoredIntervals
prev: false
next: false
editUrl: false
---

# Function: processBoredIntervals()

```ts
function processBoredIntervals(_value, context): BoredInterval[];
```

Defined in: [src/resolvers/bore-resolvers.ts:1625](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bore-resolvers.ts#L1625)

Process bored intervals from boring element

Extracts array of bored intervals with technique and diameter.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`BoredInterval`](/docs/bro-xml-parser/reference/api/general/boredinterval/)[]
