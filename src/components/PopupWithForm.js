import Popup from "./modal.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, submitCalback }) {
    super(selector);
    this._calback = submitCalback;
    this._form = this._popup.querySelector(".popup__data");
  }

  _getInputValues() {
    const inputArr = Array.from(this._popup.querySelectorAll(".popup__item"));
    return inputArr.reduce((priv, input) => {
      return { ...priv, [input.name]: input.value };
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._calback(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
