export function displayError(error, errorMessageElement) {
  console.log("Caught error:", error);
  errorMessageElement.innerHTML =
    error.message || "An unexpected error occurred. Please try again later.";
}
