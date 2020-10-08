import Popup from './popup';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.fullsize-image');
  }

  open({picture, caption}) {
    super.open();
    this._imageElement.src = picture;
    this._imageElement.alt = `Изображение места ${caption}`;
    this._imageElement.textContent = caption;
  }
}
