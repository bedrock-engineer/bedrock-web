---
title: array
prev: false
next: false
editUrl: false
---

# Function: array()

```ts
function array<I, P>(opts): ArrayProducer<Produced<I>[], P> & object;
```

Defined in: [src/core/producer.ts:324](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L324)

A repeated subtree. `each` selects item nodes; `item` produces one value. The
item producer's type is carried in the phantom `_item` (see [object](/docs/bro-xml-parser/reference/api/functions/producersobject/)).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `I` *extends* [`Producer`](/docs/bro-xml-parser/reference/api/general/producer/)\<`unknown`, `Presence`\> | - |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `object` & `BaseMeta` |

## Returns

`ArrayProducer`\<[`Produced`](/docs/bro-xml-parser/reference/api/general/produced/)\<`I`\>[], `P`\> & `object`
