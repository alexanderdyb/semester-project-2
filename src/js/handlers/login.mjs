import { login } from "../api/auth/login.mjs";
import * as storage from "../storage/index.mjs";
import { displayError } from "./error.mjs";

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

        const customLoginError =
          "Login failed. Please check your credentials and try again.";
        displayError(error, errorMessage, customLoginError);

        console.error("Login error:", error);
      }
    });
  }
}
