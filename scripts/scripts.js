import { initialCards } from './constants.js';

// Elements

// EditElements
const editPopup = document.querySelector(".popup_edit");
const editButton = document.querySelector(".profile__edit-button");
const closeEditButton = editPopup.querySelector(".popup__close-button");
const popupEditFormElement = editPopup.querySelector(".popup__data");
const popupEditItems = editPopup.querySelectorAll('.popup__item');
const nameInput = popupEditItems[0];
const jobInput = popupEditItems[1];

//AddElements
const addButton = document.querySelector(".profile__add-button");
const addPopup = document.querySelector(".popup_add");
const closeAddButton = addPopup.querySelector(".popup__close-button")
const popupAddFormElement = addPopup.querySelector('.popup__data');
const popupAddItems = addPopup.querySelectorAll('.popup__item');
const placeInput = popupAddItems[0];
const urlInput = popupAddItems[1];


//profile elements
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

//card template
const cardTemplate = document.querySelector('.card-template').content;
const cardsContainer = document.querySelector('.cards');

//image popup
const imagePopup = document.querySelector('.popup_image');
const closeImageButton = imagePopup.querySelector('.popup__close-button');


// Listeners
document.addEventListener("DOMContentLoaded", () => docReady(initialCards));
editButton.addEventListener('click', openEditPopup);
addButton.addEventListener('click', openAddPopup);

popupEditFormElement.addEventListener('submit', handleSubmit);
popupAddFormElement.addEventListener('submit', handleSubmitAdding);

//Html loaded
function docReady([...cards]) {
  cards.forEach(card => {
    collectAndAddCard(card);
  })
}


// cards_adding
function collectAndAddCard(card) {
    const cardElement = cardTemplate.querySelector('.cards__item').cloneNode('true');
    const cardLink = cardElement.querySelector('.cards__image');
    const cardTitle = cardElement.querySelector('.cards__title');
    cardElement.querySelector('.cards__like-button').addEventListener('click', toggleLike);
    cardElement.querySelector('.cards__delete-button').addEventListener('click', () => deleteCard(cardElement));
    cardElement.querySelector('.cards__image').addEventListener('click', () => openImagePopup(cardElement));
    cardLink.setAttribute("src", `${card.link}`);
    cardLink.setAttribute("alt", `${card.name}`);
    cardTitle.textContent = card.name
    cardsContainer.prepend(cardElement);
}

// cards deleting
function deleteCard(card) {
  card.removeEventListener('click', toggleLike);
  card.removeEventListener('click', () => deleteCard(card))
  card.remove();
}

// card image show
function openImagePopup(card){
  closeImageButton.addEventListener('click', closeImagePopup);
  const imageSpace = imagePopup.querySelector('.popup__image');
  const imageTitle = imagePopup.querySelector('.popup__image-title');
  imageSpace.setAttribute("src", `${card.querySelector('.cards__image').src}`)
  imageTitle.textContent = card.querySelector('.cards__title').textContent;
  imagePopup.classList.add('popup_opened');
}

// card image close
function closeImagePopup() {
  imagePopup.classList.remove('popup_opened');
  closeImageButton.removeEventListener('click', closeImagePopup);
}


// POPUP
// Open edit popup
function openEditPopup() {
  editButton.removeEventListener('click', openEditPopup)
  closeEditButton.addEventListener('click', closeEditPopup);
  nameInput.setAttribute("value", `${profileName.textContent}`)
  jobInput.setAttribute("value", `${profileDescription.textContent}`)
  editPopup.classList.add("popup_opened");
}



// Close edit popup
function closeEditPopup() {
  editButton.addEventListener('click', openEditPopup);
  closeEditButton.removeEventListener('click', closeEditPopup);
  editPopup.classList.remove("popup_opened");
}

// open add popup
function openAddPopup() {
  addButton.removeEventListener('click', openAddPopup);
  closeAddButton.addEventListener('click', closeAddPopup);
  addPopup.classList.add("popup_opened");
}

// close add popup
function closeAddPopup() {
  addButton.addEventListener('click', openAddPopup);
  closeAddButton.removeEventListener('click', closeAddPopup);
  addPopup.classList.remove("popup_opened");
}

//Edit form -> changing profile
function handleSubmit(e) {
  e.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeEditPopup();
}


// handle add form submit
function handleSubmitAdding(e){
  e.preventDefault();
  collectAndAddCard({name: placeInput.value, link: urlInput.value});
  placeInput.value = "";
  urlInput.value = "";
  closeAddPopup();
}


// card likes
function toggleLike(e) {
  e.target.classList.toggle("cards__like-button_activated");
}
