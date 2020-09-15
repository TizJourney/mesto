export class Popup {
  constructor(element) {
    this._element = element;
  }

  _hidePopupCallback(event) {
    const activePopup = document.querySelector('.popup_opened');
    if (event.key === 'Escape') {
      this.hide();
    }
  }

  _handleClosePopupOnClick(event) {
    if (
      event.target.classList.contains('popup__close-button') ||
      event.target.classList.contains('popup__overlay')
    ) {
      this.hide();
    }
  }

  show() {
    this._element.classList.add('popup_opened');
    this._element.addEventListener('click', this._handleClosePopupOnClick);
    document.addEventListener('keydown', this._hidePopupCallback);
  }

  hide() {
    this._element.classList.remove('popup_opened');
    this._element.removeEventListener('click', this._handleClosePopupOnClick);
    document.removeEventListener('keydown', this._hidePopupCallback);
  }
}
