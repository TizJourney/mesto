export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);

    this._handleEscClose = ((event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    }).bind(this);
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
  }

  open() {
    this._popupElement.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }
}
