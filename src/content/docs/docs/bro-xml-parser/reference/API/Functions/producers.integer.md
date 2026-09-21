---
title: integer
prev: false
next: false
editUrl: false
---

# Function: integer()

```ts
function integer<P>(at?, opts?): ScalarProducer<number | null, P>;
```

Defined in: [src/core/producer.ts:218](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L218)

Integer (`number | null`).

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
