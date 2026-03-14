export const isRequired = (value) => {
  return value.trim() ? "" : "This field is required";
};

export const isEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value) ? "" : "Please enter a valid email";
};

export const minLength = (value, length) => {
  return value.length >= length ? "" : `Must be at least ${length} characters`;
};

export const matches = (value, otherValue, fieldName = "values") =>
  value === otherValue ? "" : `These ${fieldName} do not match`;

export const isRequiredArray = (values) => {
  if (!Array.isArray(values) || values.length === 0) {
    return "This field is required";
  }

  const hasEmptyItem = values.some((value) => !value || !value.trim());

  return hasEmptyItem ? "This field is required" : "";
};