---
title: array
prev: false
next: false
editUrl: false
---

# Function: array()

```ts
function array<E, P>(opts): ArrayProducer<E[], P>;
```

Defined in: [src/core/producer.ts:251](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L251)

A repeated subtree. `each` selects item nodes; `item` produces one value.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `E` | - |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `object` & `BaseMeta` |

## Returns

`ArrayProducer`\<`E`[], `P`\>
