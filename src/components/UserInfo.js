export default class UserInfo {
  constructor(titleSelector, descriptionSelector, avatarSelector, handleUserInfoInit, handleUserInfoUpdate, handleAvatarUpdate) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    this._handleUserInfoInit = handleUserInfoInit;
    this._handleUserInfoUpdate = handleUserInfoUpdate;
    this._handleAvatarUpdate = handleAvatarUpdate;
  }

  setInfo({name, avatar, about, _id}) {
    this._titleElement.textContent = name;
    this._descriptionElement.textContent = about;
    this._avatarElement.style.backgroundImage = `url("${avatar}")`
    this._userId = _id;
    this._avatar = avatar;
  }

  initUserInfoPromise() {
    return this._handleUserInfoInit()
    .then((data) => {
      this.setInfo(data);
      return Promise.resolve();
    })
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

  setUserInfoPromise(title, description) {
    return this._handleUserInfoUpdate({ name: title, about: description })
      .then((data) => {
        this.setInfo(data);
        return Promise.resolve();
      });
  }

  updateAvatarPromise(avatar) {
    return this._handleAvatarUpdate({ avatar: avatar })
      .then((data) => {
        this.setInfo(data);
        return Promise.resolve();
      })
  }
}
