import Popup from './popup.js';

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
    //todo
    return {}
  }

  setValues(values) {
    const inputEvent = new CustomEvent('input');
    for (let name in values) {
      const input = this._formInputs[name];
      input.value = values[name];
      input.dispatchEvent(inputEvent);
    }
  }

  setEventListeners() {
    super.setEventListeners();
    //todo: добавить обработчик формы
  }

  close()  {
    this._formElement.reset();
    super.close();
  }
}
