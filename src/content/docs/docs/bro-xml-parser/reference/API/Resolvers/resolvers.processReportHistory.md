---
title: processReportHistory
prev: false
next: false
editUrl: false
---

# Function: processReportHistory()

```ts
function processReportHistory(_value, context): ReportHistory | null;
```

Defined in: [src/resolvers/bore-resolvers.ts:2010](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bore-resolvers.ts#L2010)

Process report history from document element

Extracts report history including intermediate events.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`ReportHistory`](/docs/bro-xml-parser/reference/api/general/reporthistory/) \| `null`
