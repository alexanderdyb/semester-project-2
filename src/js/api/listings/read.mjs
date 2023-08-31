import { API_AUCTION_URL } from "../constants.mjs";

const ACTION = "/listings";
const METHOD = "get";

export async function getListings(limit = 30, offset = 0) {
  const getListingsUrl = `${API_AUCTION_URL}${ACTION}?limit=${limit}&offset=${offset}`;

  const response = await fetch(getListingsUrl, {
    method: METHOD,
  });

  if (response.ok) {
    return await response.json();
  }

  let errorData;
  let errorMessage = "An error occurred while fetching listings.";

  try {
    errorData = await response.json();
    errorMessage = errorData.errors?.[0]?.message || errorMessage;
  } catch {}

  const statusCode = response.status;
  throw new Error(`${statusCode} ${errorMessage}`);
}
