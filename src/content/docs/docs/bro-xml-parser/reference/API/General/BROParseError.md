---
title: BROParseError
prev: false
next: false
editUrl: false
---

# Class: BROParseError

Defined in: [src/types/index.ts:1364](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1364)

Parse error with context

## Extends

- `Error`

## Constructors

### Constructor

```ts
new BROParseError(message, details): BROParseError;
```

Defined in: [src/types/index.ts:1368](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1368)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `message` | `string` |
| `details` | \{ \[`key`: `string`\]: `unknown`; `code`: `string`; \} |
| `details.code` | `string` |

#### Returns

`BROParseError`

#### Overrides

```ts
Error.constructor
```

## Properties

| Property | Modifier | Type | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | `readonly` | `string` | - | [src/types/index.ts:1365](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1365) |
| <a id="details"></a> `details` | `readonly` | `Record`\<`string`, `unknown`\> | - | [src/types/index.ts:1366](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1366) |
| <a id="cause"></a> `cause?` | `public` | `unknown` | `Error.cause` | node\_modules/typescript/lib/lib.es2022.error.d.ts:24 |
| <a id="name"></a> `name` | `public` | `string` | `Error.name` | node\_modules/typescript/lib/lib.es5.d.ts:1074 |
| <a id="message"></a> `message` | `public` | `string` | `Error.message` | node\_modules/typescript/lib/lib.es5.d.ts:1075 |
| <a id="stack"></a> `stack?` | `public` | `string` | `Error.stack` | node\_modules/typescript/lib/lib.es5.d.ts:1076 |
