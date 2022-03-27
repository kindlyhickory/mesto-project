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

export const popups = document.querySelectorAll(".popup");

// edit popup elements
export const editPopup = document.querySelector(".popup_edit");
export const editButton = document.querySelector(".profile__edit-button");
export const popupEditFormElement = editPopup.querySelector(".popup__data");
export const nameInput = editPopup.querySelector(".popup__name");
export const jobInput = editPopup.querySelector(".popup__famed");

//add popup elements
export const addButton = document.querySelector(".profile__add-button");
export const addPopup = document.querySelector(".popup_add");
export const popupAddFormElement = addPopup.querySelector('.popup__data');
export const placeInput = addPopup.querySelector(".popup__place-title");
export const urlInput = addPopup.querySelector(".popup__image-link");

//image popup elements
export const imagePopup = document.querySelector('.popup_image');
export const imageSpace = imagePopup.querySelector('.popup__image');
export const imageTitle = imagePopup.querySelector('.popup__image-title');

//profile elements
export const profileAvatar = document.querySelector('.profile__image');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const submitButtonSelector = '.popup__save';
export const disabledButtonClass = 'popup__save_type_inactive';
export const inputSelector = '.popup__item';

//avatar popup els
export const editAvatarButton = document.querySelector('.profile__image-container');
export const avatarPopup = document.querySelector('.popup_avatar-change')
export const popupAvatarFormELement = avatarPopup.querySelector('.popup__data');
export const avatarInputElement = avatarPopup.querySelector('.popup__avatar');
