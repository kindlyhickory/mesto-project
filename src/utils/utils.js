export function renderLoading( isLoading, popup, buttonText = "Сохранить") {
  const sendButton = popup.querySelector(".popup__save");
  if (isLoading) {
    sendButton.textContent = 'Сохранение...'
  } else {
    sendButton.textContent = buttonText;
  }
}
