import { API_AUCTION_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
import { headers } from "../headers.mjs";

export async function updateAvatar(avatar) {
  const profile = storage.load("profile");
  const NAME = profile.name;
  try {
    const response = await fetch(`${API_AUCTION_URL}/profiles/${NAME}/media`, {
      method: "put",
      body: JSON.stringify({ avatar }),
      headers: headers("application/json"),
    });

    if (response.ok) {
      return await response.json();
    }

    let errorData;
    let errorMessage =
      "An error occurred while trying to update avatar. Please try again later.";

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
