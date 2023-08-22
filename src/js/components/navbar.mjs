/**
 * Handles the functionality of the navigation bar with a hamburger menu icon and a close icon.
 */
export function navbarHandler() {
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      close.classList.add("hidden");
      hamburger.classList.remove("hidden");
      menu.classList.add("hidden");
      logo.classList.remove("hidden");
    }
  });

  const hamburger = document.querySelector("#hamburger");
  const close = document.querySelector("#close");
  const menu = document.querySelector("#menu");
  const logo = document.querySelector("#logo");

  hamburger.addEventListener("click", () => {
    close.classList.toggle("hidden");
    hamburger.classList.toggle("hidden");
    menu.classList.toggle("hidden");
    logo.classList.add("hidden");
  });

  close.addEventListener("click", () => {
    hamburger.classList.toggle("hidden");
    close.classList.toggle("hidden");
    menu.classList.toggle("hidden");
    logo.classList.remove("hidden");
  });
}
