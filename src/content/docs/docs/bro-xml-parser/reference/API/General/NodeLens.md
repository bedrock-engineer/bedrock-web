---
title: NodeLens
prev: false
next: false
editUrl: false
---

# Interface: NodeLens

Defined in: [src/core/producer.ts:78](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L78)

The narrow, relative-only surface a `CustomProducer` receives.

A custom producer never sees the raw [XMLAdapter](/docs/bro-xml-parser/reference/api/general/xmladapter/) or escapes its subtree —
it reads text and child nodes relative to the node it was mounted on.

## Methods

### name()

```ts
name(): string | null;
```

Defined in: [src/core/producer.ts:80](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L80)

Local (namespace-stripped) name of this lens' own node (`null` if none).

#### Returns

`string` \| `null`

***

### text()

```ts
text(): string | null;
```

Defined in: [src/core/producer.ts:82](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L82)

Trimmed text content of this lens' own node (`null` if empty).

#### Returns

`string` \| `null`

***

### textAt()

```ts
textAt(xpath): string | null;
```

Defined in: [src/core/producer.ts:84](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L84)

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

Defined in: [src/core/producer.ts:86](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L86)

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

Defined in: [src/core/producer.ts:88](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/core/producer.ts#L88)

A lens per node matching a relative XPath.

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xpath` | `string` |

#### Returns

`NodeLens`[]
