/**
 * Node.js entry point for BRO Parser
 *
 * Uses @xmldom/xmldom for DOM parsing and fontoxpath for XPath evaluation.
 *
 * Usage:
 * ```typescript
 * import { BROParser, XMLAdapter } from 'bro-parser';
 *
 * const parser = new BROParser(new XMLAdapter());
 * const cptData = parser.parseCPT(xmlString);
 * ```
 */
export { BROParser } from "./parser.js";
export { NodeXMLAdapter as XMLAdapter } from "./adapters/node-adapter.js";
export { BROParseError } from "./types/index.js";
export { CPT_SCHEMA } from "./schemas/cpt-schema.js";
export { BORE_SCHEMA } from "./schemas/bore-schema.js";
export { BHRG_SCHEMA } from "./schemas/bhrg-schema.js";
export { BRO_NAMESPACES, KNOWN_BRO_PREFIXES } from "./namespaces.js";
//# sourceMappingURL=node.js.map