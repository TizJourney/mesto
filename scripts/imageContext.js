export default class imageContext {
  constructor(parentElement, imageSelector, titleSelector) {
    this._imageElement = parentElement.querySelector(imageSelector);
    this._titleElement = parentElement.querySelector(titleSelector)

  }

  set({ link, name }) {
    this._imageElement.src = link;
    this._imageElement.alt = `Изображение места ${name}`;
    this._titleElement.textContent = name;
  }
}
