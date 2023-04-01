export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeOverlay = document.querySelector(".page__background");
  }

  open() {
    document.addEventListener("keyup", this._handleEscClose);

    this._popup.classList.add("popup_opened");

    this._closeOverlay.classList.add("page__background_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");

    this._closeOverlay.classList.remove("page__background_opened");

    document.removeEventListener("keyup", this._handleEscClose);
  }

  _handleEscClose = (event) => {
    event.preventDefault();

    if (event.key === "Escape") {
      this.close();
    }
  };

  setEventListener() {
    this._closeOverlay.addEventListener(
      "click",
      this._handlecloseOverlay.bind(this)
    );

    this._popup.addEventListener("mousedown", (event) => {
      if (
        event.target.classList.contains(".popup") ||
        event.target.classList.contains("popup__close")
      ) {
        this.close();
      }
    });
  }

  _handlecloseOverlay = () => {
    this.close();
  };
}
