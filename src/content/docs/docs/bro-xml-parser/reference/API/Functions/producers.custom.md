---
title: custom
prev: false
next: false
editUrl: false
---

# Function: custom()

```ts
function custom<T, P>(opts): CustomProducer<T, P>;
```

Defined in: [src/core/producer.ts:259](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L259)

The escape hatch: a decoder handed a relative-only [NodeLens](/docs/bro-xml-parser/reference/api/general/nodelens/).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `object` & `BaseMeta` |

## Returns

`CustomProducer`\<`T`, `P`\>
