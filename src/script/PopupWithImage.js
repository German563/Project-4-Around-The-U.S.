import { closeOverlay } from "./index.js";
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  openIt() {
    
    document.addEventListener("keyup", this._handleEscClose);
    this._popup.classList.add("popup_opened");
    closeOverlay.classList.add("page__background_opened");
   
  }
}
