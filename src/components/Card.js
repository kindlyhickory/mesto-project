


export class Card {
  constructor(cardFromServer, userId, template, api, popupWithImage) {
    this._card = cardFromServer;
    this._userId = userId;
    this._template = template;
    this._api = api;
    this._popupWithImage = popupWithImage;
  }

  _getElement() {
    return document
      .querySelector(this._template)
      .content.querySelector(".cards__item")
      .cloneNode("true");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", (evt) =>
      this._toggleLike(evt, this._card._id, this._likeCountEl)
    );

    if (this._card.owner._id == this._userId) {
      this._deleteButton.addEventListener("click", () => {
        this._api
          .deleteCard(this._card._id)
          .then(() => this._element.remove())
          .catch((error) => console.log(error));
      });
    }

     this._cardImage.addEventListener("click", () => {
       this._popupWithImage.open(
         this._cardImage.src,
         this._cardTitle.textContent
       );
     });

  }

  generate() {
    this._element = this._getElement();
    this._cardImage = this._element.querySelector(".cards__image");
    this._cardTitle = this._element.querySelector(".cards__title");
    this._likeCountEl = this._element.querySelector(".cards__like-counter");
    this._likeButton = this._element.querySelector(".cards__like-button");
    this._deleteButton = this._element.querySelector(".cards__delete-button");

    this._card.likes.forEach((profile) => {
      if (this._userId === profile._id) {
        this._likeButton.classList.add("cards__like-button_activated");
      }
    });

    if (this._card.owner._id !== this._userId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();
    this._likeCountEl.textContent = this._card.likes.length;


    this._cardImage.setAttribute("src", this._card.link);
    this._cardImage.setAttribute("alt", this._card.name);
    this._cardTitle.textContent = this._card.name;
    return this._element;
  }

  _toggleLike(e, cardID, likeCountEl) {
    if (e.target.classList.contains("cards__like-button_activated")) {
      this._api
        .deleteLike(cardID)
        .then((result) => {
          e.target.classList.toggle("cards__like-button_activated");
          this._updateLikeCounter(likeCountEl, result.likes.length);
        })
        .catch((error) => console.log(error));
    } else {
      this._api
        .setLike(cardID)
        .then((result) => {
          e.target.classList.toggle("cards__like-button_activated");
          this._updateLikeCounter(likeCountEl, result.likes.length);
        })
        .catch((error) => console.log(error));
    }
  }

  _updateLikeCounter(likeCounterElement, likeCount) {
    likeCounterElement.textContent = likeCount;
  }
}



