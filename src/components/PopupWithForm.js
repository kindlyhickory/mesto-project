import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, submitCalback }) {
    super(selector);
    this._calback = submitCalback;
    this.form = this._popup.querySelector(".popup__data");
    this._inputArr = Array.from(this._popup.querySelectorAll(".popup__item"));
    this._sendButton = this._popup.querySelector(".popup__save");
  }

  _getInputValues() {
    return this._inputArr.reduce((priv, input) => {
      return { ...priv, [input.name]: input.value };
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._calback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this.form.reset();
  }

  renderLoading( isLoading, buttonText = "Сохранить") {

  if (isLoading) {
    this._sendButton.textContent = "Сохранение...";
  } else {
    this._sendButton.textContent = buttonText;
  }
}
}
