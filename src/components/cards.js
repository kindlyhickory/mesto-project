import { imageSpace, imageTitle, openPopup, imagePopup } from "./modal.js";

const cardTemplate = document.querySelector('.card-template').content;
const cardsContainer = document.querySelector('.cards');

// card like
function toggleLike(e) {
  e.target.classList.toggle("cards__like-button_activated");
}

//card creating
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode('true');
  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  cardElement.querySelector('.cards__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.cards__delete-button').addEventListener('click', () => deleteCard(cardElement));
  cardElement.querySelector('.cards__image').addEventListener('click', () => {
    setImagePopup(cardImage.src, cardTitle.textContent);
    openPopup(imagePopup);
  });
  cardImage.setAttribute("src", link);
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
function setImagePopup(cardImage, popupImageTitle) {
  imageSpace.setAttribute("src", cardImage);
  imageSpace.setAttribute("alt", popupImageTitle);
  imageTitle.textContent = popupImageTitle;
}


export { cardTemplate, cardsContainer, createCard, addCard, deleteCard, setImagePopup, toggleLike }
