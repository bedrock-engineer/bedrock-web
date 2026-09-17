---
title: SampledInterval
prev: false
next: false
editUrl: false
---

# Interface: SampledInterval

Defined in: [src/types/index.ts:1133](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1133)

Sampled interval - records sampling method and quality at specific depth ranges

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="begindepth"></a> `beginDepth` | `number` | - | [src/types/index.ts:1134](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1134) |
| <a id="enddepth"></a> `endDepth` | `number` | - | [src/types/index.ts:1135](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1135) |
| <a id="pretreatment"></a> `preTreatment` | `string` \| `null` | - | [src/types/index.ts:1136](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1136) |
| <a id="samplingmethod"></a> `samplingMethod` | `string` \| `null` | - | [src/types/index.ts:1137](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1137) |
| <a id="samplingquality"></a> `samplingQuality` | `string` \| `null` | - | [src/types/index.ts:1138](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1138) |
| <a id="orientatedsampled"></a> `orientatedSampled` | `boolean` \| `null` | - | [src/types/index.ts:1139](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1139) |
| <a id="sampler"></a> `sampler?` | [`SamplerDetails`](/docs/bro-xml-parser/reference/api/general/samplerdetails/) | - | [src/types/index.ts:1140](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1140) |
| <a id="corerecovery"></a> `coreRecovery?` | [`CoreRecovery`](/docs/bro-xml-parser/reference/api/general/corerecovery/) | Core recovery measurements (rock coring), when determined | [src/types/index.ts:1142](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L1142) |
