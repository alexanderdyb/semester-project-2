import { getListings } from "../../api/listings/read.mjs";
import { displayError } from "../../handlers/userFeedback/error.mjs";
import { formatDate } from "../../handlers/conversion/date.mjs";
import { searchListings } from "../../handlers/search.mjs";

const listingsContainer = document.querySelector("#listingsContainer");

export function latestListings() {
  setupSearchEventListener();
  setupSortOrderEventListener();
  latestListingsFunction();
}

function setupSearchEventListener() {
  const searchBar = document.querySelector("#searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", (event) => {
      const query = event.target.value;
      const sortOrder = document.querySelector("#sortOrder").value;
      latestListingsFunction(query, sortOrder);
    });
  }
}

function setupSortOrderEventListener() {
  const sortOrder = document.querySelector("#sortOrder");
  if (sortOrder) {
    sortOrder.addEventListener("change", (event) => {
      const query = document.querySelector("#searchBar").value;
      latestListingsFunction(query, event.target.value);
    });
  }
}

async function latestListingsFunction(query = "", sortOrder = "newest") {
  try {
    const data = await getListings();
    console.log(data);

    listingsContainer.innerHTML = "";

    if (sortOrder === "newest") {
      data.sort((a, b) => new Date(b.created) - new Date(a.created));
    } else if (sortOrder === "oldest") {
      data.sort((a, b) => new Date(a.created) - new Date(b.created));
    }

    const filteredData = searchListings(data, query);

    filteredData.forEach((element) => {
      const title = element.title;
      const image = element.media[0];
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
              <h3>${title}</h3>
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
