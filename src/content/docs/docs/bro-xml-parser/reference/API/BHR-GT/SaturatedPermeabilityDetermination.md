---
title: SaturatedPermeabilityDetermination
prev: false
next: false
editUrl: false
---

# Interface: SaturatedPermeabilityDetermination

Defined in: [src/types/index.ts:1505](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1505)

Saturated permeability determination (hydraulic conductivity)
Used to determine water flow characteristics through soil

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="determinationprocedure"></a> `determinationProcedure` | `string` \| `null` | - | [src/types/index.ts:1506](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1506) |
| <a id="determinationmethod"></a> `determinationMethod` | `string` \| `null` | - | [src/types/index.ts:1507](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1507) |
| <a id="specimenmade"></a> `specimenMade` | `boolean` \| `null` | - | [src/types/index.ts:1508](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1508) |
| <a id="saturatedwithco2"></a> `saturatedWithCO2` | `boolean` \| `null` | - | [src/types/index.ts:1509](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1509) |
| <a id="verticallydetermined"></a> `verticallyDetermined` | `boolean` \| `null` | - | [src/types/index.ts:1510](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1510) |
| <a id="currentdownwards"></a> `currentDownwards` | `boolean` \| `null` | - | [src/types/index.ts:1511](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1511) |
| <a id="usedmedium"></a> `usedMedium` | `string` \| `null` | - | [src/types/index.ts:1512](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1512) |
| <a id="waterdegassed"></a> `waterDegassed` | `boolean` \| `null` | - | [src/types/index.ts:1513](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1513) |
| <a id="temperature"></a> `temperature` | `number` \| `null` | - | [src/types/index.ts:1514](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1514) |
| <a id="maximumgradient"></a> `maximumGradient` | `number` \| `null` | - | [src/types/index.ts:1515](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1515) |
| <a id="ringwaterrepellent"></a> `ringWaterRepellent` | `string` \| `null` | Whether the confining ring was water-repellent (raw code) | [src/types/index.ts:1517](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1517) |
| <a id="watercontentafterwards"></a> `waterContentAfterwards` | `number` \| `null` | Water content after the test (%) | [src/types/index.ts:1519](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1519) |
| <a id="materialirregularity"></a> `materialIrregularity` | `string`[] | Material irregularities observed (0-2 codes) | [src/types/index.ts:1521](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1521) |
| <a id="saturatedpermeabilityatspecificdensity"></a> `saturatedPermeabilityAtSpecificDensity` | [`SaturatedPermeabilityAtSpecificDensity`](/docs/bro-xml-parser/reference/api/bhr-gt/saturatedpermeabilityatspecificdensity/)[] | - | [src/types/index.ts:1522](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1522) |
| <a id="saturatedpermeabilityatspecificload"></a> `saturatedPermeabilityAtSpecificLoad` | [`SaturatedPermeabilityAtSpecificLoad`](/docs/bro-xml-parser/reference/api/bhr-gt/saturatedpermeabilityatspecificload/)[] | - | [src/types/index.ts:1523](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1523) |
