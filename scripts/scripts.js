popup = document.querySelector(".popup");
editButton = document.querySelector(".profile__edit-button");
closeButton = document.querySelector(".popup__close-button");


editButton.addEventListener('click', openEditPopup);
closeButton.addEventListener('click', closeEditPopup);

function openEditPopup() {
  editButton.removeEventListener('click', openEditPopup)
  popup.classList.add("popup_opened");
}

function closeEditPopup() {
  editButton.addEventListener('click', openEditPopup);
  popup.classList.remove("popup_opened");
}

