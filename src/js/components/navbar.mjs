/**
 * Handles the functionality of the navigation bar, toggling between a hamburger menu icon and a close icon.
 * This function sets up event listeners for window resizing and click events on the hamburger and close icons.
 * Depending on the interactions, it toggles the visibility of the menu, logo, and the icons themselves.
 *
 * - When the window is resized to a width of 768 or more, it hides the close icon and the menu, and shows the hamburger icon and the logo.
 * - When the hamburger icon is clicked, it hides itself and the logo, and shows the close icon and the menu.
 * - When the close icon is clicked, it hides itself and the menu, and shows the hamburger icon and the logo.
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
