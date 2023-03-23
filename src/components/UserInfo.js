export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent
    };
  }
getAvatarInfo() {
  return {avatar: this._avatarElement.textContent}
}
  setUserInfo({ name, title}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = title;
  }
  setAvatar({avatar}) {
    this._avatarElement.textContent = avatar;
  }
}
