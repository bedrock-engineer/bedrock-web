/**
 * Node.js runtime adapter using @xmldom/xmldom and fontoxpath
 *
 * Uses @xmldom/xmldom for XML parsing and fontoxpath for XPath evaluation.
 * These packages are required dependencies for Node.js environments.
 */
import { DOMParser } from '@xmldom/xmldom';
import fontoxpath from 'fontoxpath';
export class NodeXMLAdapter {
    constructor() {
        this.parser = new DOMParser({
            errorHandler: {
                warning: () => {
                    // Ignore warnings
                },
                error: (msg) => {
                    throw new Error(`XML parsing failed: ${msg}`);
                },
                fatalError: (msg) => {
                    throw new Error(`XML parsing failed: ${msg}`);
                }
            }
        });
        this.fontoxpath = fontoxpath;
    }
    parseXML(xmlText) {
        return this.parser.parseFromString(xmlText, 'text/xml');
    }
    evaluateXPath(doc, query, namespaceResolver) {
        try {
            // fontoxpath accepts the namespace resolver directly (like browsers)
            return this.fontoxpath.evaluateXPathToFirstNode(query, doc, null, {}, { namespaceResolver });
        }
        catch (error) {
            // Distinguish between "not found" (returns null) and actual errors (throw)
            const message = error instanceof Error ? error.message : String(error);
            // If it's an XPath syntax error or library error, throw with details
            if (message.includes('XPST') || message.includes('syntax') || message.includes('parse')) {
                throw new Error(`XPath evaluation failed: ${message} (query: ${query})`);
            }
            // For other errors, log and return null (element might just not exist)
            console.warn(`XPath query returned no results: ${query}`, message);
            return null;
        }
    }
    evaluateXPathAll(doc, query, namespaceResolver) {
        try {
            return this.fontoxpath.evaluateXPathToNodes(query, doc, null, {}, { namespaceResolver });
        }
        catch (error) {
            // Distinguish between "not found" (returns empty array) and actual errors (throw)
            const message = error instanceof Error ? error.message : String(error);
            // If it's an XPath syntax error or library error, throw with details
            if (message.includes('XPST') || message.includes('syntax') || message.includes('parse')) {
                throw new Error(`XPath evaluation failed: ${message} (query: ${query})`);
            }
            // For other errors, log and return empty array (elements might just not exist)
            console.warn(`XPath query returned no results: ${query}`, message);
            return [];
        }
    }
}
//# sourceMappingURL=node-adapter.js.map