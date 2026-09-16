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

Defined in: [src/resolvers/bore-resolvers.ts:1740](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bore-resolvers.ts#L1740)

Process report history from document element

Extracts report history including intermediate events.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`ReportHistory`](/docs/bro-xml-parser/reference/api/general/reporthistory/) \| `null`
