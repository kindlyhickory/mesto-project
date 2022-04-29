export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = null;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      id: this._id,
    };
  }
  setUserInfo(user) {
      this._name.textContent = user.name;
      this._about.textContent = user.about;
  }

  setAvatar(user) {
    this._avatar.src = user.avatar;
  }

  setId(user) {
    this._id = user._id;
  }
}
