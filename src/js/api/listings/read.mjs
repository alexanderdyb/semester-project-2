import { API_AUCTION_URL } from "../constants.mjs";

const ACTION = "/listings";
const METHOD = "get";

export async function getListings() {
  const getListingsUrl = `${API_AUCTION_URL}${ACTION}`;

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
