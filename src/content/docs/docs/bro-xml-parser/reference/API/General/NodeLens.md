---
title: NodeLens
prev: false
next: false
editUrl: false
---

# Interface: NodeLens

Defined in: [src/core/producer.ts:45](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L45)

The narrow, relative-only surface a `CustomProducer` receives.

A custom producer never sees the raw [XMLAdapter](/docs/bro-xml-parser/reference/api/general/xmladapter/) or escapes its subtree —
it reads text and child nodes relative to the node it was mounted on.

## Methods

### name()

```ts
name(): string | null;
```

Defined in: [src/core/producer.ts:47](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L47)

Local (namespace-stripped) name of this lens' own node (`null` if none).

#### Returns

`string` \| `null`

***

### text()

```ts
text(): string | null;
```

Defined in: [src/core/producer.ts:49](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L49)

Trimmed text content of this lens' own node (`null` if empty).

#### Returns

`string` \| `null`

***

### textAt()

```ts
textAt(xpath): string | null;
```

Defined in: [src/core/producer.ts:51](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L51)

Trimmed text at a relative XPath (`null` if the node is absent/empty).

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xpath` | `string` |

#### Returns

`string` \| `null`

***

### attr()

```ts
attr(xpath): string | null;
```

Defined in: [src/core/producer.ts:53](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L53)

Value of an attribute reached by a relative XPath ending in `/@name`.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xpath` | `string` |

#### Returns

`string` \| `null`

***

### all()

```ts
all(xpath): NodeLens[];
```

Defined in: [src/core/producer.ts:55](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/56ae77765c1e8202d9985d5eced277c4c34eb6b2/src/core/producer.ts#L55)

A lens per node matching a relative XPath.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xpath` | `string` |

#### Returns

`NodeLens`[]
