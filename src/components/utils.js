export function renderLoading(event, isLoading, popup) {
  const sendButton = event.target.querySelector('.popup__save');
  if (isLoading) {
    sendButton.textContent = 'Сохранение'
  } else {
    if (popup.classList.contains("popup_avatar-change") || popup.classList.contains("popup_edit")) {
      sendButton.textContent = "Сохранить";
    } else if (popup.classList.contains("popup_add")) {
      sendButton.textContent = "Создать";
    }
  }
}
