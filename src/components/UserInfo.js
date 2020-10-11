import Api from './Api.js';

export default class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    this.titleElement = document.querySelector(titleSelector);
    this.descriptionElement = document.querySelector(descriptionSelector);
    this._apiObject = new Api();
    this._request = new Request('users/me');
  }

  _setInfo({name, avatar, about, _id}) {
    this.titleElement.textContent = name;
    this.descriptionElement.textContent = about;
    this._userId = _id;
  }

  initUserInfoPromise() {
    return this._apiObject.getUserInfoPromise()
    .then((data) => {
      this._setInfo(data);
      return Promise.resolve();
    })
  }

  getUserInfo() {
    return [
      this.titleElement.textContent,
      this.descriptionElement.textContent
    ]
  }

  getUserId() {
    return this._userId;
  }

  setUserInfoPromise(title, description) {
    return this._apiObject.updateUserInfoPromise({ name: title, about: description })
      .then((data) => { this._setInfo(data); })
      .catch((err) => { console.log(err); })
  }
}
