import '../pages/index.css';
import { editAvatarButton, initialCards, avatarPopup, popupAvatarFormELement, avatarInputElement } from './constants.js';
import {
  editPopup, editButton, popupEditFormElement, addButton, addPopup, popupAddFormElement,
  openPopup, closePopup
} from './modal.js';

import { nameInput, jobInput, profileName, profileDescription, profileAvatar, placeInput, urlInput } from './constants.js';

import { addCard, cardsContainer, createCard } from './cards.js';

import { sendNewCardToServer, getCards, getUserData, changeUserData, changeAvatar } from './api.js';
import { enableValidation } from './validate.js';

import { setAvatar, setDOMUserData } from './profile.js';
import { renderLoading } from './utils';


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
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading(e, false, editPopup)
    });
  closePopup(editPopup);
}


// handle add form submit
export function handleSubmitAdding(e) {
  e.preventDefault();
  sendNewCardToServer(placeInput.value, urlInput.value)
    .then(card => {
      getUserData()
        .then(profile => {
          addCard(cardsContainer, createCard(card.name, card.link, card.likes.length, card._id, card.likes, card.owner._id, profile._id));
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading(e, false, addPopup)
    });
  e.target.reset();
  closePopup(addPopup);
}

export function handleSubmitAvatar(e) {
  e.preventDefault();
  getUserData()
    .then(profile => {
      changeAvatar(avatarInputElement.value)
        .then(user => {
          setAvatar(profileAvatar, user.avatar, user.name);
        })
        .catch(error => console.log(error));
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading(e, false, avatarPopup)
    });
  closePopup(avatarPopup);
}

function formingDoc() {
  getUserData()
    .then((profile) => {
      setDOMUserData(profile.name, profile.about, profile.avatar, profileName, profileDescription, profileAvatar, profile._id)
    })
    .catch(error => console.log(error));
  getUserData()
    .then(profile => {
      getCards()
        .then((cards) => {
          cards.forEach(card => {
            addCard(cardsContainer, createCard(card.name, card.link, card.likes.length, card._id, card.likes, card.owner._id, profile._id));
          })
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))

}

// Listeners
editButton.addEventListener('click', () => {
  setEditPopup();
  openPopup(editPopup);
});
addButton.addEventListener('click', () => openPopup(addPopup));
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
