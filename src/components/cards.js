import { imageSpace, imageTitle, openPopup, imagePopup, closePopup } from "./modal.js";
import { setLike, deleteLike, getUserData, deleteCard } from "./api.js";
import { deletePopup, deleteButtonPopup } from "./constants.js";

const cardTemplate = document.querySelector('.card-template').content;
const cardsContainer = document.querySelector('.cards');

// card like
function toggleLike(e, cardID, likeCountEl) {
  if (e.target.classList.contains("cards__like-button_activated")) {
    deleteLike(cardID)
      .then(result => {
        e.target.classList.toggle("cards__like-button_activated");
        updateLikeCounter(likeCountEl, result.likes.length);
      })
      .catch(error => console.log(error));
  } else {
    setLike(cardID)
      .then(result => {
        e.target.classList.toggle("cards__like-button_activated");
        updateLikeCounter(likeCountEl, result.likes.length);
      })
      .catch(error => console.log(error));
  }

}

function updateLikeCounter(likeCounterElement, likeCount) {
  likeCounterElement.textContent = likeCount;
}
//card creating
function createCard(name, link, likeCount, cardID, likesList, ownerID, userID) {
  const cardElement = cardTemplate.querySelector('.cards__item').cloneNode('true');
  const cardImage = cardElement.querySelector('.cards__image');
  const cardTitle = cardElement.querySelector('.cards__title');
  const likeCountEl = cardElement.querySelector('.cards__like-counter');
  const likeButton = cardElement.querySelector('.cards__like-button');
  const deleteButton = cardElement.querySelector('.cards__delete-button');


  likesList.forEach(profile => {
    if (userID === profile._id) {
      likeButton.classList.add("cards__like-button_activated");
    }
  })
  if (ownerID !== userID) {
    deleteButton.remove()
  } else {
    deleteButton.addEventListener("click", () => {
      deleteCard(cardID)
        .then(() => cardElement.remove())
        .catch(error => console.log(error));
    })
  }
  likeCountEl.textContent = likeCount;
  likeButton.addEventListener('click', (evt) => toggleLike(evt, cardID, likeCountEl));
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

// card image show
function setImagePopup(cardImage, popupImageTitle) {
  imageSpace.setAttribute("src", cardImage);
  imageSpace.setAttribute("alt", popupImageTitle);
  imageTitle.textContent = popupImageTitle;
}

export { cardTemplate, cardsContainer, createCard, addCard, deleteCard, setImagePopup, toggleLike }
