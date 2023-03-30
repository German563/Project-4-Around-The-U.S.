import Popup from "./Popup.js";
import renderLoading from "../pages/index.js";
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
      renderLoading(true);
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
          renderLoading(false);
        });
    });

    super.setEventListener();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
