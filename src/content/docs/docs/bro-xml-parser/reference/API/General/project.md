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

Defined in: [src/core/select.ts:185](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/select.ts#L185)

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
