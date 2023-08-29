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

  const errorData = await response.json();
  const errorMessage = errorData.errors[0].message;
  const statusCode = errorData.statusCode;

  throw new Error(
    `Registration failed with status: ${statusCode}. Message: ${errorMessage}. Please try again later.`
  );
}
