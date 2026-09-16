---
title: processRegistrationHistory
prev: false
next: false
editUrl: false
---

# Function: processRegistrationHistory()

```ts
function processRegistrationHistory(_value, context): RegistrationHistory | null;
```

Defined in: [src/resolvers/bore-resolvers.ts:1702](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/bore-resolvers.ts#L1702)

Process registration history from document element

Extracts BRO registration history information.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`RegistrationHistory`](/docs/bro-xml-parser/reference/api/general/registrationhistory/) \| `null`
