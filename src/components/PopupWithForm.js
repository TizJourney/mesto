import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this._popupElement.querySelector('.popup-form');
    const allInputs = Array.from(this._formElement.querySelectorAll('.popup-form__input'));
    this._formInputs = allInputs.reduce((dict, el) => {
      dict[el.name] = el;
      return dict;
    }, {} );
  }

  _getInputValues() {
    return Object.values(this._formInputs).reduce((dict, el) => {
      dict[el.name] = el.value;
      return dict;
    }, {});
  }

  setValues(values) {
    const inputEvent = new CustomEvent('input');
    for (const name in values) {
      const input = this._formInputs[name];
      input.value = values[name];
      input.dispatchEvent(inputEvent);
    }
  }

  _submitHandlerCallback(event) {
    event.preventDefault();
    this._submitHandler(this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitHandlerCallback.bind(this));
  }

  close()  {
    this._formElement.reset();
    super.close();
  }
}
