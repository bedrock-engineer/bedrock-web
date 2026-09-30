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

Defined in: [src/core/producer.ts:245](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L245)

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
