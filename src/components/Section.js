export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._containerElement = document.querySelector(containerSelector);
  }

  clear() {
    this._containerElement.innerHTML = '';
  }

  renderItems(items) {
    this.clear();
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._containerElement.append(element);
  }
}
