---
title: object_
prev: false
next: false
editUrl: false
---

# Function: object\_()

```ts
function object_<F, P>(opts): ObjectProducer<{ [K in string | number | symbol]: ({ [K in string | number | symbol]: Produced<F[K]> } & { [K in string | number | symbol]?: Produced<F[K]> })[K] }, P>;
```

Defined in: [src/core/producer.ts:242](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L242)

A fixed set of named fields. Output type is inferred from `fields`.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `F` *extends* `Record`\<`string`, [`Producer`](/docs/bro-xml-parser/reference/api/general/producer/)\<`unknown`, `Presence`\>\> | - |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `object` & `BaseMeta` |

## Returns

`ObjectProducer`\<\{ \[K in string \| number \| symbol\]: (\{ \[K in string \| number \| symbol\]: Produced\<F\[K\]\> \} & \{ \[K in string \| number \| symbol\]?: Produced\<F\[K\]\> \})\[K\] \}, `P`\>
