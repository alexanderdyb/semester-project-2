import { updateAvatar } from "../api/profile/avatar.mjs";
import { displayError } from "./userFeedback/error.mjs";

/**
 * Sets up an event listener for the "Update Avatar" button.
 * When the button is clicked, it attempts to update the user's avatar with the input value.
 * If successful, the user is redirected to the account page.
 * If an error occurs, it logs the error to the console and displays an error message on the webpage.
 *
 * @export
 */
export function updateAvatarImage() {
  const errorMessageElement = document.querySelector(".errorMessage");
  const avatarButton = document.querySelector("#avatarBtn");
  const avatarInput = document.querySelector("#avatar");

  avatarButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const avatar = avatarInput.value;

    try {
      await updateAvatar(avatar);
      window.location.href = "/account";
    } catch (error) {
      console.log(error);
      const customRegisterError = error;
      displayError(error, errorMessageElement, customRegisterError);
      errorMessageElement.classList.remove("hidden");
    }
  });
}
