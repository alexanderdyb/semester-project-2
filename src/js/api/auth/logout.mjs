import { remove } from "../../storage/remove.mjs";

/**
 * Logs out a user by removing the token and profile from storage.
 */
export function logout() {
  remove("token");
  remove("profile");
}
