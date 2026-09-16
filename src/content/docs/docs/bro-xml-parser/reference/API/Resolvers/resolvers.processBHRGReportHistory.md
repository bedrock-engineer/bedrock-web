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

Defined in: [src/resolvers/bhrg-resolvers.ts:201](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bhrg-resolvers.ts#L201)

Process report history from BHR-G document element

Note: BHR-G uses a different structure (event with date and name) than BHR-GT

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`ReportHistory`](/docs/bro-xml-parser/reference/api/general/reporthistory/) \| `null`
