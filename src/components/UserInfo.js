import Request from './Request.js';

export default class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    this.titleElement = document.querySelector(titleSelector);
    this.descriptionElement = document.querySelector(descriptionSelector);
    this._request = new Request('users/me');
  }

  initUserInfo() {
    this._request.get().then(({ name, avatar, about }) => {
      this.setUserInfo(name, about);
    })
  }

  getUserInfo() {
    return [
      this.titleElement.textContent,
      this.descriptionElement.textContent
    ]
  }

  setUserInfo(title, description) {
    this._request.patch({ name: title, about: description })
      .then(({ name, about }) => {
        this.titleElement.textContent = name;
        this.descriptionElement.textContent = about;
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
