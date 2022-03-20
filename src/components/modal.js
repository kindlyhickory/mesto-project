import { addCard, cardsContainer, createCard } from "./cards.js";

// edit popup elements
const editPopup = document.querySelector(".popup_edit");
const editButton = document.querySelector(".profile__edit-button");
const popupEditFormElement = editPopup.querySelector(".popup__data");
const nameInput = editPopup.querySelector(".popup__name");
const jobInput = editPopup.querySelector(".popup__famed");

//add popup elements
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_add");
const popupAddFormElement = addPopup.querySelector('.popup__data');
const placeInput = addPopup.querySelector(".popup__place-title");
const urlInput = addPopup.querySelector(".popup__image-link");

//image popup elements
const imagePopup = document.querySelector('.popup_image');
const imageSpace = imagePopup.querySelector('.popup__image');
const imageTitle = imagePopup.querySelector('.popup__image-title');

//profile elements
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

function handleEscape(evt) {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === "Escape") {
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

// Set edit popup
function setEditPopup() {
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", profileDescription.textContent);
}

//Edit form -> changing profile
function handleSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closePopup(editPopup);
}


// handle add form submit
function handleSubmitAdding(e) {
  e.preventDefault();
  addCard(cardsContainer, createCard(placeInput.value, urlInput.value));
  e.target.reset();
  closePopup(addPopup);
}

export {
  editPopup, editButton, popupEditFormElement, nameInput, jobInput, addButton, addPopup, popupAddFormElement, placeInput, urlInput, imagePopup, imageSpace,
  imageTitle, openPopup, closePopup, setEditPopup, profileName, profileDescription, handleSubmitAdding, handleSubmit
}
