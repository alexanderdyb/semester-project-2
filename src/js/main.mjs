import { navbarHandler } from "./components/navbar.mjs";
import * as listeners from "./handlers/index.mjs";
import { toggleUI } from "./ui/authUI.mjs";
import { bindLogoutEvent } from "./handlers/logout.mjs";

function initializeApp() {
  toggleUI();
  bindLogoutEvent();
}

window.addEventListener("DOMContentLoaded", (event) => {
  initializeApp();
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
