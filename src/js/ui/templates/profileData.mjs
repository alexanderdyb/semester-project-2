import { getProfile } from "../../api/auth/profile.mjs";

const accountContainer = document.querySelector("#accountContainer");

export async function getProfileData() {
  try {
    const data = await getProfile();
    console.log(data);
    accountContainer.innerHTML = "";
  } catch (error) {}
}
