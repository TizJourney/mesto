import Popup from './popup.js';
import imageContext from './imageContext.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageContextObject = new imageContext(this._popupElement, '.fullsize-image__picture', '.fullsize-image__caption');
  }

  open(data) {
    super.open();
    this._imageContextObject.set(data);
  }
}
