---
title: BROParseError
prev: false
next: false
editUrl: false
---

# Class: BROParseError

Defined in: [src/types/index.ts:258](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L258)

Parse error with context

## Extends

- `Error`

## Constructors

### Constructor

```ts
new BROParseError(message, details): BROParseError;
```

Defined in: [src/types/index.ts:262](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L262)

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
| <a id="code"></a> `code` | `readonly` | `string` | - | [src/types/index.ts:259](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L259) |
| <a id="details"></a> `details` | `readonly` | `Record`\<`string`, `unknown`\> | - | [src/types/index.ts:260](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L260) |
| <a id="cause"></a> `cause?` | `public` | `unknown` | `Error.cause` | node\_modules/typescript/lib/lib.es2022.error.d.ts:24 |
| <a id="name"></a> `name` | `public` | `string` | `Error.name` | node\_modules/typescript/lib/lib.es5.d.ts:1074 |
| <a id="message"></a> `message` | `public` | `string` | `Error.message` | node\_modules/typescript/lib/lib.es5.d.ts:1075 |
| <a id="stack"></a> `stack?` | `public` | `string` | `Error.stack` | node\_modules/typescript/lib/lib.es5.d.ts:1076 |
