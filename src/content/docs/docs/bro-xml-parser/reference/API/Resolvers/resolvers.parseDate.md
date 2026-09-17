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

Defined in: [src/resolvers/type-resolvers.ts:116](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/resolvers/type-resolvers.ts#L116)

Normalize a BRO temporal value to a precision-preserving ISO 8601 string.

BRO date/dateTime elements are a choice of full date (`YYYY-MM-DD`),
year-month (`YYYY-MM`), year (`YYYY`), full `dateTime`, or a `voidReason`
code (e.g. "onbekend") when the value is unknown. The exact lexical value is
returned unchanged so no precision or timezone information is lost;
`voidReason` codes and any unrecognized input yield `null`.

Timezone handling (per BRO): `dateTime` values carry a mandatory offset, which
for Dutch data is the seasonal `+01:00` (winter) / `+02:00` (summer) — never
`Z`. BRO derives the calendar date from the *Dutch-local* time, so the
intended date is simply the lexical `YYYY-MM-DD` prefix of the string. We keep
the string verbatim precisely to avoid a UTC conversion silently shifting the
date across midnight (BRO's own worked example of the pitfall). Consumers can
build a `Date`/`Temporal` when needed, but beware: `new Date("YYYY-MM-DD")` on
a date-only value is parsed as UTC midnight and can render as the previous day
in negative-offset zones — treat date-only values as plain calendar dates.

## Parameters

| Parameter | Type |
| ------ | ------ |
| `value` | `string` \| `null` \| `undefined` |

## Returns

`string` \| `null`

## See

https://www.bro-productomgeving.nl/bpo/release-2.5_2024_Q4/informatie-voor-softwareleveranciers/het-afhandelen-van-tijdstippen

Unlike the numeric resolvers this does not warn on non-matching input,
because `voidReason` is a legitimate and common value in archive data.
