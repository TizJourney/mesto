class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  clear() {
    this._containerElement.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._items.forEach((item) => {
      const element = renderer(item);
      this._containerElement.append(element);
    });
  }

  addItem(element) {
    this._containerElement.append(element);
  }
}
