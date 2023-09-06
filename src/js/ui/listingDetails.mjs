import { getListingDetails } from "../api/listings/readDetails.mjs";
import { displayError } from "../handlers/userFeedback/error.mjs";
import { formatDate } from "../handlers/conversion/date.mjs";
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

    listingsDetailsContainer.innerHTML = "";

    listingsDetailsContainer.innerHTML += `
    <div class="h-80">
    <img src="${image}" alt="${title}" class="object-cover w-full h-full" />
  </div>
  <div class="sm:mx-auto">
    <h1>${title}</h1>
    <p>Posted ${createdDate}</p>
    <p class="pb-4">Ends at ${endDate}</p>
    <p class="pb-4">About the listing: ${description}</p>
  </div>
</div>
`;
  } catch (error) {
    listingsDetailsContainer.innerHTML = "";
    const errorMessageElement = document.querySelector(".errorMessage");
    const customRegisterError = error;
    displayError(error, errorMessageElement, customRegisterError);
    errorMessageElement.classList.remove("hidden");
  }
}
