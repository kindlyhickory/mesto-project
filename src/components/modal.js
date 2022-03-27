import {
  editPopup, editButton, popupEditFormElement, nameInput, jobInput, addButton, addPopup, popupAddFormElement, placeInput, urlInput,
  imagePopup, imageSpace, imageTitle, profileName, profileDescription,
} from "./constants.js";


function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// POPUP
//popup open
function openPopup(popup) {
  document.addEventListener("keydown", handleEscape);
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", handleEscape);
}

export {
  editPopup, editButton, popupEditFormElement, nameInput, jobInput, addButton, addPopup, popupAddFormElement, placeInput, urlInput, imagePopup, imageSpace,
  imageTitle, openPopup, closePopup, profileName, profileDescription
}
