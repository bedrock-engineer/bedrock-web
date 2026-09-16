---
title: processBHRGRegistrationHistory
prev: false
next: false
editUrl: false
---

# Function: processBHRGRegistrationHistory()

```ts
function processBHRGRegistrationHistory(_value, context): RegistrationHistory | null;
```

Defined in: [src/resolvers/bhrg-resolvers.ts:163](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bhrg-resolvers.ts#L163)

Process registration history from BHR-G document element

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`RegistrationHistory`](/docs/bro-xml-parser/reference/api/general/registrationhistory/) \| `null`
