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
  galleryAvatar,
  avatarInput,
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
const profileModal = new PopupWithForm(".popup_type_edit-profile", (formValues) => {
  api.changeProfile(formValues) 
  .then((formValues) =>{  
    userInfo.setUserInfo({name: formValues.name, title: formValues.about})
  })
});
const deleteModal = new PopupWithSubmit(
  ".popup_type_delete")
let userId 
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
const popupChangeAvatar = new PopupWithSubmit(".popup_type_avatar", async (data) => {
  api.changeAvatar()
  .then((res) => {
console.log("result", res)
    });
  })
  
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
  // avatarInput.value = data.avatar;
  profileFormValidator.resetValidation();
});

const userInfo = new UserInfo({
  nameSelector: ".gallery__header",
  jobSelector: ".gallery__subtext",
  
});
const avatarInfo = new UserInfo ({
  avatarSelector: ".gallery__image",
})

galleryAvatar.addEventListener("click", () => {
  const data = avatarInfo.getAvatarInfo();
  popupChangeAvatar.open();
  avatarInput.value = data.avatar;

});


profileModal.setEventListener();
bigImg.setEventListener();
popupAddCard.setEventListener();
deleteModal.setEventListener();
popupChangeAvatar.setEventListener();
function createCard(name, link, cardTemplate, _id , userId, likes, isLiked) {

  const newCard = new Card({
    name: name,
    link: link,
    cardTemplate: cardTemplate,
    _id: _id,
    userId: userId,
    likes:likes,
    isLiked: isLiked,
    handleCardClick: bigImg.open,
    handleDeleteCard: (id) => {
      deleteModal.open()    
      deleteModal.setAction(() => {
        api.deleteCard(id)
        .then(res => {
          newCard.removeCard()
          deleteModal.close()
        })
      })
    },
    handleLikeButton: (id) => {

      const isAlreadyLiked = newCard.isLiked()
      if  (isAlreadyLiked) {
        api.disLike(id)
        .then((res) => {
          newCard.gotCliked(res.likes);
        });
      } else{
        api.addLike(id)
        .then((res) => {
          newCard.gotCliked(res.likes);
        });
      }


    },
    
  });
  
  return newCard.getElement();
}

function handleAddCardSubmit() {
  const formValues = popupAddCard.getInputValues();
  const newCard = createCard(
    formValues["nameNew"],
    formValues["titleURL"],
    cardTemplate
  );
  console.log("New card created:", newCard);
  popupAddCard.close();
}

const cardList = new Section(
  {items: [],
    renderer: (cardData) => {
      const typeCardName = cardData.name;
      const typeCardUrl = cardData.link;
      const cardId = cardData._id;
      let userId = cardData.owner._id;
      var likes = cardData.likes;

      const newCard = createCard(typeCardName, typeCardUrl, cardTemplate, cardId, userId, likes);
      return newCard;
    },
  },
  ".card__area"
);
cardList.renderItems();


  Promise.all([api.getInitialCards(), api.getUserData()])
  .then(([cards, userData]) => {
    userId = userData._id
    cardList.setItems(cards);
    cardList.renderItems();

    userInfo.setUserInfo({name: userData.name, title: userData.about})
  
  })


const profileFormValidator = new FormValidator(pageSettings, formEdit);
const newPlaceFormValidator = new FormValidator(pageSettings, formPlace);

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

