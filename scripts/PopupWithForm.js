import Popup from './popup';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector);
    this._submitHandler = submitHandler;
    this._formElement = this.form[0];
  }

  _getInputValues() {
    //todo
    return {}
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
