import { getProfile } from "../../api/profile/profile.mjs";
import { getMyListings } from "../../api/profile/profileListings.mjs";
import { displayError } from "../../handlers/userFeedback/error.mjs";
import { formatDate } from "../../handlers/conversion/date.mjs";

const accountContainer = document.querySelector("#accountContainer");
const myListingsContainer = document.querySelector("#myListingsContainer");

export async function getProfileData() {
  try {
    const data = await getProfile();
    console.log(data);
    const name = data.name;
    const credits = data.credits;
    const avatar = data.avatar;
    const email = data.email;

    accountContainer.innerHTML = "";

    accountContainer.innerHTML += `
    <div class="h-80">
    <img src="${avatar}" alt="Avatar" class="object-cover w-full h-full" />
  </div>
  <div class="sm:mx-auto">
    <h3>${name}</h3>
    <p>E-mail: ${email}</p>
    <p class="mb-4">Credits: ${credits}</p>
    <a href="/update-avatar/" class="btn">Update avatar</a>
  </div>
`;
  } catch (error) {
    accountContainer.innerHTML = "";
    const errorMessageElement = document.querySelector(".errorMessage");
    const customRegisterError = error;
    displayError(error, errorMessageElement, customRegisterError);
    errorMessageElement.classList.remove("hidden");
  }
}

export async function getMyListingsData() {
  try {
    const data = await getMyListings();
    console.log(data);

    myListingsContainer.innerHTML = "";

    data.forEach((element) => {
      const title = element.title;
      const image = element.media[0];
      const bids = element._count.bids;
      const createdDate = formatDate(element.created);
      const id = element.id;

      myListingsContainer.innerHTML += `
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
    myListingsContainer.innerHTML = "";
    const errorMessageElement = document.querySelector(
      ".errorMessageMyListings"
    );
    const customRegisterError = error;
    displayError(error, errorMessageElement, customRegisterError);
    errorMessageElement.classList.remove("hidden");
  }
}
