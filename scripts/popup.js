export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  _handleClosePopupOnClick(event) {
    if (
      event.target.classList.contains('popup__close-button') ||
      event.target.classList.contains('popup__overlay')
    ) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleClosePopupOnClick.bind(this));
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  removeEventListener() {
    this._popupElement.removeEventListener('click', this._handleClosePopupOnClick);
    document.removeEventListener('keydown', this._handleEscClose);
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    this.setEventListeners()
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    this.removeEventListener();
  }
}
