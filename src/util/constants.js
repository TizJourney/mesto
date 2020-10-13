// переменные блока profile
const profileElement = document.querySelector('.profile');
export const profileElementEditButton = profileElement.querySelector('.profile__edit-button');
export const profileAddButton = profileElement.querySelector('.profile__add-button')
export const profileEditAvatar = profileElement.querySelector('.profile__avatar')

// селекторы для валидации форм
export const defaultFormSelectors = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-button',
  inactiveButtonClass: 'popup-form__save-button_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
}

// параметры запросов по сети
export const apiBaseUrl = 'https://mesto.nomoreparties.co/v1/cohort-16/';
export const apiToken = 'adb6c92a-f083-4346-8ae1-e127bac171f9';
