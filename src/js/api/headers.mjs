import * as storage from "../storage/index.mjs";

/**
 * Generates headers for HTTP requests, including content type and authorization token (if available).
 *
 * @param {string} contentType - The content type for the HTTP request. Optional parameter.
 * @returns {Object} - The generated headers object.
 */
export const headers = (contentType) => {
  const token = storage.load("token");
  const headers = {};

  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};
