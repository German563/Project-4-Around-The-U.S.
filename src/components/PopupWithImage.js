import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
 open = ({name, link}) => {
  super.open();
  debugger
  this._popup.style = "background-image: url(" + link + " )";
  this._popup.textContent = name;
  }
}