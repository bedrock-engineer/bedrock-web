---
title: processBoreholeSampleAnalysis
prev: false
next: false
editUrl: false
---

# Function: processBoreholeSampleAnalysis()

```ts
function processBoreholeSampleAnalysis(_value, context): 
  | BoreholeSampleAnalysis
  | undefined;
```

Defined in: [src/resolvers/bore-resolvers.ts:1514](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bore-resolvers.ts#L1514)

Process borehole sample analysis data from boreholeSampleAnalysis element

Extracts laboratory analysis data including all investigated intervals
and their determination results.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `_value` | `string` \| `null` | Not used (we work with the node directly) |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) | Resolver context containing the XML node and adapter |

## Returns

  \| [`BoreholeSampleAnalysis`](/docs/bro-xml-parser/reference/api/bhr-gt/boreholesampleanalysis/)
  \| `undefined`

BoreholeSampleAnalysis object or undefined if not present
