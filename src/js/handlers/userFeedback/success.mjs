export function displaySuccess(successMessageElement, customMessage = null) {
  const messageToDisplay = customMessage || "Success!";

  successMessageElement.innerHTML = messageToDisplay;
}
