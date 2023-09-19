import { getListings } from "../../api/listings/read.mjs";
import { displayError } from "../../handlers/userFeedback/error.mjs";
import { formatDate } from "../../handlers/conversion/date.mjs";
import { searchListings } from "../../handlers/search.mjs";
import {
  setupSearchEventListener,
  setupSortOrderEventListener,
  setupLoadMoreButton,
} from "../../handlers/filter.mjs";

let currentOffset = 0;
const LIMIT = 10;

const listingsContainer = document.querySelector("#listingsContainer");

export function latestListings() {
  setupSearchEventListener(latestListingsFunction);
  setupSortOrderEventListener(latestListingsFunction);
  setupLoadMoreButton(latestListingsFunction);
  latestListingsFunction("", "newest", true);
}

/**
 * Retrieves and displays the latest listings with optional query and sorting options.
 *
 * @async
 * @function
 * @param {string} [query=""] - The search query.
 * @param {string} [sortOrder="newest"] - The sorting order (e.g., "newest" or "oldest").
 * @param {boolean} [resetOffset=false] - Whether to reset the offset.
 */
async function latestListingsFunction(
  query = "",
  sortOrder = "newest",
  resetOffset = false
) {
  if (resetOffset) {
    currentOffset = 0;
    listingsContainer.innerHTML = "";
  }
  try {
    const data = await getListings(LIMIT, currentOffset);

    const loadMoreButton = document.querySelector("#loadMoreButton");
    if (data.length > 0) {
      currentOffset += data.length;

      if (loadMoreButton) {
        loadMoreButton.style.display = data.length < LIMIT ? "none" : "block";
      }
    } else {
      if (loadMoreButton) {
        loadMoreButton.style.display = "none";
      }
      return;
    }

    if (sortOrder === "newest") {
      data.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortOrder === "oldest") {
      data.sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    const filteredData = searchListings(data, query);

    filteredData.forEach((element) => {
      const title = element.title ? element.title : "No title";
      const image = element.media[0]
        ? element.media[0]
        : "../../src/assets/images/no-image.png";
      const bids = element._count.bids;
      const createdDate = formatDate(element.created);
      const id = element.id;

      listingsContainer.innerHTML += `
        <div class="shadow-lg">
          <div class="h-80">
            <img src=${image} alt=${title} class="object-cover w-full h-full" />
          </div>
          <div class="bg-white p-5">
            <div class="mb-5">
              <h4>${title}</h4>
              <p>Posted ${createdDate}</p>
              <p>${bids} bids</p>
            </div>
            <div class="border text-center py-2 border-[#E8CC8B]">
              <a href="/listing/?id=${id}" class="inline-block w-full h-100">Details</a>
            </div>
          </div>
        </div>`;
    });
  } catch (error) {
    listingsContainer.innerHTML = "";
    const errorMessageElement = document.querySelector(".errorMessage");
    const customRegisterError = error;
    displayError(error, errorMessageElement, customRegisterError);
    errorMessageElement.classList.remove("hidden");
  }
}
