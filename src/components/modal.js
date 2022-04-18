import {
  editPopup, editButton, popupEditFormElement, nameInput, jobInput, addButton, addPopup, popupAddFormElement, placeInput, urlInput,
  imagePopup, imageSpace, imageTitle, profileName, profileDescription,
} from "./constants.js";


// function handleEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup);
//   }
// }
export default class Popup {
  constructor(selector) {
    this._popup = document.querySelector(selector);
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    // this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
      if (evt.target.classList.contains("popup__close-button")) {
        this.close();
      }
    });
  }
}
// POPUP
//popup open
// function openPopup(popup) {
//   document.addEventListener("keydown", handleEscape);
//   popup.classList.add("popup_opened");
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener("keydown", handleEscape);
// }

export {
  editPopup, editButton, popupEditFormElement, nameInput, jobInput, addButton, addPopup, popupAddFormElement, placeInput, urlInput, imagePopup, imageSpace,
  imageTitle, profileName, profileDescription
}
