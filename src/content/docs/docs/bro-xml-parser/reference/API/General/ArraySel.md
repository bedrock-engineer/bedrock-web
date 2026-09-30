---
title: ArraySel
prev: false
next: false
editUrl: false
---

# Interface: ArraySel\<I\>

Defined in: [src/core/select.ts:39](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/select.ts#L39)

An array node: select the whole array (it is a [Leaf](/docs/bro-xml-parser/reference/api/general/leaf/)), or `.each` a row.

## Extends

- [`Leaf`](/docs/bro-xml-parser/reference/api/general/leaf/)\<[`Produced`](/docs/bro-xml-parser/reference/api/general/produced/)\<`I`\>[]\>

## Type Parameters

| Type Parameter |
| ------ |
| `I` |

## Methods

### each()

```ts
each<R>(fn): Leaf<ProjectResult<R>[]>;
```

Defined in: [src/core/select.ts:40](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/select.ts#L40)

#### Type Parameters

| Type Parameter |
| ------ |
| `R` |

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `fn` | (`el`) => `R` |

#### Returns

[`Leaf`](/docs/bro-xml-parser/reference/api/general/leaf/)\<[`ProjectResult`](/docs/bro-xml-parser/reference/api/general/projectresult/)\<`R`\>[]\>

## Properties

| Property | Modifier | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="out"></a> `[OUT]?` | `readonly` | [`Produced`](/docs/bro-xml-parser/reference/api/general/produced/)\<`I`\>[] | [`Leaf`](/docs/bro-xml-parser/reference/api/general/leaf/).[`[OUT]`](/docs/bro-xml-parser/reference/api/general/leaf/#out) | [src/core/select.ts:35](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/select.ts#L35) |
