/**
 * This function sets up an event listener on a search bar element.
 * When text is input into the search bar, the `latestListingsFunction` is called with the input text as the query parameter.
 *
 * @param {Function} latestListingsFunction - The function to call to get the latest listings based on the search query and sort order.
 * @export
 */
export function setupSearchEventListener(latestListingsFunction) {
  const searchBar = document.querySelector("#searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", (event) => {
      const query = event.target.value;
      const sortOrder = document.querySelector("#sortOrder").value;
      latestListingsFunction(query, sortOrder, true);
    });
  }
}

/**
 * This function sets up an event listener on a sort order selector element.
 * When the sort order is changed, the `latestListingsFunction` is called with the new sort order and the current search query as parameters.
 *
 * @param {Function} latestListingsFunction - The function to call to get the latest listings based on the search query and sort order.
 * @export
 */
export function setupSortOrderEventListener(latestListingsFunction) {
  const sortOrder = document.querySelector("#sortOrder");
  if (sortOrder) {
    sortOrder.addEventListener("change", (event) => {
      const query = document.querySelector("#searchBar").value;
      latestListingsFunction(query, event.target.value, true);
    });
  }
}

/**
 * This function sets up an event listener on a "Load More" button.
 * When the button is clicked, the `latestListingsFunction` is called to load more listings.
 *
 * @param {Function} latestListingsFunction - The function to call to get more listings.
 * @export
 */
export function setupLoadMoreButton(latestListingsFunction) {
  const loadMoreButton = document.querySelector("#loadMoreButton");
  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      latestListingsFunction();
    });
  }
}
