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

Defined in: [src/core/producer.ts:335](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L335)

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
