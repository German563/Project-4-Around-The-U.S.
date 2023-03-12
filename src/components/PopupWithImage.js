import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }
 open = ({name, link}) => {
  super.open();
  this._newCardLinkTitle = document.querySelector(".popup__title-foto");
  
  this._popup.style = "background-image: url(" + link + " )";
  this._newCardLinkTitle.textContent = name;
  }
}