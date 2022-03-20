import '../pages/index.css';
import { initialCards } from './constants.js';
import {
  editPopup, editButton, popupEditFormElement, addButton, addPopup, popupAddFormElement,
  openPopup, setEditPopup, handleSubmit, handleSubmitAdding,
} from './modal.js';


import { docReady } from './utils.js';
import { enableValidation } from './validate.js';

// Elements



// Listeners
editButton.addEventListener('click', () => {
  setEditPopup();
  openPopup(editPopup);
});
addButton.addEventListener('click', () => openPopup(addPopup));
popupEditFormElement.addEventListener('submit', handleSubmit);
popupAddFormElement.addEventListener('submit', handleSubmitAdding);

//Document loaded
document.addEventListener("DOMContentLoaded", () => docReady(initialCards));

enableValidation({
  formSelector: '.popup__data',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_type_inactive',
  inputInvalidClass: '.popup__item_type_active',
  errorActiveClass: '.form__input-error_active',
  errorClass: 'popup__input-error',
});
