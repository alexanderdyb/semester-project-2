import { API_AUCTION_URL } from "../constants.mjs";

/**
 * Retrieves detailed information of a specific listing by its ID, including bids on the listing.
 *
 * @param {string} id - The ID of the listing to retrieve details for.
 * @returns {Promise<Object>} - The response JSON object containing detailed data of the listing.
 * @throws {Error} - Throws an error with the status code and a message if the retrieval fails.
 */
export async function getListingDetails(id) {
  const METHOD = "get";
  const ACTION = `/listings/${id}`;
  const getListingsUrl = `${API_AUCTION_URL}${ACTION}?_bids=true`;

  const response = await fetch(getListingsUrl, {
    method: METHOD,
  });

  if (response.ok) {
    return await response.json();
  }

  let errorData;
  let errorMessage = "An error occurred while trying to get data for listing.";

  try {
    errorData = await response.json();
    errorMessage = errorMessage;
  } catch {}

  const statusCode = response.status;
  throw new Error(`${statusCode} ${errorMessage}`);
}
