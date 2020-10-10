import Popup from './Popup.js';
import ImageContext from './ImageContext.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageContextObject = new ImageContext(this._popupElement, '.fullsize-image__picture', '.fullsize-image__caption');
  }

  open(data) {
    super.open();
    this._imageContextObject.set(data);
  }
}
