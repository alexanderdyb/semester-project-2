import { API_AUCTION_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { headers } from "../headers.mjs";

/**
 * Retrieves the listings created by the logged-in user.
 *
 * @returns {Promise<Object[]>} - The response JSON object containing an array of listing data.
 * @throws {Error} - Throws an error with the status code and a message if the retrieval fails.
 */
export async function getMyListings() {
  const profile = storage.load("profile");
  const NAME = profile.name;
  try {
    const response = await fetch(
      `${API_AUCTION_URL}/profiles/${NAME}/listings`,
      {
        method: "get",
        headers: headers("application/json"),
      }
    );

    if (response.ok) {
      return await response.json();
    }

    let errorData;
    let errorMessage =
      "An error occurred while trying to get data from profile. Please try again later.";

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
