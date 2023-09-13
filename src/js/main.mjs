import { navbarHandler } from "./components/navbar.mjs";
import * as listeners from "./handlers/index.mjs";
import * as templates from "./ui/templates/index.mjs";
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
  case "/index.html":
  case "/":
    templates.latestListings();
    break;
  case "/register/":
    listeners.registerFormListener();
    break;
  case "/login/":
    listeners.loginFormListener();
    break;
  case "/listing/":
    templates.listingDetails();
    listeners.bid();
    break;
  case "/create-listing/":
    listeners.createListing();
    break;
  case "/account/":
    templates.getProfileData();
    templates.getMyListingsData();
    break;
  case "/update-avatar/":
    listeners.updateAvatarImage();
    break;
}
