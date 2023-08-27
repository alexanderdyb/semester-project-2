import { register } from "../api/auth/register.mjs";
import { displayError } from "./error.mjs";

export function registerFormListener() {
  const form = document.querySelector("#registerForm");
  const errorMessageElement = document.querySelector(".errorMessage");
  const successMessage = document.querySelector(".successMessage");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const profile = Object.fromEntries(formData.entries());

      try {
        await register(profile);
        errorMessageElement.innerHTML = "";
        errorMessageElement.classList.add("hidden");
        successMessage.innerHTML = `<p class="font-bold mb-8">Success! You're registered and can now log in.</p>
        <a href="/login/" class="btn">Login</a>`;
      } catch (error) {
        displayError(error, errorMessageElement);
        errorMessageElement.classList.remove("hidden");
      }
    });
  }
}
