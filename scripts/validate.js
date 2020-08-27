// поведение отдельных input'ов в форме
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup-form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.classList.remove('popup-form__input-error_active');
  errorElement.textContent = '';
};

const checkInputValidState = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// поведение кнопки сохранения формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup-form__save-button_inactive');
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove('popup-form__save-button_inactive');
    buttonElement.removeAttribute('disabled');
  }
};

//общие функции обработки событий
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup-form__input'));
  const buttonElement = formElement.querySelector('.popup-form__save-button');

  formElement.addEventListener("visibilitychange", function() {
    if (formElement.visibilityState === 'visible') {
      toggleButtonState(inputList, buttonElement);
    }
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidState(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup-form'));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// Инициализация
enableValidation();

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
