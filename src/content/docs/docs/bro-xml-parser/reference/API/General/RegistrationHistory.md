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

Defined in: [src/types/index.ts:178](https://github.com/bedrock-engineer/bro-xml-parser-ts/blob/fbc14a4e08ef5e7ac3188db8d242e7ff04bbd50d/src/types/index.ts#L178)

The BRO registration history, shared by every registration type. The
`brocom:*` history block is identical across schemas, so it is derived from one
of them (BORE\_PRODUCER).
