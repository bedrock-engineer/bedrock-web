---
title: BHRGData
prev: false
next: false
editUrl: false
---

# Interface: BHRGData

Defined in: [src/types/index.ts:633](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L633)

Complete BHR-G (Geological Borehole) data (metadata + layers)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="meta"></a> `meta` | [`ParseMeta`](/docs/bro-xml-parser/reference/api/general/parsemeta/) | Metadata about the parsed document (schema version, warnings) | [src/types/index.ts:637](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L637) |
| <a id="broid"></a> `broId` | `string` \| `null` | - | [src/types/index.ts:640](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L640) |
| <a id="alias"></a> `alias?` | `string` | User-defined identifier (not parsed from XML) | [src/types/index.ts:645](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L645) |
| <a id="qualityregime"></a> `qualityRegime` | [`QualityRegime`](/docs/bro-xml-parser/reference/api/general/qualityregime/) \| `null` | BRO quality regime - IMBRO: Strict regime (all mandatory fields required) - IMBRO/A: Relaxed regime for historical data (allows missing fields) | [src/types/index.ts:653](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L653) |
| <a id="researchreportdate"></a> `researchReportDate` | `string` \| `null` | - | [src/types/index.ts:655](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L655) |
| <a id="deliveredlocation"></a> `deliveredLocation` | [`Location`](/docs/bro-xml-parser/reference/api/general/location/) \| `null` | - | [src/types/index.ts:658](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L658) |
| <a id="standardizedlocation"></a> `standardizedLocation` | [`Location`](/docs/bro-xml-parser/reference/api/general/location/) \| `null` | - | [src/types/index.ts:659](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L659) |
| <a id="deliveredverticalpositionoffset"></a> `deliveredVerticalPositionOffset` | `number` \| `null` | - | [src/types/index.ts:662](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L662) |
| <a id="deliveredverticalpositiondatum"></a> `deliveredVerticalPositionDatum` | `string` \| `null` | - | [src/types/index.ts:663](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L663) |
| <a id="deliveredverticalpositionreferencepoint"></a> `deliveredVerticalPositionReferencePoint` | `string` \| `null` | - | [src/types/index.ts:664](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L664) |
| <a id="descriptionprocedure"></a> `descriptionProcedure` | `string` \| `null` | - | [src/types/index.ts:667](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L667) |
| <a id="borerockreached"></a> `boreRockReached` | `boolean` \| `null` | - | [src/types/index.ts:668](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L668) |
| <a id="finalboredepth"></a> `finalBoreDepth` | `number` \| `null` | - | [src/types/index.ts:669](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L669) |
| <a id="finalsampledepth"></a> `finalSampleDepth` | `number` \| `null` | - | [src/types/index.ts:670](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L670) |
| <a id="boreholecompleted"></a> `boreHoleCompleted` | `string` \| `null` | - | [src/types/index.ts:671](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L671) |
| <a id="boringstartdate"></a> `boringStartDate` | `string` \| `null` | Start date of the boring operation | [src/types/index.ts:675](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L675) |
| <a id="boringenddate"></a> `boringEndDate` | `string` \| `null` | End date of the boring operation | [src/types/index.ts:677](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L677) |
| <a id="boringprocedure"></a> `boringProcedure` | `string` \| `null` | Boring procedure standard used | [src/types/index.ts:679](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L679) |
| <a id="boringtechnique"></a> `boringTechnique` | `string` \| `null` | Boring technique used | [src/types/index.ts:681](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L681) |
| <a id="trajectoryexcavated"></a> `trajectoryExcavated` | `boolean` \| `null` | Whether the trajectory was excavated | [src/types/index.ts:683](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L683) |
| <a id="subsurfacecontaminated"></a> `subsurfaceContaminated` | `boolean` \| `null` | Whether the subsurface is contaminated | [src/types/index.ts:685](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L685) |
| <a id="stopcriterion"></a> `stopCriterion` | `string` \| `null` | Stop criterion for boring | [src/types/index.ts:687](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L687) |
| <a id="samplingprocedure"></a> `samplingProcedure` | `string` \| `null` | Sampling procedure standard | [src/types/index.ts:691](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L691) |
| <a id="samplingmethod"></a> `samplingMethod` | `string` \| `null` | Sampling method used | [src/types/index.ts:693](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L693) |
| <a id="samplingquality"></a> `samplingQuality` | `string` \| `null` | Sampling quality assessment | [src/types/index.ts:695](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L695) |
| <a id="descriptionquality"></a> `descriptionQuality` | `string` \| `null` | Description quality assessment | [src/types/index.ts:699](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L699) |
| <a id="describedsamplesquality"></a> `describedSamplesQuality` | `string` \| `null` | Described samples quality | [src/types/index.ts:701](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L701) |
| <a id="descriptionlocation"></a> `descriptionLocation` | `string` \| `null` | Description location (field/lab) | [src/types/index.ts:703](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L703) |
| <a id="descriptionreportdate"></a> `descriptionReportDate` | `string` \| `null` | Date of description report | [src/types/index.ts:705](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L705) |
| <a id="describedmaterial"></a> `describedMaterial` | `string` \| `null` | Described material type | [src/types/index.ts:707](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L707) |
| <a id="continuouslysampled"></a> `continuouslySampled` | `boolean` \| `null` | Whether sampling was continuous | [src/types/index.ts:709](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L709) |
| <a id="samplemoistness"></a> `sampleMoistness` | `string` \| `null` | Sample moistness during description | [src/types/index.ts:711](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L711) |
| <a id="data"></a> `data` | [`BHRGLayer`](/docs/bro-xml-parser/reference/api/bhr-g/bhrglayer/)[] | - | [src/types/index.ts:713](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L713) |
| <a id="boredintervals"></a> `boredIntervals` | [`BoredInterval`](/docs/bro-xml-parser/reference/api/general/boredinterval/)[] | Array of bored intervals with technique and diameter | [src/types/index.ts:717](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L717) |
| <a id="sampledintervals"></a> `sampledIntervals` | [`SampledInterval`](/docs/bro-xml-parser/reference/api/general/sampledinterval/)[] | Array of sampled intervals with method and quality | [src/types/index.ts:719](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L719) |
| <a id="registrationhistory"></a> `registrationHistory` | [`RegistrationHistory`](/docs/bro-xml-parser/reference/api/general/registrationhistory/) \| `null` | BRO registration history | [src/types/index.ts:723](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L723) |
| <a id="reporthistory"></a> `reportHistory` | [`ReportHistory`](/docs/bro-xml-parser/reference/api/general/reporthistory/) \| `null` | Report history with events | [src/types/index.ts:725](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L725) |
| <a id="deliverycontext"></a> `deliveryContext` | `string` \| `null` | Delivery context (e.g., "archiefoverdracht") | [src/types/index.ts:729](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L729) |
| <a id="surveypurpose"></a> `surveyPurpose` | `string` \| `null` | Survey purpose | [src/types/index.ts:731](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L731) |
| <a id="discipline"></a> `discipline` | `string` \| `null` | Discipline (e.g., "geologie") | [src/types/index.ts:733](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L733) |
| <a id="surveyprocedure"></a> `surveyProcedure` | `string` \| `null` | Survey procedure standard | [src/types/index.ts:735](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L735) |
| <a id="nitgcode"></a> `nitgCode` | `string` \| `null` | NITG code (legacy identifier) | [src/types/index.ts:737](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/95ea3eab423b3842a3b463ef5a462652d881db2e/src/types/index.ts#L737) |
