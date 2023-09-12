import { postListing } from "../api/listings/create.mjs";

export function createListing() {
  document
    .getElementById("listingForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      let title = document.getElementById("title").value;
      let description = document.getElementById("description").value;

      let tagsString = document.getElementById("tags").value;
      let tags = tagsString
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      let mediaElements = document.querySelectorAll("#media input");
      let media = Array.from(mediaElements)
        .map((ele) => ele.value)
        .filter(Boolean);

      let endsAt = new Date(
        document.getElementById("endsAt").value
      ).toISOString();

      try {
        await postListing(title, description, tags, media, endsAt);
        event.target.reset();
        window.location.href = "/";
      } catch (error) {
        console.log("error");
      }
    });
}
