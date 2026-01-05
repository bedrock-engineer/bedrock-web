/**
 * Type resolver functions for converting XML values to JavaScript types
 */
/**
 * Parse float, handle null values and -999999 sentinel
 */
export function parseFloat(value) {
    if (!value || value.trim() === '' || value === '-999999') {
        return null;
    }
    try {
        const num = Number.parseFloat(value);
        if (isNaN(num)) {
            console.warn(`Failed to parse float value: "${value}"`);
            return null;
        }
        return num;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`Failed to parse float value: "${value}" - ${message}`);
        return null;
    }
}
/**
 * Parse integer
 */
export function parseInt(value) {
    if (!value || value.trim() === '' || value === '-999999') {
        return null;
    }
    try {
        const num = Number.parseInt(value, 10);
        if (isNaN(num)) {
            console.warn(`Failed to parse integer value: "${value}"`);
            return null;
        }
        return num;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`Failed to parse integer value: "${value}" - ${message}`);
        return null;
    }
}
/**
 * Parse boolean (ja/nee or true/false)
 */
export function parseBoolean(value) {
    if (!value) {
        return null;
    }
    const normalized = value.trim().toLowerCase();
    if (normalized === 'ja' || normalized === 'true' || normalized === '1') {
        return true;
    }
    if (normalized === 'nee' || normalized === 'false' || normalized === '0') {
        return false;
    }
    return null;
}
/**
 * Parse ISO date string to Date object
 */
export function parseDate(value) {
    if (!value || value.trim() === '') {
        return null;
    }
    try {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) {
            console.warn(`Failed to parse date value: "${value}"`);
            return null;
        }
        return date;
    }
    catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`Failed to parse date value: "${value}" - ${message}`);
        return null;
    }
}
/**
 * Parse quality class (handles "klasse2" or "2" format)
 */
export function parseQualityClass(value) {
    if (!value) {
        return null;
    }
    // Handle "klasse2" format
    const regex = /klasse(\d+)/i;
    const match = regex.exec(value);
    if (match?.[1]) {
        return Number.parseInt(match[1], 10);
    }
    // Handle plain number
    return parseInt(value);
}
/**
 * Convert text to lowercase
 */
export function lowerText(value) {
    if (!value) {
        return null;
    }
    return value.trim().toLowerCase();
}
//# sourceMappingURL=type-resolvers.js.map