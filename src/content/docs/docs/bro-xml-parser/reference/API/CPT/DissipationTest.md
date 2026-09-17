---
title: DissipationTest
prev: false
next: false
editUrl: false
---

# Interface: DissipationTest

Defined in: [src/types/index.ts:177](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L177)

Dissipation test performed at a specific depth

During a CPT, the cone can be paused at a given depth to measure
pore pressure decay over time. A CPT can contain multiple dissipation tests.

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="penetrationlength"></a> `penetrationLength` | `number` | [src/types/index.ts:178](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L178) |
| <a id="phenomenontime"></a> `phenomenonTime` | `string` \| `null` | [src/types/index.ts:179](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L179) |
| <a id="measurements"></a> `measurements` | [`DissipationMeasurement`](/docs/bro-xml-parser/reference/api/cpt/dissipationmeasurement/)[] | [src/types/index.ts:180](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L180) |
