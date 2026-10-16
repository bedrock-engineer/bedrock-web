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

Defined in: [src/core/producer.ts:375](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L375)

The escape hatch: a decoder handed a relative-only [NodeLens](/docs/bro-xml-parser/reference/api/general/nodelens/).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `T` | - |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `object` & `ProducerMeta` |

## Returns

`CustomProducer`\<`T`, `P`\>
