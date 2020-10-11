import Api from './Api.js';

export default class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    this.titleElement = document.querySelector(titleSelector);
    this.descriptionElement = document.querySelector(descriptionSelector);
    this._apiObject = new Api();
    this._request = new Request('users/me');
  }

  _setInfo({name, avatar, about}) {
    this.titleElement.textContent = name;
    this.descriptionElement.textContent = about;
  }

  initUserInfoPromise() {
    return this._apiObject.getUserInfoPromise()
    .then((data) => { this._setInfo(data); })
  }

  getUserInfo() {
    return [
      this.titleElement.textContent,
      this.descriptionElement.textContent
    ]
  }

  setUserInfoPromise(title, description) {
    return this._apiObject.updateUserInfoPromise({ name: title, about: description })
      .then((data) => { this._setInfo(data); })
      .catch((err) => { console.log(err); })
  }
}
