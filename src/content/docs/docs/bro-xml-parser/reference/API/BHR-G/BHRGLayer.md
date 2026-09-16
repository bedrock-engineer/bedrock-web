---
title: BHRGLayer
prev: false
next: false
editUrl: false
---

# Interface: BHRGLayer

Defined in: [src/types/index.ts:606](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L606)

BHR-G (Geological Borehole) layer data

Contains all fields from the BRO BHR-G schema for a single soil layer.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="upperboundary"></a> `upperBoundary` | `number` | - | [src/types/index.ts:608](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L608) |
| <a id="lowerboundary"></a> `lowerBoundary` | `number` | - | [src/types/index.ts:609](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L609) |
| <a id="upperboundarydetermination"></a> `upperBoundaryDetermination?` | `string` \| `null` | - | [src/types/index.ts:612](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L612) |
| <a id="lowerboundarydetermination"></a> `lowerBoundaryDetermination?` | `string` \| `null` | - | [src/types/index.ts:613](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L613) |
| <a id="soilnamenen5104"></a> `soilNameNEN5104` | `string` | - | [src/types/index.ts:616](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L616) |
| <a id="color"></a> `color?` | `string` | - | [src/types/index.ts:619](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L619) |
| <a id="anthropogenic"></a> `anthropogenic?` | `string` \| `null` | Whether the layer is anthropogenic (man-made) - uses string codes in BHR-G (ja/nee/onbekend) | [src/types/index.ts:621](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L621) |
| <a id="rooted"></a> `rooted?` | `string` \| `null` | Whether the layer is rooted - uses string codes in BHR-G (ja/nee/onbekend) | [src/types/index.ts:623](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L623) |
| <a id="organicmattercontentclassnen5104"></a> `organicMatterContentClassNEN5104?` | `string` \| `null` | - | [src/types/index.ts:624](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L624) |
| <a id="gravelcontentclass"></a> `gravelContentClass?` | `string` \| `null` | - | [src/types/index.ts:625](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L625) |
| <a id="carbonatecontentclass"></a> `carbonateContentClass?` | `string` \| `null` | - | [src/types/index.ts:626](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L626) |
| <a id="sandmedianclass"></a> `sandMedianClass?` | `string` \| `null` | - | [src/types/index.ts:627](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L627) |
