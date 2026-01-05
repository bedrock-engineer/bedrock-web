/**
 * GML (Geography Markup Language) resolver functions
 */
import type { ResolverContext, Location } from '../types/index.js';
/**
 * Parse GML Point location with coordinates and EPSG code
 *
 * Handles location elements like:
 * <location srsName="urn:ogc:def:crs:EPSG::28992">
 *   <gml:Point>
 *     <gml:pos>155000.0 463000.0</gml:pos>
 *   </gml:Point>
 * </location>
 */
export declare function parseGMLLocation(_value: string | null, context: ResolverContext): Location | null;
//# sourceMappingURL=gml-resolvers.d.ts.map