export function renderLoading(event, isLoading, popup, buttonText = "Сохранить") {
  const sendButton = event.target.querySelector('.popup__save');
  if (isLoading) {
    sendButton.textContent = 'Сохранение...'
  } else {
    sendButton.textContent = buttonText;
  }
}
