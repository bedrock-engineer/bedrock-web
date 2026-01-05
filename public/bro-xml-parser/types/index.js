/**
 * Type definitions for BRO/XML parser
 */
/**
 * Parse error with context
 */
export class BROParseError extends Error {
    constructor(message, details) {
        super(message);
        this.name = 'BROParseError';
        this.code = details.code;
        this.details = details;
    }
}
//# sourceMappingURL=index.js.map