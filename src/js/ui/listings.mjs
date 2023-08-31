import { getListings } from "../api/listings/read.mjs";
const listingsContainer = document.querySelector("#listingsContainer");

export async function latestListings() {
  try {
    const data = await getListings();

    listingsContainer.innerHTML = "";

    data.forEach((element) => {
      const title = element.title;
      const image = element.media[0];

      listingsContainer.innerHTML += `
            <div>
              <div class="h-80">
                <img src=${image} alt=${title} class="object-cover w-full h-full" />
              </div>
              <div class="bg-white p-5">
                <div class="mb-5">
                  <h3>${title}</h3>
                  <p>5 days left</p>
                  <p>Highest bid: 50</p>
                </div>
                <div class="border text-center py-2">
                  <a href="#" class="d-block w-100 h-100">Details</a>
                </div>
              </div>
            </div>`;
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
