import Popup from "../components/Popup.js";

export default class PopupWithSubmit extends Popup {
    setAction(action) {
        this._submitCallback = action
    }

setEventListener () {
    this._popup.addEventListener("submit", (e) => {
        e.preventDefault();
        this._submitCallback();
    });
    super.setEventListener();
}
}