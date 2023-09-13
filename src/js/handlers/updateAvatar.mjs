import { updateAvatar } from "../api/profile/avatar.mjs";
import { displayError } from "./userFeedback/error.mjs";

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
