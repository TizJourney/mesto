export default class UserInfo {
  constructor(titleSelector, descriptionSelector, avatarSelector) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  setInfo({name, avatar, about, _id}) {
    this._titleElement.textContent = name;
    this._descriptionElement.textContent = about;
    this._avatarElement.style.backgroundImage = `url("${avatar}")`
    this._userId = _id;
    this._avatar = avatar;
  }

  getUserInfo() {
    return {
      name: this._titleElement.textContent,
      avatar: this._avatar,
      about: this._descriptionElement.textContent,
      _id: this._userId,
    }
  }

  getAvatar() {
    return this._avatar;
  }

  getUserId() {
    return this._userId;
  }
}
