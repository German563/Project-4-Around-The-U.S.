import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
  }

  _getInputValues() {
    const inputs = Array.from(this._form.inputSelector);
    const values = {};
    inputs.forEach((input) => {
      if (input.name) {
        values[input.name] = input.value;
      }
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const formValues = this._getInputValues();
      this._submitCallback(formValues);
      this.closeIt();
    });
  }

  closeIt() {
    super.closeIt();
    this._form.reset();
  }
}
