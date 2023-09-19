import { postListing } from "../api/listings/create.mjs";
import { displayError } from "./userFeedback/error.mjs";
import { displaySuccess } from "./userFeedback/success.mjs";

/**
 * This function handles the creation of a new listing. It is bound to the submit event of the form with id "listingForm".
 * On form submission, it gathers the input values, and tries to create a new listing through a POST request using the postListing function.
 * If the listing is successfully created, a success message is displayed.
 * If the creation fails, an error message is displayed.
 *
 * @export
 */
export function createListing() {
  document
    .getElementById("listingForm")
    .addEventListener("submit", async function (event) {
      const errorMessageElement = document.querySelector(".errorMessage");
      const successMessageContainer = document.querySelector(".successMessage");
      event.preventDefault();

      // Retrieve and format form data
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
        // Try to create a new listing
        await postListing(title, description, tags, media, endsAt);
        event.target.reset();
        errorMessageElement.classList.add("hidden");
        const successMessage = `<p class="font-bold mb-8">Success! You're created a listing.</p>
      <a href="/" class="btn">Go to listings</a>`;
        displaySuccess(successMessageContainer, successMessage);
      } catch (error) {
        // If an error occurs, display it
        successMessageContainer.classList.add("hidden");
        const customRegisterError = error;
        displayError(error, errorMessageElement, customRegisterError);
        errorMessageElement.classList.remove("hidden");
        event.target.reset();
      }
    });
}
