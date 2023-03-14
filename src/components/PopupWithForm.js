import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._inputSelector = ".popup__input";
  }

  getInputValues() {
    const inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    const values = {};
    inputs.forEach((input) => {
      if (input.name) {
        values[input.name] = input.value;
      }
    });
    return values;
  }

  setEventListener() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formValues = this.getInputValues();
      this._submitCallback(formValues);
      this.close();
    });
    super.setEventListener();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
