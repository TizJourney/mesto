export default class UserInfo {
  constructor(titleSelector, descriptionSelector, avatarSelector, handleUserInfoUpdate, handleAvatarUpdate) {
    this._titleElement = document.querySelector(titleSelector);
    this._descriptionElement = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._request = new Request('users/me');

    this._handleUserInfoUpdate = handleUserInfoUpdate;
    this._handleAvatarUpdate = handleAvatarUpdate;

    this._apiObject = new Api();
    this._popupErrorObject = new PopupError();
  }

  _setInfo({name, avatar, about, _id}) {
    this._titleElement.textContent = name;
    this._descriptionElement.textContent = about;
    this._avatarElement.style.backgroundImage = `url("${avatar}")`
    this._userId = _id;
    this._avatar = avatar;
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
      this._titleElement.textContent,
      this._descriptionElement.textContent
    ]
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
        this._setInfo(data);
        return Promise.resolve();
      });
  }

  updateAvatarPromise(avatar) {
    return this._handleAvatarUpdate({ avatar: avatar })
      .then((data) => {
        this._setInfo(data);
        return Promise.resolve();
      })
  }
}
