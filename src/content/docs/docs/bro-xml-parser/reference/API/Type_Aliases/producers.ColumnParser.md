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

Defined in: [src/core/columns.ts:18](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/columns.ts#L18)

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
