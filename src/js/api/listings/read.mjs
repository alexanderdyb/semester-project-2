import { API_AUCTION_URL } from "../constants.mjs";

const ACTION = "/listings";
const METHOD = "get";

/**
 * Retrieves a list of auction listings with pagination.
 *
 * @param {number} [limit=10] - The maximum number of listings to retrieve (default is 10).
 * @param {number} [offset=0] - The offset to start retrieving listings from (default is 0).
 * @returns {Promise<Object>} - The response JSON object containing the listings data.
 * @throws {Error} - Throws an error with the status code and a message if the retrieval fails.
 */
export async function getListings(limit = 10, offset = 0) {
  const getListingsUrl = `${API_AUCTION_URL}${ACTION}?limit=${limit}&offset=${offset}`;

  const response = await fetch(getListingsUrl, {
    method: METHOD,
  });

  if (response.ok) {
    return await response.json();
  }

  let errorData;
  let errorMessage = "An error occurred while trying to get data for listings.";

  try {
    errorData = await response.json();
    errorMessage = errorMessage;
  } catch {}

  const statusCode = response.status;
  throw new Error(`${statusCode} ${errorMessage}`);
}
