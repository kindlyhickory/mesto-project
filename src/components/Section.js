
export default class Section {
  constructor({ renderer }, selector) {
    this._rendenderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    const card = this._rendenderer(element);
    this._container.prepend(card);
  }

  renderItems(items) {
    items.forEach(item => {
      this.addItem(item);
    })
  }
}
