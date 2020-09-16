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
