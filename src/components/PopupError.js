export default class PopupError {
  constructor() {
    this._popupElement = document.querySelector('.popup-error');
    this._textElement = this._popupElement.querySelector('.popup-error__message');

    this._timeout = 10000;
  }


  _close() {
    this._textElement.textContent = '';
    this._popupElement.classList.remove('popup-error_active');
  }

  show(errorText) {
    this._textElement.textContent = errorText;
    this._popupElement.classList.add('popup-error_active');
    setTimeout(this._close.bind(this), this._timeout);
  }
}
