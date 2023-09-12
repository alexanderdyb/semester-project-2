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
    allBids(data);
  } catch (error) {
    listingsDetailsContainer.innerHTML = "";
    const errorMessageElement = document.querySelector(".errorMessage");
    const customRegisterError = error;
    displayError(error, errorMessageElement, customRegisterError);
    errorMessageElement.classList.remove("hidden");
  }
}

function allBids(data) {
  const bidLoggedInContainer = document.querySelector("#bidLoggedIn");
  const bids = data.bids;
  bidLoggedInContainer.innerHTML = "";

  if (bids.length > 0) {
    bids.sort((a, b) => b.amount - a.amount); // This will sort the bids in descending order of the bid amount

    bids.forEach((bid) => {
      const bidderName = bid.bidderName;
      const bidCreated = formatDate(bid.created);
      const bidAmount = bid.amount;
      bidLoggedInContainer.innerHTML += `<div class="flex-col"><div class="mb-5 mt-5 rounded-2xl border py-6 px-2"><p class="mb-2">${bidCreated} by <span class="font-semibold">${bidderName}</span></p><p><span class="font-bold">Bid amount: ${bidAmount}</span></p></div></div>`;
    });
  } else {
    bidLoggedInContainer.innerHTML = `<p class="text-center">No bids for this listing.</p>`;
  }
}
