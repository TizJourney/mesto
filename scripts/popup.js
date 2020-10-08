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

function hidePopupCallback(event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    hidePopup(activePopup);
  }
}

function handleClosePopupOnClick(event) {
  if (
    event.target.classList.contains('popup__close-button') ||
    event.target.classList.contains('popup__overlay')
  ) {
    const popupElement = event.target.closest('.popup');
    hidePopup(popupElement);
  }
}

export function showPopup(element) {
  element.classList.add('popup_opened');
  element.addEventListener('click', handleClosePopupOnClick);
  document.addEventListener('keydown', hidePopupCallback);
}

export function hidePopup(element) {
  element.classList.remove('popup_opened');
  element.removeEventListener('click', handleClosePopupOnClick);
  document.removeEventListener('keydown', hidePopupCallback);
}
