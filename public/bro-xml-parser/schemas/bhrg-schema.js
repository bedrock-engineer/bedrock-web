/**
 * BHR-G (Geological Borehole) schema definition
 *
 * Defines metadata fields for BHR-G data following BRO structure.
 * Each field specifies:
 * - xpath: location in XML document
 * - resolver: function to convert/parse value (optional)
 * - attribute: which property to extract (optional, defaults to textContent)
 * - required: whether field is mandatory (optional, defaults to false)
 */
import * as typeResolvers from '../resolvers/type-resolvers.js';
import * as gmlResolvers from '../resolvers/gml-resolvers.js';
import * as bhrgResolvers from '../resolvers/bhrg-resolvers.js';
export const BHRG_SCHEMA = {
    // === Core Identification ===
    bro_id: {
        xpath: 'brocom:broId'
    },
    quality_regime: {
        xpath: 'brocom:qualityRegime'
    },
    // === Dates ===
    research_report_date: {
        xpath: './dsbhrg:researchReportDate/brocom:date',
        resolver: typeResolvers.parseDate
    },
    // === Location ===
    delivered_location: {
        xpath: './dsbhrg:deliveredLocation/bhrgcom:location',
        resolver: gmlResolvers.parseGMLLocation
    },
    standardized_location: {
        xpath: './dsbhrg:standardizedLocation/brocom:location',
        resolver: gmlResolvers.parseGMLLocation
    },
    // === Vertical Position ===
    delivered_vertical_position_offset: {
        xpath: './dsbhrg:deliveredVerticalPosition/bhrgcom:offset',
        resolver: typeResolvers.parseFloat,
    },
    delivered_vertical_position_datum: {
        xpath: './dsbhrg:deliveredVerticalPosition/bhrgcom:verticalDatum',
        resolver: typeResolvers.lowerText,
    },
    delivered_vertical_position_reference_point: {
        xpath: './dsbhrg:deliveredVerticalPosition/bhrgcom:localVerticalReferencePoint',
        resolver: typeResolvers.lowerText,
    },
    // === Boring Metadata ===
    description_procedure: {
        xpath: './dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptionProcedure',
    },
    bore_rock_reached: {
        xpath: './dsbhrg:boring/bhrgcom:Boring/bhrgcom:rockReached',
        resolver: typeResolvers.parseBoolean,
    },
    final_bore_depth: {
        xpath: './dsbhrg:boring/bhrgcom:Boring/bhrgcom:finalDepthBoring',
        resolver: typeResolvers.parseFloat,
    },
    final_sample_depth: {
        xpath: './dsbhrg:boring/bhrgcom:Boring/bhrgcom:finalDepthSampling',
        resolver: typeResolvers.parseFloat,
    },
    bore_hole_completed: {
        xpath: './dsbhrg:boring/bhrgcom:Boring/bhrgcom:boreholeCompleted',
    },
    // === Layer Data ===
    data: {
        xpath: './dsbhrg:boreholeSampleDescription/bhrgcom:BoreholeSampleDescription/bhrgcom:descriptiveBoreholeLog/bhrgcom:DescriptiveBoreholeLog',
        resolver: bhrgResolvers.processBHRGLayerData
    }
};
//# sourceMappingURL=bhrg-schema.js.map