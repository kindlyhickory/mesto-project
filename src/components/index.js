import '../pages/index.css';
import { initialCards } from './constants.js';
import {
  editPopup, editButton, popupEditFormElement, addButton, addPopup, popupAddFormElement,
  openPopup, closePopup
} from './modal.js';

import { nameInput, jobInput, profileName, profileDescription, placeInput, urlInput } from './constants.js';

import { addCard, cardsContainer, createCard } from './cards.js';
import { enableValidation } from './validate.js';

// Set edit popup
export function setEditPopup() {
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", profileDescription.textContent);
}

//Edit form -> changing profile
export function handleSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}


// handle add form submit
export function handleSubmitAdding(e) {
  e.preventDefault();
  addCard(cardsContainer, createCard(placeInput.value, urlInput.value));
  e.target.reset();
  closePopup(addPopup);
}

function formingDoc(cards) {
  cards.forEach(card => {
    addCard(cardsContainer, createCard(card.name, card.link));
  })
}

// Listeners
editButton.addEventListener('click', () => {
  setEditPopup();
  openPopup(editPopup);
});
addButton.addEventListener('click', () => openPopup(addPopup));
popupEditFormElement.addEventListener('submit', handleSubmit);
popupAddFormElement.addEventListener('submit', handleSubmitAdding);





//Document loaded
document.addEventListener("DOMContentLoaded", () => formingDoc(initialCards));

enableValidation({
  formSelector: '.popup__data',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_type_inactive',
  inputInvalidClass: '.popup__item_type_active',
  errorActiveClass: '.form__input-error_active',
  errorClass: 'popup__input-error',
});
