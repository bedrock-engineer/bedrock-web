---
title: RowOf
prev: false
next: false
editUrl: false
---

# Type Alias: RowOf\<Spec\>

```ts
type RowOf<Spec> = Simplify<{ [S in Extract<Spec[number], ColumnSpec> as S["name"]]: ReturnType<S["parse"]> }>;
```

Defined in: [src/core/columns.ts:42](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/columns.ts#L42)

The row object inferred from a `const` column-spec tuple. Every non-`null`
column contributes a **required** key (the decoder always assigns it — `null`
when the cell is absent), typed as that column's cell-parser return type.
A `null` spec entry (a skipped position) contributes nothing.

## Type Parameters

| Type Parameter |
| ------ |
| `Spec` *extends* `ReadonlyArray`\<[`ColumnSpec`](/docs/bro-xml-parser/reference/api/interfaces/producerscolumnspec/) \| `null`\> |
