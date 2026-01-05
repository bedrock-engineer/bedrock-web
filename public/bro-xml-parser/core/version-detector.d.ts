/**
 * BRO XML format version detection
 *
 * Validates that XML documents match the expected schema versions
 * supported by this library.
 */
/**
 * Supported schema versions
 */
export declare const SUPPORTED_VERSIONS: {
    readonly CPT: {
        readonly namespace: "http://www.broservices.nl/xsd/dscpt/1.1";
        readonly version: "1.1";
        readonly description: "Dispatch CPT schema version 1.1";
    };
    readonly BORE: {
        readonly namespace: "http://www.broservices.nl/xsd/dsbhr-gt/2.1";
        readonly version: "2.1";
        readonly description: "Dispatch Borehole Geotechnical schema version 2.1";
    };
    readonly BHRG: {
        readonly namespace: "http://www.broservices.nl/xsd/dsbhrg/3.1";
        readonly version: "3.1";
        readonly description: "Dispatch Borehole Geological schema version 3.1";
    };
};
export type DataType = 'CPT' | 'BORE' | 'BHRG';
/**
 * Detect and validate the BRO schema version from XML document
 *
 * @param doc - Parsed XML document
 * @param expectedType - Expected data type (CPT or BORE)
 * @throws {BROParseError} If version is unsupported or doesn't match expected type
 */
export declare function detectAndValidateVersion(doc: Document, expectedType: DataType): void;
/**
 * Get version information from document (for informational purposes)
 *
 * @param doc - Parsed XML document
 * @returns Version information or null if not detected
 */
export declare function getVersionInfo(doc: Document): {
    type: DataType;
    version: string;
    namespace: string;
} | null;
//# sourceMappingURL=version-detector.d.ts.map