import { getListingDetails } from "../../api/listings/readDetails.mjs";
import { displayError } from "../../handlers/userFeedback/error.mjs";
import { formatDate } from "../../handlers/conversion/date.mjs";
const listingsDetailsContainer = document.querySelector(
  "#listingsDetailsContainer"
);

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

/**
 * Asynchronously retrieves and displays the details of a listing.
 * In case of an error, it clears the listingsDetailsContainer and displays an error message.
 *
 * @async
 * @function
 * @export
 */
export async function listingDetails() {
  try {
    const data = await getListingDetails(id);

    const title = data.title ? data.title : "No title";
    const description = data.description;
    const createdDate = formatDate(data.created);
    const endDate = formatDate(data.endsAt);
    const tags = data.tags || [];
    const tagsHTML = tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join(", ");

    const highestBid =
      data.bids.length > 0
        ? Math.max(...data.bids.map((bid) => bid.amount))
        : 0;

    const images = data.media;
    const numberOfImages = images.length;
    let currentImageIndex = 0;

    listingsDetailsContainer.innerHTML = "";

    function updateImage() {
      const imageElement = document.querySelector("#carouselImage");
      if (imageElement) {
        imageElement.src = images[currentImageIndex];
      }
      if (imageNumberDisplay) {
        imageNumberDisplay.textContent = `${
          currentImageIndex + 1
        } of ${numberOfImages}`;
      }
    }

    function previousImage() {
      if (currentImageIndex > 0) {
        currentImageIndex -= 1;
        updateImage();
      }
    }

    function nextImage() {
      if (currentImageIndex < images.length - 1) {
        currentImageIndex += 1;
        updateImage();
      }
    }

    listingsDetailsContainer.innerHTML = `
      <div class="relative h-80">
        <img src="${
          images[0] ? images[0] : "../../src/assets/images/no-image.png"
        }" alt="${title}" class="object-cover w-full h-full" id="carouselImage" />
        <div class="flex justify-between">
          <button id="prevButton" class="px-4 py-2 bg-custom-gold text-[#161616]">Prev</button>
          <p id="imageNumberDisplay">${
            currentImageIndex + 1
          } of ${numberOfImages}</p>
          <button id="nextButton" class="px-4 py-2 bg-custom-gold text-[#161616]">Next</button>
        </div>
      </div>
      <div class="sm:mx-auto">
        <h1>${title}</h1>
        <p>Posted ${createdDate}</p>
        <p>Ends at ${endDate}</p>
        <p class="pb-2 font-semibold">Highest Bid: ${highestBid}</p>
        <p>About the listing: ${description}</p>
        ${tagsHTML.length ? `<p>Tags: ${tagsHTML}</p>` : ""}
      </div>
    `;

    document
      .getElementById("prevButton")
      .addEventListener("click", previousImage);
    document.getElementById("nextButton").addEventListener("click", nextImage);

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

/**
 * Displays all the bids for a listing.
 *
 * @function
 * @param {object} data - The listing data containing bids.
 */
function allBids(data) {
  const bidLoggedInContainer = document.querySelector("#bidLoggedIn");
  const bids = data.bids;
  bidLoggedInContainer.innerHTML = "";

  if (bids.length > 0) {
    bids.sort((a, b) => b.amount - a.amount);

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
