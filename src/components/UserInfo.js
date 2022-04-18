export default class UserInfo {
    constructor({nameSelector, aboutSelector}) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    }

    getUserInfo(getUserInfoApi) {
        return getUserInfoApi()
                .then(user => {
                    return Promise.resolve(user);              
                })
    }

    setUserInfo(user, setUserInfoApi) {
        return setUserInfoApi(user.name, user.famed_by)
            .then(user => {
                this._name.textContent = user.name;
                this._about.textContent = user.about;
                return Promise.resolve(user)
            })
    }
     
}