---
title: oneOf
prev: false
next: false
editUrl: false
---

# Function: oneOf()

```ts
function oneOf<TagKey, Base, Branches, P>(opts): OneOfProducer<OneOfOut<TagKey, Base, Branches>, P> & object;
```

Defined in: [src/core/producer.ts:370](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L370)

An honest discriminated union. `base` fields are parsed once; the first branch
whose `when` XPath exists is parsed and merged, with its literal `tag` written
under `tagAs`.

The output type is **inferred**: a discriminated union keyed on `tagAs`, each
member being the shared `base` fields plus that branch's `fields` plus the
literal `tag`. Presence is honoured throughout (`omit` → optional key).

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `TagKey` *extends* `string` | - |
| `Base` *extends* `Record`\<`string`, [`Producer`](/docs/bro-xml-parser/reference/api/general/producer/)\<`unknown`, `Presence`\>\> | - |
| `Branches` *extends* readonly `BranchInput`\<`string`, `Record`\<`string`, [`Producer`](/docs/bro-xml-parser/reference/api/general/producer/)\<`unknown`, `Presence`\>\>\>[] | - |
| `P` *extends* `Presence` | `"optional"` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `opts` | `object` & `BaseMeta` |

## Returns

`OneOfProducer`\<`OneOfOut`\<`TagKey`, `Base`, `Branches`\>, `P`\> & `object`
