---
title: parseDate
prev: false
next: false
editUrl: false
---

# Function: parseDate()

```ts
function parseDate(value): string | null;
```

Defined in: [src/resolvers/type-resolvers.ts:95](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/resolvers/type-resolvers.ts#L95)

Normalize a BRO temporal value to a precision-preserving ISO 8601 string.

BRO date/dateTime elements are a choice of full date (`YYYY-MM-DD`),
year-month (`YYYY-MM`), year (`YYYY`), full `dateTime`, or a `voidReason`
code (e.g. "onbekend") when the value is unknown. The exact lexical value is
returned unchanged so no precision or timezone information is lost;
`voidReason` codes and any unrecognized input yield `null`. Consumers can
construct a `Date` (or `Temporal`) from the string when they need one — note
that a date-only string parsed via `new Date()` is interpreted as UTC
midnight.

Unlike the numeric resolvers this does not warn on non-matching input,
because `voidReason` is a legitimate and common value in archive data.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` \| `null` \| `undefined` |

## Returns

`string` \| `null`
