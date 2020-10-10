import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._imageElement = this._popupElement.querySelector('.fullsize-image__picture');
    this._titleElement = this._popupElement.querySelector('.fullsize-image__caption');
  }

  open({name, link}) {
    super.open();
    this._imageElement.src = link;
    this._imageElement.alt = `Изображение места ${name}`;
    this._titleElement.textContent = name;
  }
}
