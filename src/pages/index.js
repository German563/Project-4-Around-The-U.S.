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
  imageInCard,
  nameInput,
  galleryName,
  titleInput,
  galleryTitle,
  deleteBigImg,
  initialCards,
} from "../utils/constants.js";
import PopupWithForm from "/src/components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
const profileModal = new PopupWithForm(".popup_type_edit-profile", (data) => {
  userInfo.setUserInfo(data)
});
import "../pages/index.css";
import "../vendor/fonts.css";
import { data } from "autoprefixer";

const popupAddCard = new PopupWithForm(".popup_type_add-card");
const bigImg = new PopupWithImage(".popup_type_foto");
galleryButton.addEventListener("click", () => {
  newPlaceFormValidator.resetValidation();
  popupAddCard.open();
});
openEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo()
  profileModal.open();
  nameInput.value = data.name; 
  titleInput.value = data.job; 
  profileFormValidator.resetValidation();
});

const userInfo = new UserInfo({
  nameSelector: ".gallery__header",
  jobSelector: ".gallery__subtext"
});
function fillProfileForm() { 
  
  nameInput.value = data.name; 
  titleInput.value = data.job; 
  userInfo.setUserInfo(data);
} 

profileModal.setEventListener();
bigImg.setEventListener();
popupAddCard.setEventListener();

function createCard(name, link, cardTemplate) {
  const newCard = new Card({
    name: name,
    link: link,
    cardTemplate: cardTemplate,
    handleCardClick: bigImg.open,
    
  });
  return newCard.getElement();
  
}

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

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const formValues = popupAddCard._getInputValues();
  const newCard = createCard(formValues["nameNew"], formValues["titleURL"], cardTemplate);
  cardList.addItem(newCard);
  popupAddCard.close();
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

document
  .querySelector(".popup_type_edit-profile")
  .addEventListener("submit", function () {
    fillProfileForm();
    profileModal.close();
  });