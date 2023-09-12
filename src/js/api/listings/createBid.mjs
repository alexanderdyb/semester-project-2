import { headers } from "../headers.mjs";
import { API_AUCTION_URL } from "../constants.mjs";

export async function createBid(id, amount) {
  try {
    const response = await fetch(`${API_AUCTION_URL}/listings/${id}/bids`, {
      method: "post",
      body: JSON.stringify({ amount }),
      headers: headers("application/json"),
    });

    if (response.ok) {
      return await response.json();
    }

    let errorData;
    let errorMessage = "An error occurred while trying to create a bid.";

    try {
      errorData = await response.json();
      errorMessage = errorData.errors[0]?.message || errorMessage;
    } catch {}

    const statusCode = response.status;
    throw new Error(`${statusCode}: ${errorMessage}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
