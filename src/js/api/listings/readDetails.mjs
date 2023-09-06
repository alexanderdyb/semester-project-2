import { API_AUCTION_URL } from "../constants.mjs";

export async function getListingDetails(id) {
  const METHOD = "get";
  const ACTION = `/listings/${id}`;
  const getListingsUrl = `${API_AUCTION_URL}${ACTION}`;

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
