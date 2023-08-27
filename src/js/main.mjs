import { navbarHandler } from "./components/navbar.mjs";
import * as listeners from "./handlers/index.mjs";

navbarHandler();

const path = location.pathname;

switch (path) {
  case "/register/":
    listeners.registerFormListener();
    break;
}
