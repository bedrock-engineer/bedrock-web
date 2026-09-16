---
title: XMLAdapter
prev: false
next: false
editUrl: false
---

# Class: XMLAdapter

Defined in: [src/adapters/browser-adapter.ts:13](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/adapters/browser-adapter.ts#L13)

## Implements

- `XMLAdapter`

## Constructors

### Constructor

```ts
new XMLAdapter(): BrowserXMLAdapter;
```

Defined in: [src/adapters/browser-adapter.ts:16](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/adapters/browser-adapter.ts#L16)

#### Returns

`BrowserXMLAdapter`

## Methods

### parseXML()

```ts
parseXML(xmlText): Document;
```

Defined in: [src/adapters/browser-adapter.ts:20](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/adapters/browser-adapter.ts#L20)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `xmlText` | `string` |

#### Returns

`Document`

#### Implementation of

```ts
XMLAdapter.parseXML
```

***

### evaluateXPath()

```ts
evaluateXPath(
   doc, 
   query, 
   namespaceResolver
): Node | null;
```

Defined in: [src/adapters/browser-adapter.ts:31](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/adapters/browser-adapter.ts#L31)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `doc` | `Document` \| `Node` |
| `query` | `string` |
| `namespaceResolver` | (`prefix`) => `string` \| `null` |

#### Returns

`Node` \| `null`

#### Implementation of

```ts
XMLAdapter.evaluateXPath
```

***

### evaluateXPathAll()

```ts
evaluateXPathAll(
   doc, 
   query, 
   namespaceResolver
): Node[];
```

Defined in: [src/adapters/browser-adapter.ts:74](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/adapters/browser-adapter.ts#L74)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `doc` | `Document` \| `Node` |
| `query` | `string` |
| `namespaceResolver` | (`prefix`) => `string` \| `null` |

#### Returns

`Node`[]

#### Implementation of

```ts
XMLAdapter.evaluateXPathAll
```
