/**
 * This function filters an array of data based on a query string.
 * If a query is provided, it returns the elements whose titles contain the query string (case-insensitive).
 * If no query is provided, it returns all the elements.
 *
 * @export
 * @param {Object[]} data - The array of data objects to be filtered.
 * @param {string} query - The query string to filter the data objects by.
 * @returns {Object[]} - The filtered array of data objects.
 */
export function searchListings(data, query) {
  return data.filter((element) => {
    if (query) {
      return element.title.toLowerCase().includes(query.toLowerCase());
    }
    return true;
  });
}
