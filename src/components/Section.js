export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  clear() {
    this._containerElement.innerHTML = '';
  }

  setItems(items) {
    this._items = items;
  }

  renderItems() {
    this.clear();
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerElement.prepend(element);
  }
}
