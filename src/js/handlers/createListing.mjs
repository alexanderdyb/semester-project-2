import { postListing } from "../api/listings/create.mjs";
import { displayError } from "./userFeedback/error.mjs";
import { displaySuccess } from "./userFeedback/success.mjs";

export function createListing() {
  document
    .getElementById("listingForm")
    .addEventListener("submit", async function (event) {
      const errorMessageElement = document.querySelector(".errorMessage");
      const successMessageContainer = document.querySelector(".successMessage");
      event.preventDefault();

      let title = document.getElementById("title").value;
      let description = document.getElementById("description").value;

      let tagsString = document.getElementById("tags").value;
      let tags = tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      let mediaElements = document.querySelectorAll("#media input");
      let media = Array.from(mediaElements)
        .map((ele) => ele.value)
        .filter(Boolean);

      let endsAt = new Date(
        document.getElementById("endsAt").value
      ).toISOString();

      try {
        await postListing(title, description, tags, media, endsAt);
        event.target.reset();
        errorMessageElement.classList.add("hidden");
        const successMessage = `<p class="font-bold mb-8">Success! You're created a listing.</p>
        <a href="/" class="btn">Go to listings</a>`;
        displaySuccess(successMessageContainer, successMessage);
      } catch (error) {
        successMessageContainer.classList.add("hidden");
        const customRegisterError = error;
        displayError(error, errorMessageElement, customRegisterError);
        errorMessageElement.classList.remove("hidden");
        form.reset();
      }
    });
}
