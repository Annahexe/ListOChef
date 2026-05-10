/**
 * Converts a date into a readable format.
 * Example output: "10 May 2026".
 *
 * @param {Date|string} date - Date value to format.
 * @returns {string} Beautified date string.
 */
export const dateBeautify = (date) => {
  const d = new Date(date);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${month} ${year}`;
};
