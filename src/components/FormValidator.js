export default class FormValidator {
  constructor(
    selectors,
    element
  ) {
    this._formSelector = selectors.formSelector;
    this._inputSelector = selectors.inputSelector;
    this._submitButtonSelector = selectors.submitButtonSelector;
    this._inactiveButtonClass = selectors.inactiveButtonClass;
    this._inputErrorClass = selectors.inputErrorClass;
    this._errorClass = selectors.errorClass;

    this._element = element;
  }

  // поведение отдельных input'ов в форме
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidState(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // поведение кнопки сохранения формы
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _setButtonEnable(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  _setButtonDisable(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._setButtonDisable(buttonElement);
    } else {
      this._setButtonEnable(buttonElement);
    }
  };

  //общие функции обработки событий
  _setEventListeners() {
    const inputList = Array.from(this._element.querySelectorAll(this._inputSelector));
    const buttonElement = this._element.querySelector(this._submitButtonSelector);

    // особое поведение формы после сброса:
    // даже если в полях есть ошибки валидации, мы их не показываем до первых изменений в поле
    // но и не даём делать submit
    // измененения может делать внешний скрипт
    this._element.addEventListener('reset', (event) => {
      inputList.forEach((inputElement) => { this._hideInputError(this._element, inputElement); });
      this._setButtonDisable(buttonElement);
    });

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidState(this._element, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation() {
    this._element.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
