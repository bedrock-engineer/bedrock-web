---
title: BHRGTLayerBase
prev: false
next: false
editUrl: false
---

# Interface: BHRGTLayerBase

Defined in: [src/types/index.ts:439](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L439)

Fields shared by every BHR-GT described layer, regardless of whether it
describes soil or rock (they live directly on the XSD `layer` element).

## Extended by

- [`BHRGTSoilLayer`](/docs/bro-xml-parser/reference/api/bhr-gt/bhrgtsoillayer/)
- [`BHRGTRockLayer`](/docs/bro-xml-parser/reference/api/bhr-gt/bhrgtrocklayer/)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="upperboundary"></a> `upperBoundary` | `number` | - | [src/types/index.ts:441](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L441) |
| <a id="lowerboundary"></a> `lowerBoundary` | `number` | - | [src/types/index.ts:442](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L442) |
| <a id="upperboundarydetermination"></a> `upperBoundaryDetermination?` | `string` \| `null` | - | [src/types/index.ts:445](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L445) |
| <a id="lowerboundarydetermination"></a> `lowerBoundaryDetermination?` | `string` \| `null` | - | [src/types/index.ts:446](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L446) |
| <a id="anthropogenic"></a> `anthropogenic?` | `boolean` \| `null` | Whether the layer is anthropogenic (man-made) | [src/types/index.ts:450](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L450) |
| <a id="slant"></a> `slant?` | `boolean` \| `null` | Whether the layer boundary is slanted | [src/types/index.ts:454](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L454) |
| <a id="bedded"></a> `bedded?` | `boolean` \| `null` | Whether the layer is bedded/stratified | [src/types/index.ts:456](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L456) |
| <a id="bedding"></a> `bedding?` | `string` \| `null` | Bedding type of the layer (e.g., "dikGelamineerd") | [src/types/index.ts:458](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L458) |
| <a id="compositelayer"></a> `compositeLayer?` | `boolean` \| `null` | Whether the layer is a composite layer | [src/types/index.ts:460](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L460) |
| <a id="activitytype"></a> `activityType?` | `string` \| `null` | Human activity type observed in the layer (e.g., "nietBepaald") | [src/types/index.ts:462](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L462) |
| <a id="internalstructureintact"></a> `internalStructureIntact?` | `boolean` \| `null` | Whether the internal structure is intact (undisturbed) | [src/types/index.ts:464](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L464) |
| <a id="specialmaterial"></a> `specialMaterial?` | `string` \| `null` | Special material in the layer (e.g. anthropogenic debris) | [src/types/index.ts:468](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L468) |
