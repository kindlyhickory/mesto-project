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
    setImagePopup(cardElement);
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
function setImagePopup(card) {
  const cardImage = card.querySelector('.cards__image');
  const popupImageTitle = card.querySelector(".cards__title");
  imageSpace.setAttribute("src", cardImage.src);
  imageSpace.setAttribute("alt", popupImageTitle.textContent);
  imageTitle.textContent = popupImageTitle.textContent;
}


export { cardTemplate, cardsContainer, createCard, addCard, deleteCard, setImagePopup, toggleLike }
