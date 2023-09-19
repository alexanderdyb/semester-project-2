import { headers } from "../headers.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

/**
 * Posts a new listing to the auction site.
 *
 * @param {string} title - The title of the listing.
 * @param {string} description - The description of the listing.
 * @param {string[]} tags - An array of tags associated with the listing.
 * @param {Object[]} media - An array of media objects associated with the listing.
 * @param {string} endsAt - The ending time of the listing.
 * @returns {Promise<Object>} - The response JSON object on successful listing creation.
 * @throws {Error} - Throws an error with the status code and message if the listing creation fails.
 */
export async function postListing(title, description, tags, media, endsAt) {
  try {
    const response = await fetch(`${API_AUCTION_URL}/listings`, {
      method: "post",
      body: JSON.stringify({ title, description, tags, media, endsAt }),
      headers: headers("application/json"),
    });

    if (response.ok) {
      return await response.json();
    }

    let errorData;
    let errorMessage =
      "An error occurred while trying to create a listing. Please try again later.";

    try {
      errorData = await response.json();
      errorMessage = `${errorData.errors[0]?.message}. ${errorMessage}`;
    } catch {}

    const statusCode = response.status;
    throw new Error(`${statusCode}: ${errorMessage}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
