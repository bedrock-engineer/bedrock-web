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

Defined in: [src/resolvers/bore-resolver-utils.ts:434](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/bore-resolver-utils.ts#L434)

Parse the BRO registration history.

Shared by every registration type (CPT, BHR-GT, BHR-G): the `registrationHistory`
element is a direct child of the registration object and its children are all
`brocom:*`, identical across domains - only the container's ds-namespace differs,
which we sidestep with a namespace-agnostic local-name() match.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_value` | `string` \| `null` |
| `context` | [`ResolverContext`](/docs/bro-xml-parser/reference/api/general/resolvercontext/) |

## Returns

[`RegistrationHistory`](/docs/bro-xml-parser/reference/api/general/registrationhistory/) \| `null`
