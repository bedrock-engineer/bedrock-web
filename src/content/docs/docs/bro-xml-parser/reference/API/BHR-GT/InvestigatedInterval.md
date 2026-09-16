---
title: InvestigatedInterval
prev: false
next: false
editUrl: false
---

# Interface: InvestigatedInterval

Defined in: [src/types/index.ts:1291](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1291)

Investigated interval with laboratory determinations
Each interval represents a depth range with analysis results

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="begindepth"></a> `beginDepth` | `number` | [src/types/index.ts:1293](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1293) |
| <a id="enddepth"></a> `endDepth` | `number` | [src/types/index.ts:1294](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1294) |
| <a id="samplequality"></a> `sampleQuality` | `string` \| `null` | [src/types/index.ts:1297](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1297) |
| <a id="analysistype"></a> `analysisType` | `string` \| `null` | [src/types/index.ts:1298](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1298) |
| <a id="watercontentdetermined"></a> `waterContentDetermined` | `boolean` \| `null` | [src/types/index.ts:1301](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1301) |
| <a id="organicmattercontentdetermined"></a> `organicMatterContentDetermined` | `boolean` \| `null` | [src/types/index.ts:1302](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1302) |
| <a id="carbonatecontentdetermined"></a> `carbonateContentDetermined` | `boolean` \| `null` | [src/types/index.ts:1303](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1303) |
| <a id="volumetricmassdensitydetermined"></a> `volumetricMassDensityDetermined` | `boolean` \| `null` | [src/types/index.ts:1304](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1304) |
| <a id="volumetricmassdensitysolidsdetermined"></a> `volumetricMassDensitySolidsDetermined` | `boolean` \| `null` | [src/types/index.ts:1305](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1305) |
| <a id="described"></a> `described` | `boolean` \| `null` | [src/types/index.ts:1306](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1306) |
| <a id="watercontentdetermination"></a> `waterContentDetermination?` | [`WaterContentDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/watercontentdetermination/) | [src/types/index.ts:1309](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1309) |
| <a id="organicmattercontentdetermination"></a> `organicMatterContentDetermination?` | [`OrganicMatterContentDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/organicmattercontentdetermination/) | [src/types/index.ts:1310](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1310) |
| <a id="carbonatecontentdetermination"></a> `carbonateContentDetermination?` | [`CarbonateContentDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/carbonatecontentdetermination/) | [src/types/index.ts:1311](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1311) |
| <a id="volumetricmassdensitydetermination"></a> `volumetricMassDensityDetermination?` | [`VolumetricMassDensityDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/volumetricmassdensitydetermination/) | [src/types/index.ts:1312](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1312) |
| <a id="volumetricmassdensityofsolidsdetermination"></a> `volumetricMassDensityOfSolidsDetermination?` | [`VolumetricMassDensityOfSolidsDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/volumetricmassdensityofsolidsdetermination/) | [src/types/index.ts:1313](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1313) |
| <a id="particlesizedistributiondetermination"></a> `particleSizeDistributionDetermination?` | [`ParticleSizeDistributionDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/particlesizedistributiondetermination/) | [src/types/index.ts:1314](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1314) |
| <a id="consistencylimitsdetermination"></a> `consistencyLimitsDetermination?` | [`ConsistencyLimitsDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/consistencylimitsdetermination/) | [src/types/index.ts:1315](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1315) |
| <a id="settlementcharacteristicsdetermination"></a> `settlementCharacteristicsDetermination?` | [`SettlementCharacteristicsDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/settlementcharacteristicsdetermination/) | [src/types/index.ts:1316](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1316) |
| <a id="saturatedpermeabilitydetermination"></a> `saturatedPermeabilityDetermination?` | [`SaturatedPermeabilityDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/saturatedpermeabilitydetermination/) | [src/types/index.ts:1317](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1317) |
| <a id="shearstresschangeduringloadingdetermination"></a> `shearStressChangeDuringLoadingDetermination?` | [`ShearStressChangeDuringLoadingDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/shearstresschangeduringloadingdetermination/)[] | [src/types/index.ts:1318](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1318) |
| <a id="maximumundrainedshearstrengthdetermination"></a> `maximumUndrainedShearStrengthDetermination?` | [`MaximumUndrainedShearStrengthDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/maximumundrainedshearstrengthdetermination/) | [src/types/index.ts:1320](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1320) |
| <a id="shearstresschangeduringhorizontaldeformationdetermination"></a> `shearStressChangeDuringHorizontalDeformationDetermination?` | [`ShearStressChangeDuringHorizontalDeformationDetermination`](/docs/bro-xml-parser/reference/api/bhr-gt/shearstresschangeduringhorizontaldeformationdetermination/)[] | [src/types/index.ts:1321](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L1321) |
