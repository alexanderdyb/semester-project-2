import { navbarHandler } from "./components/navbar.mjs";
import * as listeners from "./handlers/index.mjs";

import { logout } from "./api/auth/logout.mjs";

function initializeNav() {
  const token = localStorage.getItem("token");

  const loggedOutElements = document.querySelectorAll(
    "[data-visible='loggedOut']"
  );
  const loggedInElements = document.querySelectorAll(
    "[data-visible='loggedIn']"
  );

  if (token) {
    loggedOutElements.forEach((el) => el.classList.add("hidden"));
    loggedInElements.forEach((el) => el.classList.remove("hidden"));
  } else {
    loggedOutElements.forEach((el) => el.classList.remove("hidden"));
    loggedInElements.forEach((el) => el.classList.add("hidden"));
  }

  const logoutButton = document.querySelector("[data-visible='loggedIn']");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logout();
      location.reload();
    });
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  initializeNav();
});

navbarHandler();

const path = location.pathname;

switch (path) {
  case "/register/":
    listeners.registerFormListener();
    break;
  case "/login/":
    listeners.loginFormListener();
    break;
}
