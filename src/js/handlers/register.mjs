import { register } from "../api/index.mjs";
import { displayError } from "./userFeedback/error.mjs";
import { displaySuccess } from "./userFeedback/success.mjs";

export function registerFormListener() {
  const form = document.querySelector("#registerForm");
  const errorMessageElement = document.querySelector(".errorMessage");
  const successMessageContainer = document.querySelector(".successMessage");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const profile = Object.fromEntries(formData.entries());

      try {
        await register(profile);
        errorMessageElement.innerHTML = "";
        form.reset();
        errorMessageElement.classList.add("hidden");
        const successMessage = `<p class="font-bold mb-8">Success! You're registered and can now log in.</p>
        <a href="/login/" class="btn">Login</a>`;
        displaySuccess(successMessageContainer, successMessage);
      } catch (error) {
        successMessageContainer.classList.add("hidden");
        const customRegisterError = error;
        displayError(error, errorMessageElement, customRegisterError);
        errorMessageElement.classList.remove("hidden");
        console.log("Registration error:", error);
        form.reset();
      }
    });
  }
}
