/**
 * Browser entry point for BRO Parser
 *
 * Uses native browser DOMParser and XPath APIs (zero dependencies).
 *
 * Usage:
 * ```typescript
 * import { BROParser, XMLAdapter } from 'bro-parser';
 *
 * const parser = new BROParser(new XMLAdapter());
 * const cptData = parser.parseCPT(xmlString);
 * ```
 */
export { BROParser } from './parser.js';
export { BrowserXMLAdapter as XMLAdapter } from './adapters/browser-adapter.js';
export type { CPTData, CPTMeasurement, BoreData, BoreLayer, BHRGData, BHRGLayer, Location, Schema, SchemaField, ResolverFunction, ResolverContext, Namespaces, } from './types/index.js';
export { BROParseError } from './types/index.js';
export { CPT_SCHEMA } from './schemas/cpt-schema.js';
export { BORE_SCHEMA } from './schemas/bore-schema.js';
export { BHRG_SCHEMA } from './schemas/bhrg-schema.js';
export { BRO_NAMESPACES, KNOWN_BRO_PREFIXES } from './namespaces.js';
//# sourceMappingURL=browser.d.ts.map