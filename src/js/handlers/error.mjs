export function displayError(error, errorMessageElement, customMessage = null) {
  console.log("Caught error:", error);

  const messageToDisplay =
    customMessage ||
    error.message ||
    "An unexpected error occurred. Please try again later.";

  errorMessageElement.innerHTML = messageToDisplay;
}
