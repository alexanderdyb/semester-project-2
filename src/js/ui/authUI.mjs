export function toggleUI() {
  const token = localStorage.getItem("token");

  const loggedOutElements = document.querySelectorAll(
    "[data-visible='loggedOut']"
  );
  const loggedInElements = document.querySelectorAll(
    "[data-visible='loggedIn']"
  );

  if (token) {
    loggedOutElements.forEach((el) => (el.style.display = "none"));
    loggedInElements.forEach((el) => (el.style.display = "block"));
  } else {
    loggedOutElements.forEach((el) => (el.style.display = "block"));
    loggedInElements.forEach((el) => (el.style.display = "none"));
  }
}
