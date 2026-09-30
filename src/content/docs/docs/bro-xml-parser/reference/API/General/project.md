---
title: project
prev: false
next: false
editUrl: false
---

# Function: project()

```ts
function project<P, S>(root, select): ObjectProducer<ProjectResult<S>>;
```

Defined in: [src/core/select.ts:222](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/select.ts#L222)

Compile a selection over `root` into an ObjectProducer. The result
parses through SchemaParser like any producer (e.g. via
`BROParser.parseSelection`).

## Type Parameters

| Type Parameter |
| ------ |
| `P` *extends* `ObjectProducer`\<`unknown`, `Presence`\> |
| `S` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `root` | `P` |
| `select` | (`t`) => `S` |

## Returns

`ObjectProducer`\<[`ProjectResult`](/docs/bro-xml-parser/reference/api/general/projectresult/)\<`S`\>\>
