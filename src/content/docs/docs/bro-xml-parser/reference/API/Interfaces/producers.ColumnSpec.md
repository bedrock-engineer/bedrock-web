---
title: ColumnSpec
prev: false
next: false
editUrl: false
---

# Interface: ColumnSpec\<Name, V\>

Defined in: [src/core/columns.ts:21](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/columns.ts#L21)

One column of a CSV time-series.

## Type Parameters

| Type Parameter | Default type |
| ------ | ------ |
| `Name` *extends* `string` | `string` |
| `V` | `unknown` |

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name-1"></a> `name` | `Name` | Output property name on each row object. | [src/core/columns.ts:23](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/columns.ts#L23) |
| <a id="parse"></a> `parse` | [`ColumnParser`](/docs/bro-xml-parser/reference/api/type_aliases/producerscolumnparser/)\<`V`\> | Cell parser (see `col`). | [src/core/columns.ts:25](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/columns.ts#L25) |
| <a id="optional"></a> `optional?` | `boolean` | When true, a row missing this (trailing) column is still kept. By default a row with fewer cells than the number of required columns is dropped. | [src/core/columns.ts:30](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/columns.ts#L30) |
