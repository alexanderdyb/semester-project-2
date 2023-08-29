import { login } from "../api/auth/login.mjs";
import * as storage from "../storage/index.mjs";
import { displayError } from "./userFeedback/error.mjs";

export function loginFormListener() {
  const form = document.querySelector("#loginForm");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      try {
        const { accessToken, ...user } = await login(profile);

        storage.save("token", accessToken);
        storage.save("profile", user);

        window.location.href = "/";
      } catch (error) {
        const errorMessage = document.querySelector("#loginErrorMessage");
        errorMessage.classList.remove("hidden");

        const customLoginError = error;
        displayError(error, errorMessage, customLoginError);

        console.log("Login error:", error);
      }
    });
  }
}
