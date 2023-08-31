import { navbarHandler } from "./components/navbar.mjs";
import * as listeners from "./handlers/index.mjs";
import * as ui from "./ui/index.mjs";
import { toggleUI } from "./ui/authUI.mjs";
import { logoutEvent } from "./handlers/index.mjs";

function initializeApp() {
  toggleUI();
  logoutEvent();
}

window.addEventListener("DOMContentLoaded", (event) => {
  initializeApp();
});

navbarHandler();

const path = location.pathname;

switch (path) {
  case "/":
    ui.latestListings();
    break;
  case "/register/":
    listeners.registerFormListener();
    break;
  case "/login/":
    listeners.loginFormListener();
    break;
}
