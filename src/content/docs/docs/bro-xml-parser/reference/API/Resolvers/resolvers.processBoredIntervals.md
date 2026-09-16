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

Defined in: [src/resolvers/bore-resolvers.ts:1502](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bore-resolvers.ts#L1502)

Process bored intervals from boring element

Extracts array of bored intervals with technique and diameter.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`BoredInterval`](/docs/bro-xml-parser/reference/api/general/boredinterval/)[]
