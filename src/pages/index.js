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
  pageSettings,
} from "../utils/constants.js";
import "regenerator-runtime/runtime"
import PopupWithForm from "/src/components/PopupWithForm.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Api from "../utils/api.js";
const profileModal = new PopupWithForm(
  ".popup_type_edit-profile"
);
export const deleteModal = new PopupWithSubmit(
  ".popup_type_delete"
);

import "../pages/index.css";
import "../vendor/fonts.css";
import { async } from "regenerator-runtime";
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en/",
  token: "e311eb36-6a4d-4f2d-8784-2a64b37b741e"
//  "Content-Type": "application/json"
  }); 
  const popupAddCard = new PopupWithForm(".popup_type_add-card", async (data) => {
    const card = await api.addCard(data.nameNew, data.titleURL);
    if (card) {
      cardList.addItem(createCard(data.nameNew, data.titleURL, cardTemplate));
    }
    handleAddCardSubmit()
  });

const bigImg = new PopupWithImage(".popup_type_foto");
galleryButton.addEventListener("click", () => {
  newPlaceFormValidator.resetValidation();
  popupAddCard.open();
});

openEditButton.addEventListener("click", () => {
  const data = userInfo.getUserInfo();
  profileModal.open();
  nameInput.value = data.name;
  titleInput.value = data.job;
  profileFormValidator.resetValidation();
});

const userInfo = new UserInfo({
  nameSelector: ".gallery__header",
  jobSelector: ".gallery__subtext",
});

profileModal.setEventListener();
bigImg.setEventListener();
popupAddCard.setEventListener();
deleteModal.setEventListener();
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
  {items: [],
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

api.getInitialCards()
  .then((cards) => {
    cardList.setItems(cards);
    cardList.renderItems();
  });

function handleAddCardSubmit() {
  const formValues = popupAddCard.getInputValues();
  const newCard = createCard(
    formValues["nameNew"],
    formValues["titleURL"],
    cardTemplate
  );
  popupAddCard.close();
}

const profileFormValidator = new FormValidator(pageSettings, formEdit);
const newPlaceFormValidator = new FormValidator(pageSettings, formPlace);

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();



  api.getUserData() 
  .then((userData) =>{  
    userInfo.setUserInfo({name: userData.name, title: userData.about})
  })
  api.changeProfile() 
  .then((userData) =>{  
    userInfo.setUserInfo({name: userData.name, title: userData.about})
  })
  api.getLikes()
  .then((cards) => {
    const likesArray = cards.map(card => card.likes);
    const likesElements = document.querySelectorAll('.card__likes');
    likesElements.forEach((likesElement, index) => {
      likesElement.textContent = likesArray[index].length;
    });
  })
  const likeButtons = document.querySelectorAll("#heart");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
      // get the card ID from the data attribute on the like button element
      const cardId = likeButton.dataset.cardId;
      
      // call the addLike() function to add a like to the card with the specified ID
      api.addLike(cardId)
        .then((updatedCard) => {
          // update the like count on the card element
          const likeCountElement = likeButton.previousElementSibling;
          likeCountElement.textContent = updatedCard.likes.length;
        })
        .catch((error) => {
          console.log('Error adding like:', error);
        });
    });
  });