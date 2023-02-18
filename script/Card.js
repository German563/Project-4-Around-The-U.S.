class Card {
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
  
      this._deleteButton = this._element.querySelector(".card__delete-button");
      this._deleteButton.addEventListener("click", this._handleDeleteClick.bind(this));
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

    _openBigImg() {
      this.bigImg = this._element.querySelector(".popup_type_foto");
      const bigImgLink = bigImg.querySelector(".popup__image");
      const bigImgTitle = bigImg.querySelector(".popup__caption");
  
      bigImgLink.src = this._link;
      bigImgTitle.textContent = this._name;
  
      openModal(bigImg);
    }
  
    getElement() {
      return this._element;
    }
  }
  
  const galleryButton = document.querySelector(".gallery__button");
  const closeButtonNewPlace = document.querySelector("#closeButtonNewPlace");
//   const formPlace = document.querySelector(".popup__form_type_place");
//   const placesList = document.querySelector(".card__area");
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".card__gallery");
  
  function openCardModal() {
    openModal(popupAddCard);
  }
  
  function closeCardModal() {
    closeModal(popupAddCard);
  }
  
  galleryButton.addEventListener("click", openCardModal);
  closeButtonNewPlace.addEventListener("click", closeCardModal);
  
  formPlace.addEventListener("submit", (evt) => {
    evt.preventDefault();
  
    const newCard = new Card({
      name: document.getElementById("type_card-name").value,
      link: document.getElementById("type_card-url").value,
      cardTemplate: cardTemplate,
    });
  
    placesList.prepend(newCard.getElement());
    closeCardModal();
    resetPlaceForm();
  });
  
  initialCards.forEach((cardData) => {
    const newCard = new Card({
      name: cardData.name,
      link: cardData.link,
      cardTemplate: cardTemplate,
    });
  
    placesList.append(newCard.getElement());
  });
