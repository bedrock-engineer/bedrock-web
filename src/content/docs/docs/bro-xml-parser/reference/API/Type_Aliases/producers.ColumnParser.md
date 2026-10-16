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

Defined in: [src/core/columns.ts:18](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/columns.ts#L18)

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
