---
title: code
prev: false
next: false
editUrl: false
---

# Function: code()

```ts
function code<P>(at?, opts?): CodeProducer<Coded | null, P>;
```

Defined in: [src/core/producer.ts:290](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L290)

A BRO coded value (`{ code, codeSpace } | null`). Reads the element's text and
its `codeSpace` attribute; absent/nil (no text) → `null`. A first-class leaf, so
presence (`optional`/`required`/`omit`) and array-item handling apply as they do
to [text](/docs/bro-xml-parser/reference/api/functions/producerstext/) / [number](/docs/bro-xml-parser/reference/api/functions/producersnumber/).

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

`CodeProducer`\<[`Coded`](/docs/bro-xml-parser/reference/api/general/coded/) \| `null`, `P`\>
