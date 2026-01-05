/**
 * BHR-GT (Geotechnical Borehole) schema definition
 *
 * Defines metadata fields for BHR-GT data following BRO structure.
 * Each field specifies:
 * - xpath: location in XML document
 * - resolver: function to convert/parse value (optional)
 * - attribute: which property to extract (optional, defaults to textContent)
 * - required: whether field is mandatory (optional, defaults to false)
 */
import * as typeResolvers from '../resolvers/type-resolvers.js';
import * as gmlResolvers from '../resolvers/gml-resolvers.js';
import * as boreResolvers from '../resolvers/bore-resolvers.js';
export const BORE_SCHEMA = {
    // === Core Identification ===
    bro_id: {
        xpath: 'brocom:broId'
    },
    quality_regime: {
        xpath: 'brocom:qualityRegime'
    },
    // === Dates ===
    research_report_date: {
        xpath: './dsbhrgt:reportHistory/dsbhrgt:reportStartDate/brocom:date',
        resolver: typeResolvers.parseDate
    },
    // === Location ===
    delivered_location: {
        xpath: './dsbhrgt:deliveredLocation/bhrgtcom:location',
        resolver: gmlResolvers.parseGMLLocation
    },
    standardized_location: {
        xpath: './dsbhrgt:standardizedLocation/brocom:location',
        resolver: gmlResolvers.parseGMLLocation
    },
    // === Vertical Position ===
    delivered_vertical_position_offset: {
        xpath: './dsbhrgt:deliveredVerticalPosition/bhrgtcom:offset',
        resolver: typeResolvers.parseFloat,
    },
    delivered_vertical_position_datum: {
        xpath: './dsbhrgt:deliveredVerticalPosition/bhrgtcom:verticalDatum',
        resolver: typeResolvers.lowerText,
    },
    delivered_vertical_position_reference_point: {
        xpath: './dsbhrgt:deliveredVerticalPosition/bhrgtcom:localVerticalReferencePoint',
        resolver: typeResolvers.lowerText,
    },
    // === Boring Metadata ===
    description_procedure: {
        xpath: './dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptionProcedure',
    },
    groundwater_level: {
        xpath: './dsbhrgt:boring/bhrgtcom:groundwaterLevel',
        resolver: typeResolvers.parseFloat,
    },
    bore_rock_reached: {
        xpath: './dsbhrgt:boring/bhrgtcom:rockReached',
        resolver: typeResolvers.parseBoolean,
    },
    final_bore_depth: {
        xpath: './dsbhrgt:boring/bhrgtcom:finalDepthBoring',
        resolver: typeResolvers.parseFloat,
    },
    final_sample_depth: {
        xpath: './dsbhrgt:boring/bhrgtcom:finalDepthSampling',
        resolver: typeResolvers.parseFloat,
    },
    bore_hole_completed: {
        xpath: './dsbhrgt:boring/bhrgtcom:boreholeCompleted',
        resolver: typeResolvers.parseBoolean,
    },
    // === Layer Data ===
    data: {
        xpath: './dsbhrgt:boreholeSampleDescription/bhrgtcom:descriptiveBoreholeLog',
        resolver: boreResolvers.processBoreLayerData
    },
    // === Laboratory Analysis (BHR-GT-BMA) ===
    analysis: {
        xpath: '.', // Use current context (BHR_GT_O element) - resolver will find boreholeSampleAnalysis
        resolver: boreResolvers.processBoreholeSampleAnalysis
    }
};
//# sourceMappingURL=bore-schema.js.map