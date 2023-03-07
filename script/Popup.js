import { closeOverlay } from "./index.js";
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this.closeIt.bind(this);
  }
  openIt() {
    document.addEventListener("keyup", this._handleEscClose);
    this._popup.classList.add("popup_opened");
    closeOverlay.classList.add("page__background_opened");
  }
  closeIt() {
    this._popup.classList.remove("popup_opened");
    closeOverlay.classList.remove("page__background_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  }
  _handleEscClose = (event) => {
    event.preventDefault();
    if (event.key === "Escape") {
      this.closeIt();
    }
  };

  setEventListener = () => {
    this._popup.addEventListener("click", (event) => {
      if (
        event.target.classList.contains(".popup") ||
        event.target.classList.contains("popup__close")
      ) {
        this.closeIt();
      }
    });
  };
}
