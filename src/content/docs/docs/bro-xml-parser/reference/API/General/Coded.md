---
title: Coded
prev: false
next: false
editUrl: false
---

# Interface: Coded

Defined in: [src/core/producer.ts:39](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L39)

A BRO coded value: the `code` text plus the `codeSpace` domain URI that the XML
carries as a `codeSpace` attribute (e.g. `urn:bro:cpt:QualityClass`).

First-class data, so the domain is never guessed from a field name — the
`describe` helper in the `/reference-codes` subpath resolves it correctly by
`codeSpace`. An absent or nil coded element parses to `null`; a present one is
always a full `{ code, codeSpace }`.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="code"></a> `code` | `string` | [src/core/producer.ts:40](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L40) |
| <a id="codespace"></a> `codeSpace` | `string` | [src/core/producer.ts:41](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/core/producer.ts#L41) |
