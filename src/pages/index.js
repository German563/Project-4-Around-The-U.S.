import {
  cardTemplate,
  openEditButton,
  galleryButton,
  formEdit,
  formPlace,
  formAvatar,
  nameInput,
  titleInput,
  pageSettings,
  galleryAvatar,
} from "../utils/constants.js";
import "regenerator-runtime/runtime";
import PopupWithForm from "/src/components/PopupWithForm.js";
import Section from "../components/Section.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import { FormValidator } from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Api from "../utils/api.js";
const profileModal = new PopupWithForm(
  ".popup_type_edit-profile",
  (formValues) => {
    return new Promise((resolve) => {
      api
        .changeProfile(formValues)
        .then((res) => {
          userInfo.setUserInfo({
            name: formValues.name,
            title: formValues.title,
          });
          resolve(res);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  }
);
let yourId;
const deleteModal = new PopupWithSubmit(".popup_type_delete");

import "../pages/index.css";
import "../vendor/fonts.css";

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en/",
  headers: {
    authorization: "e311eb36-6a4d-4f2d-8784-2a64b37b741e",
    "Content-Type": "application/json",
  },
});
const popupAddCard = new PopupWithForm(".popup_type_add-card", async (data) => {
  const card = await api.addCard(data.nameNew, data.titleURL);
  if (card) {
    cardList.addItem(
      createCard(
        data.nameNew,
        data.titleURL,
        cardTemplate,
        card._id,
        yourId,
        card.likes
      )
    );
  }
});
const popupChangeAvatar = new PopupWithForm(
  ".popup_type_avatar",
  async (formValues) => {
    await api
      .changeAvatar(formValues)
      .then((formValues) => {
        avatarInfo.setAvatar(formValues.avatar);
      })
      .catch((error) => {
        console.error(error);
      });
  }
);

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
const avatarInfo = new UserInfo({
  avatarSelector: ".gallery__image",
});

galleryAvatar.addEventListener("click", () => {
  popupChangeAvatar.open();
  avatarFormValidator.resetValidation();
});

profileModal.setEventListener();
bigImg.setEventListener();
popupAddCard.setEventListener();
deleteModal.setEventListener();
popupChangeAvatar.setEventListener();
function createCard(name, link, cardTemplate, _id, userId, _likes, isLiked) {
  const newCard = new Card({
    name: name,
    link: link,
    cardTemplate: cardTemplate,
    _id: _id,
    userId: userId,
    _likes: _likes,
    isLiked: isLiked,
    yourId: yourId,
    handleCardClick: bigImg.open,
    handleDeleteCard: (id) => {
      deleteModal.open();
      deleteModal.setAction(() => {
        api
          .deleteCard(id)
          .then((res) => {
            newCard.removeCard();
            deleteModal.close();
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      });
    },
    handleLikeButton: (id) => {
      const isAlreadyLiked = newCard.isLiked();
      if (isAlreadyLiked) {
        api
          .disLike(id)
          .then((res) => {
            newCard.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      } else {
        api
          .addLike(id)
          .then((res) => {
            newCard.setLikes(res.likes);
          })
          .catch((err) => {
            console.log(`Error: ${err}`);
          });
      }
    },
  });

  return newCard.getElement();
}

const cardList = new Section(
  {
    items: [],
    renderer: (cardData) => {
      const typeCardName = cardData.name;
      const typeCardUrl = cardData.link;
      const cardId = cardData._id;
      let userId = cardData.owner._id;
      var likes = cardData.likes;

      const newCard = createCard(
        typeCardName,
        typeCardUrl,
        cardTemplate,
        cardId,
        userId,
        likes
      );
      return newCard;
    },
  },
  ".card__area"
);
Promise.all([api.getInitialCards(), api.getUserData()]).then(
  ([cards, userData]) => {
    yourId = userData._id;
    cardList.setItems(cards);
    cardList.renderItems();
    avatarInfo.setAvatar(userData.avatar);
    userInfo.setUserInfo({
      name: userData.name,
      title: userData.about,
      avatar: userData.avatar,
    });
  }
);
const profileFormValidator = new FormValidator(pageSettings, formEdit);
const newPlaceFormValidator = new FormValidator(pageSettings, formPlace);
const avatarFormValidator = new FormValidator(pageSettings, formAvatar);

avatarFormValidator.enableValidation();
profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();
