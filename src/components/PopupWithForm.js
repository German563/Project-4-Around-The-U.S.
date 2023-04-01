import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".popup__form");
    this._button = this._popup.querySelector('button[type="submit"]');
    this._buttonText = this._button.textContent;
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
      this._button.textContent = "Saving...";
      debugger;
      const formValues = this.getInputValues();
      const submitPromise = this._submitCallback(formValues);
      if (!submitPromise || typeof submitPromise.then !== "function") {
        return;
      }
      submitPromise
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        })
        .finally(() => {
          this._button.textContent = this._buttonText;
        });
    });

    super.setEventListener();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
