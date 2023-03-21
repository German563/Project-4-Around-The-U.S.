import {deleteModal, api} from "/src/pages/index.js";
import Api from "/src/utils/api.js";

export default class Card {
  constructor({ name, link, cardTemplate, handleCardClick, handleDeleteCard, _id }) {
    this._name = name;
    this._link = link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;  
    this._id = _id;
    this._element = this._getTemplate();
    this._cardLinkTitle = this._element.querySelector(".card__ellipsis");
    this._cardLinkInput = this._element.querySelector(".card__image");

    this._cardLinkTitle.textContent = this._name;
    this._cardLinkInput.src = this._link;
    this._cardLinkInput.alt = `Photo of ${this._name}`;

    this._heartButton = this._element.querySelector("#heart");




    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._setEventListeners();
  }
  _setEventListeners() {
    this._heartButton.addEventListener("click", () => {
      api.addLike(this._id)
        .then((updatedCard) => {
          const likeCountElement = this._heartButton.previousElementSibling;
          likeCountElement.textContent = updatedCard.likes.length;
        })
        .catch((error) => {
          console.log("Error adding like:", error);
        });
    });
  
    this._cardLinkInput.addEventListener("click", this._setBigImage.bind(this));
  
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id);
    });
  }

removeCard () {
  this._element.remove();
  this._element = null;
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

 

  getElement() {
    return this._element;
  }
}
