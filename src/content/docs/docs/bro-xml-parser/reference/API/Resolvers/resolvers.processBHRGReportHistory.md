---
title: processBHRGReportHistory
prev: false
next: false
editUrl: false
---

# Function: processBHRGReportHistory()

```ts
function processBHRGReportHistory(_value, context): ReportHistory | null;
```

Defined in: [src/resolvers/bhrg-resolvers.ts:471](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bhrg-resolvers.ts#L471)

Process report history from BHR-G document element

Note: BHR-G uses a different structure (event with date and name) than BHR-GT

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`ReportHistory`](/docs/bro-xml-parser/reference/api/general/reporthistory/) \| `null`
