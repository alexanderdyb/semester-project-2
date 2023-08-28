import { logout } from "../api/auth/logout.mjs";

export function bindLogoutEvent() {
  const logoutButton = document.querySelector("#logoutBtn");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logout();
      location.reload();
    });
  }
}
