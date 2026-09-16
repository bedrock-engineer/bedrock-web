---
title: BHRGTLayer
prev: false
next: false
editUrl: false
---

# Interface: BHRGTLayer

Defined in: [src/types/index.ts:350](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L350)

BHR-GT (Borehole Research Geotechnical) layer data

Contains all fields from the BRO BHR-GT schema for a single soil layer.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="upperboundary"></a> `upperBoundary` | `number` | - | [src/types/index.ts:352](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L352) |
| <a id="lowerboundary"></a> `lowerBoundary` | `number` | - | [src/types/index.ts:353](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L353) |
| <a id="upperboundarydetermination"></a> `upperBoundaryDetermination?` | `string` \| `null` | - | [src/types/index.ts:356](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L356) |
| <a id="lowerboundarydetermination"></a> `lowerBoundaryDetermination?` | `string` \| `null` | - | [src/types/index.ts:357](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L357) |
| <a id="anthropogenic"></a> `anthropogenic?` | `boolean` \| `null` | Whether the layer is anthropogenic (man-made) | [src/types/index.ts:361](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L361) |
| <a id="geotechnicalsoilname"></a> `geotechnicalSoilName` | `string` | - | [src/types/index.ts:364](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L364) |
| <a id="soilnamenen5104"></a> `soilNameNEN5104?` | `string` \| `null` | Soil name per NEN 5104 (IMBRO/A archive data; geotechnicalSoilName is often nil there) | [src/types/index.ts:366](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L366) |
| <a id="gravelcontentclassnen5104"></a> `gravelContentClassNEN5104?` | `string` \| `null` | Gravel content classification per NEN 5104 (IMBRO/A) | [src/types/index.ts:368](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L368) |
| <a id="organicmattercontentclassnen5104"></a> `organicMatterContentClassNEN5104?` | `string` \| `null` | Organic matter content classification per NEN 5104 (IMBRO/A) | [src/types/index.ts:370](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L370) |
| <a id="tertiaryconstituent"></a> `tertiaryConstituent?` | `string` \| `null` | Tertiary soil constituent (e.g., "schelpMateriaal", "plantenresten") | [src/types/index.ts:374](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L374) |
| <a id="color"></a> `color?` | `string` | Soil color code | [src/types/index.ts:376](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L376) |
| <a id="dispersedinhomogeneity"></a> `dispersedInhomogeneity?` | `boolean` \| `null` | Dispersed inhomogeneity presence | [src/types/index.ts:378](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L378) |
| <a id="organicmattercontentclass"></a> `organicMatterContentClass?` | `string` \| `null` | Organic matter content classification | [src/types/index.ts:380](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L380) |
| <a id="carbonatecontentclass"></a> `carbonateContentClass?` | `string` \| `null` | Carbonate content classification | [src/types/index.ts:382](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L382) |
| <a id="sandmedianclass"></a> `sandMedianClass?` | `string` \| `null` | Sand median grain size classification | [src/types/index.ts:384](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L384) |
| <a id="gravelmedianclass"></a> `gravelMedianClass?` | `string` \| `null` | Gravel median grain size classification (e.g., "fijn", "middelgrof") | [src/types/index.ts:386](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L386) |
| <a id="geotechnicaldepositionalcharacteristic"></a> `geotechnicalDepositionalCharacteristic?` | `string` \| `null` | Depositional characteristic of the soil (e.g., "nietBepaald") | [src/types/index.ts:388](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L388) |
| <a id="interbedding"></a> `interbedding?` | `string` \| `null` | Interbedding of other material in the soil (e.g., "kleiWeinigDikkeLaminae") | [src/types/index.ts:390](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L390) |
| <a id="grainshape"></a> `grainshape?` | [`Grainshape`](/docs/bro-xml-parser/reference/api/bhr-gt/grainshape/) | Grain shape properties (for sand/gravel) | [src/types/index.ts:392](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L392) |
| <a id="slant"></a> `slant?` | `boolean` \| `null` | Whether the layer boundary is slanted | [src/types/index.ts:396](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L396) |
| <a id="bedded"></a> `bedded?` | `boolean` \| `null` | Whether the layer is bedded/stratified | [src/types/index.ts:398](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L398) |
| <a id="bedding"></a> `bedding?` | `string` \| `null` | Bedding type of the layer (e.g., "dikGelamineerd") | [src/types/index.ts:400](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L400) |
| <a id="compositelayer"></a> `compositeLayer?` | `boolean` \| `null` | Whether the layer is a composite layer | [src/types/index.ts:402](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L402) |
| <a id="activitytype"></a> `activityType?` | `string` \| `null` | Human activity type observed in the layer (e.g., "nietBepaald") | [src/types/index.ts:404](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L404) |
| <a id="internalstructureintact"></a> `internalStructureIntact?` | `boolean` \| `null` | Whether the internal structure is intact (undisturbed) | [src/types/index.ts:406](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L406) |
| <a id="mixed"></a> `mixed?` | `boolean` \| `null` | Whether the soil is mixed | [src/types/index.ts:408](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L408) |
| <a id="mottled"></a> `mottled?` | `boolean` \| `null` | Whether the soil has mottled appearance | [src/types/index.ts:410](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L410) |
| <a id="finesoilconsistency"></a> `fineSoilConsistency?` | `string` \| `null` | Consistency of fine-grained soils (e.g., "slap", "stevig", "vast") | [src/types/index.ts:414](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L414) |
| <a id="organicsoilconsistency"></a> `organicSoilConsistency?` | `string` \| `null` | Consistency of organic soils | [src/types/index.ts:418](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L418) |
| <a id="organicsoiltexture"></a> `organicSoilTexture?` | `string` \| `null` | Texture of organic soils (e.g., "vezeligGrof", "vezeligFijn") | [src/types/index.ts:420](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L420) |
| <a id="peattensilestrength"></a> `peatTensileStrength?` | `string` \| `null` | Tensile strength of peat | [src/types/index.ts:422](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L422) |
