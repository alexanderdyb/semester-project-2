import { API_AUCTION_URL } from "../constants.mjs";

const action = "/auth/login";
const method = "post";

/**
 * Logs in a user.
 *
 * @param {Object} profile - The user's profile data.
 * @param {string} profile.username - The user's username.
 * @param {string} profile.password - The user's password.
 * @returns {Promise<Object>} - The response JSON object.
 * @throws {Error} - If the login fails, throwing an error with the status code and message.
 */
export async function login(profile) {
  const loginURL = API_AUCTION_URL + action;

  const response = await fetch(loginURL, {
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
    `Login failed with status: ${statusCode}. Message: ${errorMessage}.`
  );
}
