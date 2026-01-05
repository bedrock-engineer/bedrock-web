/**
 * Generic schema-driven XML parser
 *
 * This parser interprets a schema definition (field configurations)
 * and extracts data from XML documents accordingly.
 * The same parser works for any schema (CPT, Bore, etc.)
 */
import type { XMLAdapter, Schema, Namespaces } from "../types/index.js";
export declare class SchemaParser {
    private adapter;
    private namespaces;
    constructor(adapter: XMLAdapter, namespaces: Namespaces);
    /**
     * Parse XML document using provided schema
     *
     * @param doc - Parsed XML document
     * @param schema - Field definitions (field name -> config)
     * @param rootPath - Optional XPath to root element
     * @returns Parsed data object with fields from schema
     */
    parse<T = Record<string, unknown>>(doc: Document, schema: Schema, rootPath?: string): T;
    /**
     * Extract single field using schema config
     *
     * @param element - Root element to search from
     * @param config - Field configuration (xpath, resolver, etc.)
     * @returns Extracted and resolved value
     */
    private extractField;
}
//# sourceMappingURL=schema-parser.d.ts.map