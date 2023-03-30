import { deleteModal, api, userId } from "/src/pages/index.js";
import Api from "/src/utils/api.js";

export default class Card {
  constructor({
    name,
    link,
    cardTemplate,
    handleCardClick,
    handleDeleteCard,
    handleLikeButton,
    _id,
    userId,
    _likes,
  }) {
    this._name = name;
    this._link = link;

    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
    this._id = _id;
    this._userId = userId;
    this._likes = _likes;

    this._element = this._getTemplate();
    this._cardLinkTitle = this._element.querySelector(".card__ellipsis");
    this._cardLinkInput = this._element.querySelector(".card__image");

    this._cardLinkTitle.textContent = this._name;
    this._cardLinkInput.src = this._link;
    this._cardLinkInput.alt = `Photo of ${this._name}`;

    this._heartButton = this._element.querySelector("#heart");

    this._setEventListeners();
  }
  _setEventListeners() {
    this._heartButton.addEventListener("click", () => {
      this._handleLikeButton(this._id);
    });

    this._cardLinkInput.addEventListener("click", this._setBigImage.bind(this));

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteCard(this._id));
    if ("eb9b4fc7dcf52812ff98973c" !== this._userId) {
      this._element.querySelector(".card__delete-button").style.display =
        "none";
    }

    if (this.isLiked()) {
      this.gotCliked(this._likes);
    } else {
      this._element.querySelector(".card__likes").textContent =
        this._likes?.length;
    }
  }
  isLiked() {
    return (
      this._likes?.some(
        (person) => person._id === "eb9b4fc7dcf52812ff98973c"
      ) ?? false
    );
  }

  gotCliked(newLikes) {
    this._heartButton.classList.toggle("card__background_active");
    this._likes = newLikes;
    this._element.querySelector(".card__likes").textContent = newLikes.length;
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _getTemplate() {
    return this._cardTemplate.cloneNode(true);
  }
  _setBigImage() {
    this._handleCardClick({ link: this._link, name: this._name });
  }
  _setDeleteCard() {
    this.handleDeleteCard({ _id: this._id });
  }

  getElement() {
    return this._element;
  }
}
