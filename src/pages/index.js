import {
  cardTemplate,
  openEditButton,
  galleryButton,
  formEdit,
  formPlace,
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
    api.changeProfile(formValues).then((formValues) => {
      userInfo.setUserInfo({ name: formValues.name, title: formValues.about });
    });
  }
);
const deleteModal = new PopupWithSubmit(".popup_type_delete");
let userId;
import "../pages/index.css";
import "../vendor/fonts.css";
import { async } from "regenerator-runtime";
export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en/",
  token: "e311eb36-6a4d-4f2d-8784-2a64b37b741e",
});
const popupAddCard = new PopupWithForm(".popup_type_add-card", async (data) => {
  const card = await api.addCard(data.nameNew, data.titleURL);
  if (card) {
    cardList.addItem(createCard(data.nameNew, data.titleURL, cardTemplate));
  }
  handleAddCardSubmit();
});
const popupChangeAvatar = new PopupWithForm(
  ".popup_type_avatar",
  (formValues) => {
    api.changeAvatar(formValues).then((formValues) => {
      avatarInfo.setAvatar(formValues.avatar);
      console.log(formValues.avatar);
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
});

profileModal.setEventListener();
bigImg.setEventListener();
popupAddCard.setEventListener();
deleteModal.setEventListener();
popupChangeAvatar.setEventListener();
function createCard(name, link, cardTemplate, _id, userId, likes, isLiked) {
  const newCard = new Card({
    name: name,
    link: link,
    cardTemplate: cardTemplate,
    _id: _id,
    userId: userId,
    likes: likes,
    isLiked: isLiked,
    handleCardClick: bigImg.open,
    handleDeleteCard: (id) => {
      deleteModal.open();
      deleteModal.setAction(() => {
        api.deleteCard(id).then((res) => {
          newCard.removeCard();
          deleteModal.close();
        });
      });
    },
    handleLikeButton: (id) => {
      const isAlreadyLiked = newCard.isLiked();
      if (isAlreadyLiked) {
        api.disLike(id).then((res) => {
          newCard.gotCliked(res.likes);
        });
      } else {
        api.addLike(id).then((res) => {
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
cardList.renderItems();

Promise.all([api.getInitialCards(), api.getUserData()]).then(
  ([cards, userData]) => {
    userId = userData._id;
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

profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

form.addEventListener("submit", function submit(e) {
  e.preventDefault();
  renderLoading(true);
  search(form.elements.entity.value, form.elements.entityId.value)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      console.log(res);
      renderResult(res.name);
    })
    .catch((err) => {
      console.log(`Error: ${err}`);
      renderError(`Error: ${err}`);
    })
    .finally(() => {
      renderLoading(false);
    });
});

function renderLoading(isLoading) {
  if (isLoading) {
    document.querySelector("#avatar_button").textContent = "Saving...";
    document.querySelector("#button_edit_profile").textContent = "Saving...";
    document.querySelector("#button_add_card").textContent = "Saving...";
  } else {
    document.querySelector("#avatar_button").textContent = "Save";
    document.querySelector("#button_edit_profile").textContent = "Save";
    document.querySelector("#button_add_card").textContent = "Create";
    S;
  }
}
