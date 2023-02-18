// import  FormValidator from './FormValidator.js';
// import Card from './Card.js';
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

const profileModal = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const openEditButton = document.querySelector(".gallery__pencil");
const closeProfileModalButton = profileModal.querySelector(".popup__close");
const saveProfileModal = profileModal.querySelector(".popup__button");
// inputs for person
const nameInput = document.forms.profile.elements.name;
const titleInput = document.forms.profile.elements.title;
// inputs for new card
const cardLinkTitle = document.querySelector("#form__place");
const cardLinkInput = document.querySelector("#type_card-url");
const galleryName = document.querySelector(".gallery__header");
const galleryTitle = document.querySelector(".gallery__subtext");
const galleryLink = document.querySelector(".popup__input_type_card-link");
const createButton = document.querySelector(".button_active");
const newCardLinkTitle = document.querySelector(".popup__title-foto");
const placesList = document.querySelector(".card__area");
// All forms
const formEdit = document.getElementById("form__edit");
const formPlace = document.getElementById("form__place");
// Close buttons
const deleteBigImg = document.querySelector("#closeButtonFoto");
const closeOverlay = document.querySelector(".page__background");

function fillProfileForm() {
  nameInput.value = galleryName.textContent;
  titleInput.value = galleryTitle.textContent;
}


// reset form functions
function resetPlaceForm() {
  formPlace.reset();
}
function resetEditForm() {
  formEdit.reset();
}


profileModal.addEventListener("submit", function () {
  galleryName.textContent = nameInput.value;
  galleryTitle.textContent = titleInput.value;
  resetEditForm();
  closeEdit();
});

