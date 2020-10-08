export default class Popup {
  constructor(popupSelector) {
    self._popupElement = document.querySelector(popupSelector);
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
    self._popupElement.addEventListener('click', this._handleEscClose.bind(this));
    self._popupElement.addEventListener('keydown', this._handleClosePopupOnClick.bind(this));
  }

  removeEventListener() {
    self._popupElement.removeEventListener('click', this._handleEscClose);
    self._popupElement.removeEventListener('keydown', this._handleClosePopupOnClick);
  }

  open() {
    self._popupElement.classList.add('popup_opened');
    this.setEventListeners()
  }

  close() {
    self._popupElement.classList.remove('popup_opened');
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
