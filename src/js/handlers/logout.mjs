import { logout } from "../api/auth/logout.mjs";

/**
 * This function sets up an event listener on the logout button.
 * When the button is clicked, it calls the `logout` API function to log the user out
 * and then reloads the page to reflect the change in authentication status.
 *
 * @export
 */
export function logoutEvent() {
  const logoutButton = document.querySelector("#logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logout();
      location.reload();
    });
  }
}
