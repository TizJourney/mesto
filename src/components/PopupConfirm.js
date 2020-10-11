import Popup from './Popup.js';

export default class PopupConfirm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._formElement = this._popupElement.querySelector('.popup-form');
    this._submitHandler = submitHandler;
  }

  _submitHandlerCallback(event) {
    event.preventDefault();
    this._submitHandler(this._context);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitHandlerCallback.bind(this));
  }

  open(context)  {
    this._context = context;
    super.open();
  }

  close() {
    this._context = null;
    super.close();
  }
}
