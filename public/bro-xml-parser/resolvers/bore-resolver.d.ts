/**
 * Bore data resolver for parsing layer information from BRO/XML
 */
import type { ResolverContext, BoreLayer } from '../types/index.js';
/**
 * Parse bore layer data from descriptiveBoreholeLog
 *
 * The bore XML contains layer information with:
 * - upperBoundary/lowerBoundary: depth in meters
 * - soil: geotechnical soil classification and properties
 */
export declare function processBoreResult(_value: string | null, context: ResolverContext): Array<BoreLayer>;
/**
 * Parse bored interval data from boring element
 *
 * Extracts information about drilling techniques and diameters used at different depths
 */
export declare function processBoredIntervals(_value: string | null, context: ResolverContext): Array<Record<string, unknown>>;
/**
 * Parse sampled interval data from boring element
 *
 * Extracts information about sampling methods, quality, and equipment used
 */
export declare function processSampledIntervals(_value: string | null, context: ResolverContext): Array<Record<string, unknown>>;
//# sourceMappingURL=bore-resolver.d.ts.map