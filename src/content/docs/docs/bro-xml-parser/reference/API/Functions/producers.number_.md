---
title: number_
prev: false
next: false
editUrl: false
---

# Function: number\_()

```ts
function number_<P>(at?, opts?): ScalarProducer<number | null, P>;
```

Defined in: [src/core/producer.ts:210](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L210)

Decimal number (`number | null`).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `at?` | `string` |
| `opts?` | `LeafOpts`\<`P`\> |

## Returns

`ScalarProducer`\<`number` \| `null`, `P`\>
