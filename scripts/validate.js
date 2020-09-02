// поведение отдельных input'ов в форме
const showInputError = (formElement, inputElement, errorMessage, validationContext) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(validationContext.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationContext.errorClass);
};

const hideInputError = (formElement, inputElement, validationContext) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.remove(validationContext.inputErrorClass);
  errorElement.classList.remove(validationContext.errorClass);
  errorElement.textContent = '';
};

const checkInputValidState = (formElement, inputElement, validationContext  ) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationContext);
  } else {
    hideInputError(formElement, inputElement, validationContext);
  }
};

// поведение кнопки сохранения формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};


const setButtonEnable = (buttonElement, validationContext) => {
  buttonElement.classList.remove(validationContext.inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

const setButtonDisable = (buttonElement, validationContext) => {
  buttonElement.classList.add(validationContext.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

const toggleButtonState = (inputList, buttonElement, validationContext) => {
  if (hasInvalidInput(inputList)) {
    setButtonDisable(buttonElement, validationContext);
  } else {
    setButtonEnable(buttonElement, validationContext);
  }
};

//общие функции обработки событий
const setEventListeners = (formElement, validationContext) => {
  const inputList = Array.from(formElement.querySelectorAll(validationContext.inputSelector));
  const buttonElement = formElement.querySelector(validationContext.submitButtonSelector);


  // особое поведение формы после сброса:
  // даже если в полях есть ошибки валидации, мы их не показываем до первых изменений в поле
  // но и не даём делать submit
  // измененения может делать внешний скрипт
  formElement.addEventListener('reset', (event) => {
    inputList.forEach((inputElement) => {hideInputError(formElement, inputElement, validationContext);});
    setButtonDisable(buttonElement, validationContext);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidState(formElement, inputElement, validationContext);
      toggleButtonState(inputList, buttonElement, validationContext);
    });
  });
};

const enableValidation = (validationContext) => {
  const formList = Array.from(document.querySelectorAll(validationContext.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationContext);
  });
};

// Инициализация
enableValidation({
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__save-button',
  inactiveButtonClass: 'popup-form__save-button_inactive',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_active'
});
