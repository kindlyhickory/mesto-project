

export default class Section {
  constructor({items,renderer},selector) {
    this._cards = items;
    this._rendenderer = renderer;
    this._container = document.querySelector(selector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._cards.forEach(card => {
      this._rendenderer(card);
    })
  }
}
