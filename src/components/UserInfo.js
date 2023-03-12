export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(name, job) { {
      name.value = document.querySelector(".gallery__header").textContent;
      job.value = document.querySelector(".gallery__subtext").textContent;
    }
  }
}
