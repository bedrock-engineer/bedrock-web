---
title: text
prev: false
next: false
editUrl: false
---

# Function: text()

```ts
function text<P>(at?, opts?): ScalarProducer<string | null, P>;
```

Defined in: [src/core/producer.ts:194](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L194)

Raw trimmed text (`string | null`).

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

`ScalarProducer`\<`string` \| `null`, `P`\>
