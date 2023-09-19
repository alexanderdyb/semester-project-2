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
let allData = [];
let filteredData = [];

const listingsContainer = document.querySelector("#listingsContainer");
const loadMoreButton = document.querySelector("#loadMoreButton");

/**
 * Entry point to initialize and set up event listeners for the latest listings page.
 *
 * @function
 * @export
 */
export function latestListings() {
  setupSearchEventListener(latestListingsFunction);
  setupSortOrderEventListener(latestListingsFunction);
  setupLoadMoreButton(loadMoreListings);
  latestListingsFunction("", "newest", true);
}

/**
 * Fetches all listings from the server in batches until no more data is returned.
 *
 * @async
 * @function
 * @param {number} [offset=0] - The offset to start retrieving listings from (default is 0).
 * @param {number} [limit=10] - The maximum number of listings to retrieve per batch (default is 10).
 * @returns {Promise<Object[]>} - A promise that resolves to an array containing all the listings.
 */
async function fetchAllListings(offset = 0, limit = 10) {
  let data = [];
  try {
    while (true) {
      const newData = await getListings(limit, offset);
      if (newData.length === 0) break;
      data = [...data, ...newData];
      offset += limit;
    }
  } catch (error) {
    console.error("Error fetching all listings:", error);
    throw error;
  }
  return data;
}

/**
 * Main function to retrieve, sort, filter, and display the latest listings based on the specified parameters.
 *
 * @async
 * @function
 * @param {string} [query=""] - The search query to filter the listings (default is an empty string).
 * @param {string} [sortOrder="newest"] - The sorting order, can be "newest" or "oldest" (default is "newest").
 * @param {boolean} [resetOffset=false] - Whether to reset the offset (default is false).
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
    allData = await fetchAllListings();

    if (sortOrder === "newest") {
      allData.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortOrder === "oldest") {
      allData.sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    filteredData = searchListings(allData, query);

    displayListings();
  } catch (error) {
    console.error("Entered catch block in latestListingsFunction:", error);
    handleError(error);
  }
}

function displayListings() {
  const dataToDisplay = filteredData.slice(
    currentOffset,
    currentOffset + LIMIT
  );
  dataToDisplay.forEach((element) => {
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

  loadMoreButton.style.display =
    currentOffset + LIMIT < filteredData.length ? "block" : "none";
}

/**
 * Handles errors that occur during the fetching and displaying of listings.
 * Displays an error message on the page.
 *
 * @function
 * @param {Error} error - The error object containing the error details.
 */
function handleError(error) {
  console.log("handleError function called");
  listingsContainer.innerHTML = "";
  let errorMessageElement = document.querySelector(".errorMessage");

  if (!errorMessageElement) {
    console.error("Error message element not found");
    return;
  }

  const customRegisterError = error.message;
  displayError(error, errorMessageElement, customRegisterError);
  errorMessageElement.classList.remove("hidden");
}

/**
 * Event handler function for the "Load More" button.
 * Increases the offset and displays the next set of listings when the button is clicked.
 *
 * @function
 */
function loadMoreListings() {
  currentOffset += LIMIT;
  displayListings();
}
