/**
 * BRO XML format version detection
 *
 * Validates that XML documents match the expected schema versions
 * supported by this library.
 */
import { BROParseError } from '../types/index.js';
/**
 * Supported schema versions
 */
export const SUPPORTED_VERSIONS = {
    CPT: {
        namespace: 'http://www.broservices.nl/xsd/dscpt/1.1',
        version: '1.1',
        description: 'Dispatch CPT schema version 1.1'
    },
    BORE: {
        namespace: 'http://www.broservices.nl/xsd/dsbhr-gt/2.1',
        version: '2.1',
        description: 'Dispatch Borehole Geotechnical schema version 2.1'
    },
    BHRG: {
        namespace: 'http://www.broservices.nl/xsd/dsbhrg/3.1',
        version: '3.1',
        description: 'Dispatch Borehole Geological schema version 3.1'
    }
};
/**
 * Detect and validate the BRO schema version from XML document
 *
 * @param doc - Parsed XML document
 * @param expectedType - Expected data type (CPT or BORE)
 * @throws {BROParseError} If version is unsupported or doesn't match expected type
 */
export function detectAndValidateVersion(doc, expectedType) {
    const rootElement = doc.documentElement;
    if (!rootElement) {
        throw new BROParseError('Invalid XML: no root element found', {
            code: 'INVALID_XML'
        });
    }
    const defaultNamespace = rootElement.getAttribute('xmlns');
    if (!defaultNamespace) {
        throw new BROParseError('No namespace found in XML document', {
            code: 'MISSING_NAMESPACE',
            hint: 'BRO XML documents must declare a namespace'
        });
    }
    // Check if it matches expected type
    const expectedVersion = SUPPORTED_VERSIONS[expectedType];
    if (defaultNamespace === expectedVersion.namespace) {
        return;
    }
    // Check if it's a different supported type
    for (const [type, version] of Object.entries(SUPPORTED_VERSIONS)) {
        if (type !== expectedType && defaultNamespace === version.namespace) {
            throw new BROParseError(`Wrong document type: expected ${expectedType} but got ${type}`, {
                code: 'WRONG_DOCUMENT_TYPE',
                expected: expectedType,
                actual: type,
                namespace: defaultNamespace,
                hint: `Use parse${type}() instead of parse${expectedType}()`
            });
        }
    }
    // Unknown version - try to extract version info
    const versionMatch = /\/([^/]+)$/.exec(defaultNamespace);
    const detectedVersion = versionMatch ? versionMatch[1] : 'unknown';
    throw new BROParseError(`Unsupported schema version: ${defaultNamespace}`, {
        code: 'UNSUPPORTED_VERSION',
        namespace: defaultNamespace,
        detectedVersion,
        supportedVersions: {
            CPT: SUPPORTED_VERSIONS.CPT.version,
            BORE: SUPPORTED_VERSIONS.BORE.version,
            BHRG: SUPPORTED_VERSIONS.BHRG.version
        },
        hint: `This library supports ${expectedVersion.description}. The provided document uses version ${detectedVersion}.`
    });
}
/**
 * Get version information from document (for informational purposes)
 *
 * @param doc - Parsed XML document
 * @returns Version information or null if not detected
 */
export function getVersionInfo(doc) {
    const rootElement = doc.documentElement;
    const defaultNamespace = rootElement?.getAttribute('xmlns');
    if (!defaultNamespace) {
        return null;
    }
    for (const [type, info] of Object.entries(SUPPORTED_VERSIONS)) {
        if (defaultNamespace === info.namespace) {
            return {
                type: type,
                version: info.version,
                namespace: info.namespace
            };
        }
    }
    return null;
}
//# sourceMappingURL=version-detector.js.map