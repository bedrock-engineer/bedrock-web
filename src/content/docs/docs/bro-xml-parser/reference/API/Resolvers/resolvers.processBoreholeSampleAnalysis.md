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

Defined in: [src/resolvers/bore-resolvers.ts:1391](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bore-resolvers.ts#L1391)

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
