import Request from './Request.js';

export default class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    this.titleElement = document.querySelector(titleSelector);
    this.descriptionElement = document.querySelector(descriptionSelector);
  }

  initUserInfo() {
    const request = new Request('users/me');
    request.get().then(({name, avatar, about}) => {
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
    this.titleElement.textContent = title;
    this.descriptionElement.textContent = description;
  }
}
