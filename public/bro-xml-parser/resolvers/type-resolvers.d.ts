/**
 * Type resolver functions for converting XML values to JavaScript types
 */
/**
 * Parse float, handle null values and -999999 sentinel
 */
export declare function parseFloat(value: string | null): number | null;
/**
 * Parse integer
 */
export declare function parseInt(value: string | null): number | null;
/**
 * Parse boolean (ja/nee or true/false)
 */
export declare function parseBoolean(value: string | null): boolean | null;
/**
 * Parse ISO date string to Date object
 */
export declare function parseDate(value: string | null): Date | null;
/**
 * Parse quality class (handles "klasse2" or "2" format)
 */
export declare function parseQualityClass(value: string | null): number | null;
/**
 * Convert text to lowercase
 */
export declare function lowerText(value: string | null): string | null;
//# sourceMappingURL=type-resolvers.d.ts.map