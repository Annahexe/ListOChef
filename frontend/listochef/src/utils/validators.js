/**
 * Validates that a text value is not empty.
 *
 * @param {string} value - Value to validate.
 * @returns {string} Empty string if valid, error message otherwise.
 */
export const isRequired = (value) => {
  return value.trim() ? "" : "This field is required";
};

/**
 * Validates that a value has a valid email format.
 *
 * @param {string} value - Email value to validate.
 * @returns {string} Empty string if valid, error message otherwise.
 */
export const isEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Please enter a valid email";
};

/**
 * Validates that a value has at least the required length.
 *
 * @param {string} value - Value to validate.
 * @param {number} length - Minimum required length.
 * @returns {string} Empty string if valid, error message otherwise.
 */
export const minLength = (value, length) => {
  return value.length >= length ? "" : `Must be at least ${length} characters`;
};

/**
 * Validates that two values match.
 *
 * @param {string} value - First value to compare.
 * @param {string} otherValue - Second value to compare.
 * @param {string} fieldName - Name used in the error message.
 * @returns {string} Empty string if both values match, error message otherwise.
 */
export const matches = (value, otherValue, fieldName = "values") => (value === otherValue ? "" : `These ${fieldName} do not match`);

/**
 * Validates that an array exists, contains at least one value,
 * and does not include empty strings.
 *
 * @param {Array} values - Array of values to validate.
 * @returns {string} Empty string if valid, error message otherwise.
 */
export const isRequiredArray = (values) => {
  if (!Array.isArray(values) || values.length === 0) {
    return "This field is required";
  }

  const hasEmptyItem = values.some((value) => !value || !value.trim());

  return hasEmptyItem ? "This field is required" : "";
};

/**
 * Validates that a value is a number greater than 0.
 *
 * @param {string|number} value - Value to validate.
 * @returns {string} Empty string if valid, error message otherwise.
 */
export const isPositiveNumber = (value) => {
  const number = Number(value);
  return !isNaN(number) && number > 0 ? "" : "Must be greater than 0";
};

/**
 * Validates that a value is a whole number greater than 0.
 *
 * @param {string|number} value - Value to validate.
 * @returns {string} Empty string if valid, error message otherwise.
 */
export const isPositiveInteger = (value) => {
  const number = Number(value);
  return Number.isInteger(number) && number > 0 ? "" : "Must be a whole number greater than 0";
};

/**
 * Validates that a value can be converted into a valid date.
 *
 * @param {Date|string} value - Date value to validate.
 * @returns {string} Empty string if valid, error message otherwise.
 */
export const isValidDate = (value) => {
  const date = new Date(value);
  return !isNaN(date.getTime()) ? "" : "Please enter a valid date";
};