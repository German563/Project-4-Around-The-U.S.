export default class Card {
  constructor({ name, link, cardTemplate }) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;

    this._element = this._getTemplate();
    this._cardLinkTitle = this._element.querySelector(".card__ellipsis");
    this._cardLinkInput = this._element.querySelector(".card__image");

    this._cardLinkTitle.textContent = this._name;
    this._cardLinkInput.src = this._link;
    this._cardLinkInput.alt = `Photo of ${this._name}`;

    this._heartButton = this._element.querySelector("#heart");
    this._heartButton.addEventListener("click", this._toggleLike.bind(this));

    this._newCardLinkTitle = document.querySelector(".popup__title-foto");

    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._closeButton = this._element.querySelector("#closeButtonFoto");
    this._deleteButton.addEventListener(
      "click",
      this._handleDeleteClick.bind(this)
    );
    this._cardLinkInput.addEventListener("click", this._openBigImg.bind(this));
  }

  _getTemplate() {
    return this._cardTemplate.cloneNode(true);
  }

  _toggleLike() {
    this._heartButton.classList.toggle("card__background_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _closeModalImage() {
    const bigImg = document.querySelector(".popup_type_foto");
    bigImg.classList.remove("popup_opened");
  }
  _openBigImg(e) {
    const bigImg = document.querySelector(".popup_type_foto");
    bigImg.classList.add("popup_opened");
    closeOverlay.classList.add("page__background_opened");
    document.addEventListener("keydown", closeModalByEscape);
    closeOverlay.addEventListener("mousedown", closeModalOnRemoteClick);
    bigImg.style = "background-image: url(" + this._cardLinkInput.src + " )";
    this._newCardLinkTitle.textContent = this._name;
  }

  getElement() {
    return this._element;
  }
}
