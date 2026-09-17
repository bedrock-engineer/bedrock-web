---
title: BHRGTRockLayer
prev: false
next: false
editUrl: false
---

# Interface: BHRGTRockLayer

Defined in: [src/types/index.ts:552](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L552)

A BHR-GT layer that describes rock.
Discriminate on `material === "rock"`.

## Extends

- [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/)

## Properties

| Property | Type | Description | Inherited from | Defined in |
| ------ | ------ | ------ | ------ | ------ |
| <a id="upperboundary"></a> `upperBoundary` | `number` | - | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`upperBoundary`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#upperboundary) | [src/types/index.ts:441](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L441) |
| <a id="lowerboundary"></a> `lowerBoundary` | `number` | - | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`lowerBoundary`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#lowerboundary) | [src/types/index.ts:442](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L442) |
| <a id="upperboundarydetermination"></a> `upperBoundaryDetermination?` | `string` \| `null` | - | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`upperBoundaryDetermination`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#upperboundarydetermination) | [src/types/index.ts:445](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L445) |
| <a id="lowerboundarydetermination"></a> `lowerBoundaryDetermination?` | `string` \| `null` | - | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`lowerBoundaryDetermination`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#lowerboundarydetermination) | [src/types/index.ts:446](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L446) |
| <a id="anthropogenic"></a> `anthropogenic?` | `boolean` \| `null` | Whether the layer is anthropogenic (man-made) | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`anthropogenic`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#anthropogenic) | [src/types/index.ts:450](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L450) |
| <a id="slant"></a> `slant?` | `boolean` \| `null` | Whether the layer boundary is slanted | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`slant`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#slant) | [src/types/index.ts:454](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L454) |
| <a id="bedded"></a> `bedded?` | `boolean` \| `null` | Whether the layer is bedded/stratified | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`bedded`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#bedded) | [src/types/index.ts:456](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L456) |
| <a id="bedding"></a> `bedding?` | `string` \| `null` | Bedding type of the layer (e.g., "dikGelamineerd") | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`bedding`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#bedding) | [src/types/index.ts:458](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L458) |
| <a id="compositelayer"></a> `compositeLayer?` | `boolean` \| `null` | Whether the layer is a composite layer | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`compositeLayer`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#compositelayer) | [src/types/index.ts:460](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L460) |
| <a id="activitytype"></a> `activityType?` | `string` \| `null` | Human activity type observed in the layer (e.g., "nietBepaald") | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`activityType`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#activitytype) | [src/types/index.ts:462](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L462) |
| <a id="internalstructureintact"></a> `internalStructureIntact?` | `boolean` \| `null` | Whether the internal structure is intact (undisturbed) | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`internalStructureIntact`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#internalstructureintact) | [src/types/index.ts:464](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L464) |
| <a id="specialmaterial"></a> `specialMaterial?` | `string` \| `null` | Special material in the layer (e.g. anthropogenic debris) | [`BHRGTLayerBase`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/).[`specialMaterial`](/docs/bro-xml-parser/reference/api/general/bhrgtlayerbase/#specialmaterial) | [src/types/index.ts:468](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L468) |
| <a id="material"></a> `material` | `"rock"` | - | - | [src/types/index.ts:553](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L553) |
| <a id="rock"></a> `rock` | [`RockDescription`](/docs/bro-xml-parser/reference/api/bhr-gt/rockdescription/) | Rock description | - | [src/types/index.ts:555](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L555) |
