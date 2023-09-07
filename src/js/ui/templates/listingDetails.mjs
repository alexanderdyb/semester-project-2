import { getListingDetails } from "../../api/listings/readDetails.mjs";
import { displayError } from "../../handlers/userFeedback/error.mjs";
import { formatDate } from "../../handlers/conversion/date.mjs";
const listingsDetailsContainer = document.querySelector(
  "#listingsDetailsContainer"
);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

export async function listingDetails() {
  try {
    const data = await getListingDetails(id);
    console.log(data);
    const title = data.title;
    const description = data.description;
    const image = data.media[0];
    const createdDate = formatDate(data.created);
    const endDate = formatDate(data.endsAt);
    const tags = data.tags || [];
    const tagsHTML = tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join(", ");

    listingsDetailsContainer.innerHTML = "";

    listingsDetailsContainer.innerHTML += `
    <div class="h-80">
    <img src="${image}" alt="${title}" class="object-cover w-full h-full" />
  </div>
  <div class="sm:mx-auto">
    <h1>${title}</h1>
    <p>Posted ${createdDate}</p>
    <p>Ends at ${endDate}</p>
    ${tagsHTML.length ? `<p class="pb-4">Tags: ${tagsHTML}</p>` : ""}
    <p class="pb-4">About the listing: ${description}</p>
  </div>
</div>
`;

    // All bids

    const bids = data.bids || [];
    let bidsHTML = "";

    if (bids.length > 0) {
      bidsHTML = '<ul class="bids-list">';
      bids.forEach((bid) => {
        bidsHTML += `<li>Bidder: ${bid.bidderName}, Amount: ${
          bid.amount
        }, Date: ${formatDate(bid.created)}</li>`;
      });
      bidsHTML += "</ul>";
    } else {
      bidsHTML = "<p>No bids available for this listing.</p>";
    }

    const bidLoggedInContainer = document.querySelector("#bidLoggedIn");
    if (bidLoggedInContainer) {
      bidLoggedInContainer.innerHTML = bidsHTML;
    } else {
      console.error("#bidLoggedIn element not found");
    }
  } catch (error) {
    listingsDetailsContainer.innerHTML = "";
    const errorMessageElement = document.querySelector(".errorMessage");
    const customRegisterError = error;
    displayError(error, errorMessageElement, customRegisterError);
    errorMessageElement.classList.remove("hidden");
  }
}
