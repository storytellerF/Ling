export namespace LING {
    export { parse };
    export { stringify };
}
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 * @param {string} raw A valid JSON string.
 * @returns {object} object
 */
declare function parse(raw: string): object;
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 * @param {string} value A JavaScript value, usually an object or array, to be converted.
 * @param {function} replacer A function that transforms the results.
 * @param {string|number} space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
 */
declare function stringify(value: string, replacer: Function, space: string | number): string;
export {};
