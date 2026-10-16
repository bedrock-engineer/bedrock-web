---
title: columns
prev: false
next: false
editUrl: false
---

# Function: columns()

```ts
function columns<Spec>(
   valuesAt, 
   spec, 
   options?
): CustomProducer<{ [K in string]: { [S in ColumnSpec<string, unknown> as S["name"]]: ReturnType<S["parse"]> }[K] }[]>;
```

Defined in: [src/core/columns.ts:142](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/columns.ts#L142)

A [Producer](/docs/bro-xml-parser/reference/api/general/producer/) that reads the CSV text at `valuesAt` (relative to the
enclosing node) and decodes it with `decodeColumns`. Yields `[]` when the
values element is absent.

The row type is **inferred** from the (`as const`) `spec` — each column's name
and cell-parser return type — so callers no longer declare it by hand.

## Type Parameters

| Type Parameter |
| ------ |
| `Spec` *extends* readonly ( \| [`ColumnSpec`](/docs/bro-xml-parser/reference/api/interfaces/producerscolumnspec/)\<`string`, `unknown`\> \| `null`)[] |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `valuesAt` | `string` |
| `spec` | `Spec` |
| `options?` | `DecodeColumnsOptions` |

## Returns

`CustomProducer`\<`{ [K in string]: { [S in ColumnSpec<string, unknown> as S["name"]]: ReturnType<S["parse"]> }[K] }`[]\>
