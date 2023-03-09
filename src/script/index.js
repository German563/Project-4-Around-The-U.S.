import {
  cardTemplate,
  placesList,
  openEditButton,
  closeButtons,
  saveProfileModal,
  galleryButton,
  formEdit,
  formPlace,
  galleryLink,
  createButton,
  newCardLinkTitle,
  closeOverlay,
  imageInCard,
  nameInput,
  galleryName,
  titleInput,
  galleryTitle,
  deleteBigImg,
} from "./constants.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import { FormValidator } from "./FormValidator.js";
import Card from "./Card.js";
const profileModal = new PopupWithForm(".popup_type_edit-profile");
import "../pages/index.css";
import "../vendor/fonts.css";
const popupAddCard = new PopupWithForm(".popup_type_add-card");
export const bigImg = new PopupWithImage(".popup_type_foto");
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

function createCard(name, link, cardTemplate) {
  const newCard = new Card({
    name: name,
    link: link,
    cardTemplate: cardTemplate,
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
