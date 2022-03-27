import '../pages/index.css';
import { editAvatarButton, initialCards, avatarPopup, popupAvatarFormELement, avatarInputElement } from './constants.js';
import {
  editPopup, editButton, popupEditFormElement, addButton, addPopup, popupAddFormElement,
  openPopup, closePopup
} from './modal.js';

import { nameInput, jobInput, profileName, profileDescription, profileAvatar, placeInput, urlInput, popups, inputSelector, submitButtonSelector, disabledButtonClass } from './constants.js';

import { addCard, cardsContainer, createCard } from './cards.js';

import { sendNewCardToServer, getCards, getUserData, changeUserData, changeAvatar } from './api.js';
import { enableValidation, toggleButtonState } from './validate.js';

import { setAvatar, setDOMUserData } from './profile.js';
import { renderLoading } from './utils';

export let userId


// Set edit popup
export function setEditPopup() {
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", profileDescription.textContent);
}

//Edit form -> changing profile
export function handleSubmit(e) {
  e.preventDefault();
  changeUserData(nameInput.value, jobInput.value)
    .then((profile) => {
      setDOMUserData(profile.name, profile.about, profile.avatar, profileName, profileDescription, profileAvatar)
      closePopup(editPopup);
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading(e, false, editPopup, "Сохранить")
    });
}


// handle add form submit
export function handleSubmitAdding(e) {
  e.preventDefault();
  sendNewCardToServer(placeInput.value, urlInput.value)
    .then(card => {
      addCard(cardsContainer, createCard(card.name, card.link, card.likes.length, card._id, card.likes, card.owner._id, userId));
      closePopup(addPopup);
      e.target.reset();
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading(e, false, addPopup, "Создать");
    });

}

export function handleSubmitAvatar(e) {
  e.preventDefault();
  changeAvatar(avatarInputElement.value)
    .then(user => {
      setAvatar(profileAvatar, user.avatar, user.name);
      closePopup(avatarPopup);
      e.target.reset();
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading(e, false, avatarPopup, "Сохранить");
    });

}

function formingDoc() {
  Promise.all([getUserData(), getCards()])
    .then(([profile, cards]) => {
      userId = profile._id;
      setDOMUserData(profile.name, profile.about, profile.avatar, profileName, profileDescription, profileAvatar, profile._id)
      cards.forEach(card => {
        addCard(cardsContainer, createCard(card.name, card.link, card.likes.length, card._id, card.likes, card.owner._id, userId));
      })
    })
    .catch(error => console.log(error));
}

// Listeners
popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

editButton.addEventListener('click', () => {
  setEditPopup();
  openPopup(editPopup);
});
addButton.addEventListener('click', () => {
  openPopup(addPopup);
  const inputList = Array.from(addPopup.querySelectorAll(`${inputSelector}`));
  const submitButton = addPopup.querySelector(`${submitButtonSelector}`);
  toggleButtonState(inputList, submitButton, disabledButtonClass);
});
popupEditFormElement.addEventListener('submit', (e) => {
  renderLoading(e, true, editPopup);
  handleSubmit(e);
});
popupAddFormElement.addEventListener('submit', (e) => {
  renderLoading(e, true, addPopup)
  handleSubmitAdding(e)
});
popupAvatarFormELement.addEventListener('submit', (e) => {
  renderLoading(e, true, avatarPopup);
  handleSubmitAvatar(e);
});
editAvatarButton.addEventListener('click', () => openPopup(avatarPopup));





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
