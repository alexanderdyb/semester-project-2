/**
 * Formats a timestamp string by extracting the date part.
 *
 * @param {string} timestamp - The timestamp string in ISO format (YYYY-MM-DDTHH:MM:SS.sssZ).
 * @returns {string} - The date part of the timestamp (YYYY-MM-DD).
 */
export function formatDate(timestamp) {
  return timestamp.split("T")[0];
}
