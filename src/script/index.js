import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import { FormValidator } from "./FormValidator.js";
import Card from "./Card.js";
const profileModal = new PopupWithForm(".popup_type_edit-profile");
import "../pages/index.css"
export const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card__gallery");
export const placesList = document.querySelector(".card__area");
export const bigImg = new PopupWithImage(".popup_type_foto");
export const openEditButton = document.querySelector(".gallery__pencil");
export const closeButtons = document.querySelectorAll(".popup__close");
export const saveProfileModal = document.querySelector(".popup__button");

export const galleryButton = document.querySelector(".gallery__button");

export const formEdit = document.getElementById("form__edit");
export const formPlace = document.getElementById("form__place");

export const galleryLink = document.querySelector(
  ".popup__input_type_card-link"
);
export const createButton = document.querySelector(".button_active");
export const newCardLinkTitle = document.querySelector(".popup__title-foto");

export const closeOverlay = document.querySelector(".page__background");
export const imageInCard = document.querySelector(".card__image");

export const nameInput = document.forms.profile.elements.name;
export const galleryName = document.querySelector(".gallery__header");
export const titleInput = document.forms.profile.elements.title;
export const galleryTitle = document.querySelector(".gallery__subtext");
export const deleteBigImg = document.querySelector("#closeButtonFoto");

const popupAddCard = new PopupWithForm(".popup_type_add-card");

galleryButton.addEventListener("click", () => {
  popupAddCard.openIt();
});
openEditButton.addEventListener("click", () => {
  profileModal.openIt();
  fillProfileForm();
  profileFormValidator.resetValidation();
});
function fillProfileForm() {
  nameInput.value = galleryName.textContent;
  titleInput.value = galleryTitle.textContent;
}
const userInfo = new UserInfo({
  nameSelector: ".popup__input_type_name",
  jobSelector: ".popup__input_type_description",
});
userInfo.setUserInfo(userInfo);
profileModal.setEventListener();
bigImg.setEventListener();
popupAddCard.setEventListener();

closeOverlay.addEventListener("click", () => {
  bigImg.closeIt();
  profileModal.closeIt();
  popupAddCard.closeIt();
});

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function createCard(name, link, cardTemplate, onImageClick) {
  const newCard = new Card({
    name: name,
    link: link,
    cardTemplate: cardTemplate,
    onImageClick: onImageClick,
  });
  return newCard.getElement();
}

const addCardSection = new Section({
  items: [],
  renderer: (item) => {
    const newCard = createCard(item.name, item.link, cardTemplate);
    addItem(newCard);
  },
});

addCardSection.renderItems();

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const typeCardName = document.getElementById("type_card-name").value;
  const typeCardUrl = document.getElementById("type_card-url").value;
  const newCard = createCard(typeCardName, typeCardUrl, cardTemplate);
  addCardSection.addItem(newCard);
  popupAddCard.closeIt();
  newPlaceFormValidator.resetValidation();
}

formPlace.addEventListener("submit", handleAddCardSubmit);

// Form validator configuration options
export const pageSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

export const profileFormValidator = new FormValidator(pageSettings, formEdit);
const newPlaceFormValidator = new FormValidator(pageSettings, formPlace);

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      const typeCardName = cardData.name;
      const typeCardUrl = cardData.link;
      const newCard = createCard(typeCardName, typeCardUrl, cardTemplate);
      return newCard;
    },
  },
  ".card__area"
);

cardList.renderItems();

document
  .querySelector(".popup_type_edit-profile")
  .addEventListener("submit", function () {
    galleryName.textContent = nameInput.value;
    galleryTitle.textContent = titleInput.value;
    profileModal.closeIt();
  });