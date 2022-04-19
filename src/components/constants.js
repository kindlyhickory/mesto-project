export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-8',
  headers: {
    authorization: 'c89b1818-4cda-41d9-880f-b53f0e3aae65',
    'Content-type': 'application/json'
  }
}


 export const processedForms = {}
 export const formSelectors = {
  formSelector: '.popup__data',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save',
  disabledButtonClass: 'popup__save_type_inactive',
  inputInvalidClass: '.popup__item_type_active',
  errorActiveClass: '.form__input-error_active',
  errorClass: 'popup__input-error',
}

 export const cardTemplate = ".card-template";

 export const editButton = document.querySelector(".profile__edit-button");
 export const addButton = document.querySelector(".profile__add-button");
 export const editAvatarButton = document.querySelector(
   ".profile__image-container"
 );

 const editPopup = document.querySelector(".popup_edit");
 export const nameInput = editPopup.querySelector(".popup__name");
 export const jobInput = editPopup.querySelector(".popup__famed");


 export const profileAvatar = document.querySelector('.profile__image');
 export const profileName = document.querySelector('.profile__name');
 export const profileDescription = document.querySelector('.profile__description');


