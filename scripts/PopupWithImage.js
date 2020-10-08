import Popup from './popup.js';
import imageContext from './imageContext.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popupElement.querySelector('.fullsize-image__picture');
    this._captionElement = this._popupElement.querySelector('.fullsize-image__caption')
  }

  open(data) {
    super.open();
    const imageContextObject = new imageContext(data);
    imageContextObject.setImageContext(this._imageElement, this._captionElement);
  }
}
