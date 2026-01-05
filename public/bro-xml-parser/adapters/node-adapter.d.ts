/**
 * Node.js runtime adapter using @xmldom/xmldom and fontoxpath
 *
 * Uses @xmldom/xmldom for XML parsing and fontoxpath for XPath evaluation.
 * These packages are required dependencies for Node.js environments.
 */
import type { XMLAdapter } from '../types/index.js';
export declare class NodeXMLAdapter implements XMLAdapter {
    private parser;
    private fontoxpath;
    constructor();
    parseXML(xmlText: string): Document;
    evaluateXPath(doc: Document | Node, query: string, namespaceResolver: (prefix: string | null) => string | null): Node | null;
    evaluateXPathAll(doc: Document | Node, query: string, namespaceResolver: (prefix: string | null) => string | null): Array<Node>;
}
//# sourceMappingURL=node-adapter.d.ts.map