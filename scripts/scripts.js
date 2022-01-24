import { initialCards } from './constants.js';

// Elements

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

//card template
const cardTemplate = document.querySelector('.card-template').content;
const cardsContainer = document.querySelector('.cards');



//Html loaded
function docReady([...cards]) {
  cards.forEach(card => {
    addCard(cardsContainer, createCard(card.name, card.link));
  })
}

//card creating
function createCard(name, link){
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode('true');
  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  cardElement.querySelector('.cards__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.cards__delete-button').addEventListener('click', () => deleteCard(cardElement));
  cardElement.querySelector('.cards__image').addEventListener('click', () => {
    setImagePopup(cardElement);
    openPopup(imagePopup);
  });
  cardImage.setAttribute(src", link);
  cardImage.setAttribute("alt", name);
  cardTitle.textContent = name;
  return cardElement;
}


// cards_adding
function addCard(container, cardElement) {
    container.prepend(cardElement);
}

// cards deleting
function deleteCard(card) {
  card.removeEventListener('click', toggleLike);
  card.removeEventListener('click', () => deleteCard(card))
  card.remove();
}

// card image show
function setImagePopup(card){
  const cardImage = card.querySelector('.cards__image');
  const popupImageTitle = card.querySelector(".cards__title");
  imageSpace.setAttribute("src", cardImage.src);
  imageSpace.setAttribute("alt", popupImageTitle.textContent);
  imageTitle.textContent = popupImageTitle.textContent;
}

// POPUP
//popup open
function openPopup(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.addEventListener("click", () => closePopup(popup));
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  const closeButton = popup.querySelector('.popup__close-button');
  closeButton.removeEventListener("click", () => closePopup(popup));
  popup.classList.remove('popup_opened');
}

// Set edit popup
function setEditPopup() {
  nameInput.setAttribute("value",profileName.textContent);
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
function handleSubmitAdding(e){
  e.preventDefault();
  addCard(cardsContainer,createCard(placeInput.value, urlInput.value));
  e.target.reset();
  closePopup(addPopup);
}


// card likes
function toggleLike(e) {
  e.target.classList.toggle("cards__like-button_activated");
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
document.addEventListener("DOMContentLoaded", () => docReady(initialCards));
