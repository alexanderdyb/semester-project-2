import { getListings } from "../api/listings/read.mjs";
import { displayError } from "../handlers/userFeedback/error.mjs";
import { formatDate } from "../handlers/conversion/date.mjs";
const listingsContainer = document.querySelector("#listingsContainer");

export async function latestListings() {
  try {
    const data = await getListings();
    console.log(data);

    listingsContainer.innerHTML = "";
    data.sort((a, b) => new Date(b.created) - new Date(a.created));

    data.forEach((element) => {
      const title = element.title;
      const image = element.media[0];
      const bids = element._count.bids;
      const createdDate = formatDate(element.created);

      listingsContainer.innerHTML += `
            <div>
              <div class="h-80">
                <img src=${image} alt=${title} class="object-cover w-full h-full" />
              </div>
              <div class="bg-white p-5">
                <div class="mb-5">
                  <h3>${title}</h3>
                  <p>Posted ${createdDate}</p>
                  <p>${bids} bids</p>
                </div>
                <div class="border text-center py-2">
                  <a href="#" class="inline-block w-full h-100">Details</a>
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
