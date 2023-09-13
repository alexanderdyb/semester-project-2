import { createBid } from "../api/listings/createBid.mjs";
import { listingDetails } from "../ui/templates/listingDetails.mjs";
import { displayError } from "./userFeedback/error.mjs";
import { displaySuccess } from "./userFeedback/success.mjs";

export function bid() {
  const queryString = document.location.search;
  const params = new URLSearchParams(queryString);
  const id = params.get("id");

  const bidButton = document.querySelector("#bidButton");
  const bidInput = document.querySelector("#bidInput");
  const message = document.querySelector(".message");

  bidButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const amount = parseFloat(bidInput.value);
    if (amount > 0 && id) {
      try {
        await createBid(id, amount);
        listingDetails();
        message.innerHTML = "";
        const successMessage = `<div class="text-[#5BC236]"><p>Bid created successfully!</p></div>`;
        displaySuccess(message, successMessage);
      } catch (error) {
        message.innerHTML = "";
        console.error("Error creating bid", error);

        let errorMessage = error.message;

        try {
          let parsedError = JSON.parse(errorMessage.match(/{.*}/)?.[0]);
          errorMessage = parsedError.errors[0]?.message || errorMessage;
        } catch (err) {
          console.error("Error parsing JSON error message", err);
        }

        let statusCode = errorMessage.match(/\d+/)?.[0];
        let customRegisterError = "There was an issue creating your bid. ";

        if (statusCode) {
          customRegisterError += `${errorMessage}`;
        }

        const errorMessageElement = message;
        displayError(errorMessage, errorMessageElement, customRegisterError);
      }
    } else if (amount <= 0) {
      message.innerHTML = "";
      message.innerHTML = `<div class="text-[#ED4337]"><p>Bid amount must be higher than 0</p></div>`;
    } else {
      message.innerHTML = "";
      message.innerHTML = `<div class="text-[#ED4337]"><p>You have not set a bid amount</p></div>`;
    }
  });
}
