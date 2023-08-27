import { API_AUCTION_URL } from "../constants.mjs";
const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_AUCTION_URL + action;

  const response = await fetch(registerURL, {
    headers: {
      "Content-type": "application/json",
    },
    method,
    body: JSON.stringify(profile),
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error(response.statusText);
}
