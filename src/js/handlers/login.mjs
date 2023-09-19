import { login } from "../api/auth/login.mjs";
import * as storage from "../storage/index.mjs";
import { displayError } from "./userFeedback/error.mjs";

/**
 * This function sets up an event listener on the login form.
 * When the form is submitted, it attempts to log the user in by calling the `login` API function with the form data.
 * If the login is successful, it stores the access token and user profile data in storage, and redirects the user to the home page.
 * If there is an error, it displays an error message on the form.
 *
 * @export
 */
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
