import {
  editPopup, editButton, popupEditFormElement, nameInput, jobInput, addButton, addPopup, popupAddFormElement, placeInput, urlInput,
  imagePopup, imageSpace, imageTitle, profileName, profileDescription, disabledButtonClass, submitButtonSelector, inputSelector
} from "./constants.js";
import { toggleButtonState } from "./validate.js";
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

function handleClickOutside(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.target === openedPopup) {
    closePopup(openedPopup);
  }
}

// POPUP
//popup open
function openPopup(popup) {
  if (popup.classList.contains("popup_add")) {
    const inputList = Array.from(popup.querySelectorAll(`${inputSelector}`));
    const submitButton = popup.querySelector(`${submitButtonSelector}`);
    toggleButtonState(inputList, submitButton, disabledButtonClass);
  }
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener("click", () => closePopup(popup));
  document.addEventListener("keydown", handleEscape);
  popup.classList.add("popup_opened");
  setTimeout(() => document.addEventListener("click", handleClickOutside), 1);
}

function closePopup(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.removeEventListener("click", () => closePopup(popup));
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", handleEscape);
  document.removeEventListener("click", handleClickOutside);
}

export {
  editPopup, editButton, popupEditFormElement, nameInput, jobInput, addButton, addPopup, popupAddFormElement, placeInput, urlInput, imagePopup, imageSpace,
  imageTitle, openPopup, closePopup, profileName, profileDescription
}
