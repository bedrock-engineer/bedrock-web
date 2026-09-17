---
title: RockDescription
prev: false
next: false
editUrl: false
---

# Interface: RockDescription

Defined in: [src/types/index.ts:392](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L392)

Rock description for a layer (BHR-GT `rock` element).

A layer describes either soil (flattened onto BHRGTLayer) or rock (this
nested object). Yes/no fields keep their raw code (e.g. "ja", "nee",
"nietWaargenomen") to preserve archive nuance.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="rocktype"></a> `rockType` | `string` \| `null` | - | [src/types/index.ts:393](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L393) |
| <a id="cementtype"></a> `cementType` | `string` \| `null` | - | [src/types/index.ts:394](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L394) |
| <a id="colour"></a> `colour` | `string` \| `null` | - | [src/types/index.ts:395](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L395) |
| <a id="tertiaryrockconstituent"></a> `tertiaryRockConstituent` | `string`[] | Tertiary rock constituents (1 or more) | [src/types/index.ts:397](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L397) |
| <a id="interbedding"></a> `interbedding` | `string` \| `null` | - | [src/types/index.ts:398](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L398) |
| <a id="dispersedinhomogeneity"></a> `dispersedInhomogeneity` | `string`[] | Dispersed inhomogeneities (0-2) | [src/types/index.ts:400](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L400) |
| <a id="carbonatecontentclass"></a> `carbonateContentClass` | `string` \| `null` | - | [src/types/index.ts:401](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L401) |
| <a id="crossbedding"></a> `crossBedding` | `string` \| `null` | - | [src/types/index.ts:402](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L402) |
| <a id="gradedbedding"></a> `gradedBedding` | `string` \| `null` | - | [src/types/index.ts:403](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L403) |
| <a id="voidspresent"></a> `voidsPresent` | `string` \| `null` | - | [src/types/index.ts:404](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L404) |
| <a id="voiddistribution"></a> `voidDistribution` | `string` \| `null` | - | [src/types/index.ts:405](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L405) |
| <a id="stability"></a> `stability` | `string` \| `null` | - | [src/types/index.ts:406](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L406) |
| <a id="strengthclass"></a> `strengthClass` | `string` \| `null` | - | [src/types/index.ts:407](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L407) |
| <a id="weathered"></a> `weathered` | `string` \| `null` | - | [src/types/index.ts:408](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L408) |
| <a id="weatheringdegree"></a> `weatheringDegree?` | [`RockWeatheringDegree`](/docs/bro-xml-parser/reference/api/bhr-gt/rockweatheringdegree/) | - | [src/types/index.ts:409](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L409) |
