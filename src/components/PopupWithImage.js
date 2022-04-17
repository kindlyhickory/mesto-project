import Popup from "./modal.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._imageSpace = this._popup.querySelector(".popup__image");
    this._imageTitle = this._popup.querySelector(".popup__image-title");
  }

  open(cardImage, popupImageTitle) {
    super.open();
    this._imageSpace.setAttribute("src", cardImage);
    this._imageSpace.setAttribute("alt", popupImageTitle);
    this._imageTitle.textContent = popupImageTitle;
  }
}
