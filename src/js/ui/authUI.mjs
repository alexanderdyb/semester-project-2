export function toggleUI() {
  const token = localStorage.getItem("token");

  const loggedOutElements = document.querySelectorAll(
    "[data-visible='loggedOut']"
  );
  const loggedInElements = document.querySelectorAll(
    "[data-visible='loggedIn']"
  );

  if (token) {
    loggedOutElements.forEach((el) => el.classList.add("hidden"));
    loggedInElements.forEach((el) => el.classList.remove("hidden"));
  } else {
    loggedOutElements.forEach((el) => el.classList.remove("hidden"));
    loggedInElements.forEach((el) => el.classList.add("hidden"));
  }
}
