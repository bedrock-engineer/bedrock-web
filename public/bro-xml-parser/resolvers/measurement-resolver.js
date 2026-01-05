/**
 * Measurement data resolver for parsing embedded CSV in CPT XML
 */
import { BROParseError } from '../types/index.js';
/**
 * Parse CPT measurement data from embedded CSV
 *
 * The CPT XML contains measurement data as CSV text embedded in the values element.
 * The structure is:
 * - parameters: defines which columns are included (ja/nee flags)
 * - encoding: defines CSV delimiters
 * - values: actual CSV data with all columns (we select only "ja" columns)
 */
export function processCPTResult(_value, context) {
    const { element, adapter, namespaces } = context;
    const encodingNode = adapter.evaluateXPath(element, './/swe:encoding/swe:TextEncoding', (prefix) => (prefix ? namespaces[prefix] ?? null : null));
    if (!encodingNode) {
        throw new BROParseError('Missing encoding information', {
            code: 'MISSING_ENCODING',
            xpath: './/swe:encoding/swe:TextEncoding'
        });
    }
    // Type guard: ensure we have an Element with getAttribute
    if (!('getAttribute' in encodingNode) || typeof encodingNode.getAttribute !== 'function') {
        throw new BROParseError('Invalid encoding node - not an Element', {
            code: 'INVALID_ENCODING_NODE',
            nodeType: encodingNode.nodeType
        });
    }
    const encodingElement = encodingNode;
    const delimiter = encodingElement.getAttribute('tokenSeparator') ?? ',';
    const blockSeparator = encodingElement.getAttribute('blockSeparator') ?? ';';
    const decimalSeparator = encodingElement.getAttribute('decimalSeparator') ?? '.';
    if (decimalSeparator !== '.') {
        console.warn(`Non-standard decimal separator: ${decimalSeparator} (expected ".")`);
    }
    // Get column definitions from parameters
    const parametersNode = adapter.evaluateXPath(element, './/cptcommon:parameters', (prefix) => (prefix ? namespaces[prefix] ?? null : null));
    if (!parametersNode) {
        throw new BROParseError('Missing parameters definition', {
            code: 'MISSING_PARAMETERS',
            xpath: './/cptcommon:parameters'
        });
    }
    // Extract column names and indices (dynamic detection)
    // Important: CSV contains ALL columns, we only read the ones marked "ja"
    const paramNodes = adapter.evaluateXPathAll(parametersNode, './*', (prefix) => (prefix ? namespaces[prefix] ?? null : null));
    const columns = [];
    const indices = [];
    paramNodes.forEach((node, i) => {
        // Type guard: ensure we have an Element with localName
        if (!('localName' in node) || !('textContent' in node)) {
            return; // Skip non-element nodes
        }
        const element = node;
        const columnName = element.localName;
        const textContent = element.textContent;
        if (!columnName || !textContent) {
            return; // Skip nodes without name or content
        }
        const included = textContent.trim().toLowerCase() === 'ja';
        if (included) {
            columns.push(columnName);
            indices.push(i);
        }
    });
    if (columns.length === 0) {
        throw new BROParseError('No columns marked as included', {
            code: 'NO_COLUMNS',
            xpath: './/cptcommon:parameters'
        });
    }
    // Get CSV data
    const valuesNode = adapter.evaluateXPath(element, './/cptcommon:values', (prefix) => (prefix ? namespaces[prefix] ?? null : null));
    if (!valuesNode) {
        throw new BROParseError('Missing measurement values', {
            code: 'MISSING_VALUES',
            xpath: './/cptcommon:values'
        });
    }
    const csvText = valuesNode.textContent?.trim();
    if (!csvText) {
        return [];
    }
    // Parse CSV rows
    const rows = csvText.split(blockSeparator).filter((r) => r.trim());
    return rows
        .map((row) => {
        const allValues = row.split(delimiter);
        const measurement = {};
        // Extract only the columns that are marked "ja"
        columns.forEach((col, i) => {
            const idx = indices[i];
            if (idx === undefined) {
                return;
            }
            const valueStr = allValues[idx];
            if (!valueStr) {
                return;
            }
            const value = parseFloat(valueStr);
            // -999999 is the BRO null sentinel value
            measurement[col] = (value === -999999 || isNaN(value)) ? null : value;
        });
        return measurement;
    })
        .filter((m) => {
        // Keep rows with at least some valid data
        // (filters out rows that are all nulls)
        return Object.values(m).some(v => v !== null && v !== undefined);
    });
}
//# sourceMappingURL=measurement-resolver.js.map