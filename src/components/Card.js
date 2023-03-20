import {deleteModal} from "/src/pages/index.js";
import api from "/src/utils/api.js";
export default class Card {
  constructor({ name, link, cardTemplate, handleCardClick, handleDeleteCard }) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;

    this._element = this._getTemplate();
    this._cardLinkTitle = this._element.querySelector(".card__ellipsis");
    this._cardLinkInput = this._element.querySelector(".card__image");

    this._cardLinkTitle.textContent = this._name;
    this._cardLinkInput.src = this._link;
    this._cardLinkInput.alt = `Photo of ${this._name}`;

    this._heartButton = this._element.querySelector("#heart");

    const cardId = this._heartButton.dataset.cardId;


    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._setEventListeners();
  }
  _setEventListeners() {
    this._heartButton.addEventListener("click", () => {
      api
        .addLike(cardId)
        .then((updatedCard) => {
          // update the like count on the card element
          const likeCountElement = this._heartButton.previousElementSibling;
          likeCountElement.textContent = updatedCard.likes.length;
        })
        .catch((error) => {
          console.log("Error adding like:", error);
        });
    });
    this._cardLinkInput.addEventListener("click", this._setBigImage.bind(this));

    this._deleteButton.addEventListener(
      "click",
      this._handleDeleteClick.bind(this)
    );
  }
  _getTemplate() {
    return this._cardTemplate.cloneNode(true);
  }
  _setBigImage() {
    this._handleCardClick({ link: this._link, name: this._name });
  }
  _toggleLike() {
    this._heartButton.classList.toggle("card__background_active");
  }

  _handleDeleteClick() {
    deleteModal.open()
  }

  getElement() {
    return this._element;
  }
}
