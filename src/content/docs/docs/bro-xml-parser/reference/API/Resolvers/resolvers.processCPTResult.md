---
title: processCPTResult
prev: false
next: false
editUrl: false
---

# Function: processCPTResult()

```ts
function processCPTResult(_value, context): CPTMeasurement[];
```

Defined in: [src/resolvers/measurement-resolver.ts:24](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/measurement-resolver.ts#L24)

Parse CPT measurement data from embedded CSV

The CPT XML contains measurement data as CSV text embedded in the values element.
The structure is:
- parameters: defines which columns are included (ja/nee flags)
- encoding: defines CSV delimiters
- values: actual CSV data with all columns (we select only "ja" columns)

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`CPTMeasurement`](/docs/bro-xml-parser/reference/api/cpt/cptmeasurement/)[]
