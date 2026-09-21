---
title: ColumnParser
prev: false
next: false
editUrl: false
---

# Type Alias: ColumnParser\<V\>

```ts
type ColumnParser<V> = (raw) => V;
```

Defined in: [src/core/columns.ts:18](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/columns.ts#L18)

Parse one CSV cell into a typed value.

## Type Parameters

| Type Parameter |
| ------ |
| `V` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `raw` | `string` |

## Returns

`V`
