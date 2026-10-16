---
title: RegistrationHistory
prev: false
next: false
editUrl: false
---

# Type Alias: RegistrationHistory

```ts
type RegistrationHistory = NonNullable<Produced<typeof BORE_PRODUCER>["registrationHistory"]>;
```

Defined in: [src/types/index.ts:178](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/3a8a02c54af388d7b2e730fdfd8afe3ee1b801da/src/types/index.ts#L178)

The BRO registration history, shared by every registration type. The
`brocom:*` history block is identical across schemas, so it is derived from one
of them (BORE\_PRODUCER).
