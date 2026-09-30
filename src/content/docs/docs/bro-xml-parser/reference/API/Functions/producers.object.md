---
title: object
prev: false
next: false
editUrl: false
---

# Function: object()

```ts
function object<F, P>(opts): ObjectProducer<{ [K in string | number | symbol]: ({ [K in string | number | symbol]: FieldValue<F[K]> } & { [K in string | number | symbol]?: FieldValue<F[K]> })[K] }, P> & object;
```

Defined in: [src/core/producer.ts:310](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L310)

A fixed set of named fields. Output type is inferred from `fields`.

The concrete `fields` map type is also carried in the phantom `_fields`, so the
`project` selector can mirror the producer's structure at the type level (an
atomic `custom` field stays a leaf even when its value type looks structural).

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

`ObjectProducer`\<\{ \[K in string \| number \| symbol\]: (\{ \[K in string \| number \| symbol\]: FieldValue\<F\[K\]\> \} & \{ \[K in string \| number \| symbol\]?: FieldValue\<F\[K\]\> \})\[K\] \}, `P`\> & `object`
