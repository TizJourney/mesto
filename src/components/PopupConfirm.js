import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup-form');
    this._submitHandler = submitHandler;
  }

  _submitHandlerCallback(event) {
    event.preventDefault();
    this._submitHandler(this._targetElement);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitHandlerCallback.bind(this));
  }

  open(targetElement)  {
    this._targetElement = targetElement;
    super.open();
  }
}
