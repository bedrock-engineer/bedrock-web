---
title: BRORegistrationObject
prev: false
next: false
editUrl: false
---

# Interface: BRORegistrationObject

Defined in: [src/types/index.ts:192](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L192)

Common `brocom:RegistrationObject` fields shared by every BRO registration
type (CPT, BHR-GT, BHR-G, ...).

Mirrors how the XSDs model these: each registration object extends
`brocom:RegistrationObject` via complexContent. Domain data interfaces extend
this so the shared surface is declared once and stays consistent. The runtime
counterpart is `COMMON_REGISTRATION_FIELDS` in schemas/common-fields.ts.

## Extended by

- [`CPTData`](/docs/bro-xml-parser/reference/api/cpt/cptdata/)
- [`BHRGTData`](/docs/bro-xml-parser/reference/api/bhr-gt/bhrgtdata/)
- [`BHRGData`](/docs/bro-xml-parser/reference/api/bhr-g/bhrgdata/)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="broid"></a> `broId` | `string` \| `null` | - | [src/types/index.ts:194](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L194) |
| <a id="qualityregime"></a> `qualityRegime` | [`QualityRegime`](/docs/bro-xml-parser/reference/api/general/qualityregime/) \| `null` | BRO quality regime - IMBRO: Strict regime (all mandatory fields required) - IMBRO/A: Relaxed regime for historical data (allows missing fields) | [src/types/index.ts:202](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L202) |
| <a id="deliveryaccountableparty"></a> `deliveryAccountableParty` | `string` \| `null` | Party responsible for delivering the data to the BRO (bronhouder, KvK number or name) | [src/types/index.ts:205](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L205) |
| <a id="objectidaccountableparty"></a> `objectIdAccountableParty` | `string` \| `null` | Object identifier assigned by the accountable party (their own reference) | [src/types/index.ts:208](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L208) |
| <a id="deliveryresponsibleparty"></a> `deliveryResponsibleParty` | `string` \| `null` | KvK number of the party responsible for the delivery | [src/types/index.ts:211](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L211) |
| <a id="registrationhistory"></a> `registrationHistory` | [`RegistrationHistory`](/docs/bro-xml-parser/reference/api/general/registrationhistory/) \| `null` | BRO registration history | [src/types/index.ts:214](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/e6595ec0e9918a1b3eb6a4035da013950da8f382/src/types/index.ts#L214) |
