export default class UserInfo {
  constructor(titleSelector, descriptionSelector) {
    this.titleElement = document.querySelector(titleSelector);
    this.descriptionElement = document.querySelector(descriptionSelector);
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
