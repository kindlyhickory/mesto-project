export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  _updateUserInfo(user) {
    this.avatar = user.avatar;
    this.name = user.name;
    this.id = user._id;
    this.profession = user.about;
  }

  getUserInfo(getUserInfoApi) {
    return getUserInfoApi()
      .then(user => {
        this._updateUserInfo(user)
        return Promise.resolve(user);
      })
  }
  setUserInfo(user, setUserInfoApi) {
    return setUserInfoApi(user.input_name, user.famed_by).then((user) => {
      this._updateUserInfo(user);
      this._avatar.src = user.avatar;
      this._name.textContent = user.name;
      this._about.textContent = user.about;
      return Promise.resolve(user);
    });
  }
}
