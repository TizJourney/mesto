export default class imageContext {
  constructor({name, link}) {
    this._link = link;
    this._name = name;
  }

  setImageContext(imageElement, titleElement) {
    imageElement.src = this._link;
    imageElement.alt = `Изображение места ${this._name}`;
    titleElement.textContent = this._name;
  }
}
