/**
 * BRO Parser - Main parser class
 *
 * Uses dependency injection to work with any XMLAdapter implementation.
 * The adapter is provided at construction time, making testing and
 * environment-specific behavior explicit.
 */
import { SchemaParser } from './core/schema-parser.js';
import { detectAndValidateVersion } from './core/version-detector.js';
import { CPT_SCHEMA } from './schemas/cpt-schema.js';
import { BORE_SCHEMA } from './schemas/bore-schema.js';
import { BHRG_SCHEMA } from './schemas/bhrg-schema.js';
import { BRO_NAMESPACES } from './namespaces.js';
/**
 * Main BRO Parser class
 *
 * Usage:
 * ```typescript
 * import { BROParser, XMLAdapter } from 'bro-parser';
 *
 * const parser = new BROParser(new XMLAdapter());
 * const cptData = parser.parseCPT(xmlString);
 * ```
 */
export class BROParser {
    /**
     * Create a BRO parser instance
     *
     * @param adapter - XML adapter for the target environment (browser/Node.js)
     * @param namespaces - Optional namespace overrides (defaults to BRO_NAMESPACES)
     */
    constructor(adapter, namespaces) {
        this.adapter = adapter;
        this.parser = new SchemaParser(adapter, namespaces ?? BRO_NAMESPACES);
    }
    /**
     * Parse CPT data from BRO/XML string
     *
     * Extracts all 41 metadata fields and measurement data following
     * the IMBRO CPT schema (dscpt/1.1).
     *
     * @param xmlText - BRO/XML document as string
     * @returns Parsed CPT data with metadata and measurements
     * @throws {BROParseError} If parsing fails or required fields are missing
     *
     * @example
     * ```typescript
     * const parser = new BROParser(new XMLAdapter());
     * const cptData = parser.parseCPT(xmlString);
     *
     * console.log(cptData.bro_id);              // "CPT000000155283"
     * console.log(cptData.final_depth);          // 10.5
     * console.log(cptData.data.length);          // 525 measurements
     * console.log(cptData.data[0].coneResistance); // 1.234
     * ```
     */
    parseCPT(xmlText) {
        const doc = this.adapter.parseXML(xmlText);
        detectAndValidateVersion(doc, 'CPT');
        return this.parser.parse(doc, CPT_SCHEMA, 'dispatchDocument');
    }
    /**
     * Parse Bore (borehole) data from BRO/XML string
     *
     * Extracts metadata and layer information following
     * the IMBRO Bore schema (dsbhr-gt/2.1).
     *
     * @param xmlText - BRO/XML document as string
     * @returns Parsed Bore data with metadata and soil layers
     * @throws {BROParseError} If parsing fails or required fields are missing
     *
     * @example
     * ```typescript
     * const parser = new BROParser(new XMLAdapter());
     * const boreData = parser.parseBore(xmlString);
     *
     * console.log(boreData.bro_id);              // "BHR000000123456"
     * console.log(boreData.final_bore_depth);    // 5.5
     * console.log(boreData.data.length);         // 8 layers
     * console.log(boreData.data[0].geotechnicalSoilName); // "zand"
     * ```
     */
    parseBore(xmlText) {
        const doc = this.adapter.parseXML(xmlText);
        detectAndValidateVersion(doc, 'BORE');
        return this.parser.parse(doc, BORE_SCHEMA, 'dispatchDocument');
    }
    /**
     * Parse BHR-G (Geological Borehole) data from BRO/XML string
     *
     * Extracts metadata and layer information following
     * the IMBRO BHR-G schema (dsbhrg/3.1).
     *
     * @param xmlText - BRO/XML document as string
     * @returns Parsed BHR-G data with metadata and soil layers
     * @throws {BROParseError} If parsing fails or required fields are missing
     *
     * @example
     * ```typescript
     * const parser = new BROParser(new XMLAdapter());
     * const bhrgData = parser.parseBHRG(xmlString);
     *
     * console.log(bhrgData.bro_id);              // "BHR000000123456"
     * console.log(bhrgData.final_bore_depth);    // 3.0
     * console.log(bhrgData.data.length);         // 5 layers
     * console.log(bhrgData.data[0].soilNameNEN5104); // "zwakZandigeKlei"
     * ```
     */
    parseBHRG(xmlText) {
        const doc = this.adapter.parseXML(xmlText);
        detectAndValidateVersion(doc, 'BHRG');
        return this.parser.parse(doc, BHRG_SCHEMA, 'dispatchDocument');
    }
    /**
     * Get the underlying XML adapter
     * (useful for advanced use cases or testing)
     */
    getAdapter() {
        return this.adapter;
    }
}
//# sourceMappingURL=parser.js.map