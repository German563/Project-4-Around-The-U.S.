import FormValidator from "./FormValidator.js";
import Card from './Card.js';
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

const placesList = document.querySelector(".card__area");
// All forms
const formEdit = document.getElementById("form__edit");
const formPlace = document.getElementById("form__place");


const cardTemplate = document.querySelector("#card-template").content.querySelector(".card__gallery");



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

// from.FormValidator

// Form validator configuration options
const pageSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Create FormValidator instances
const profileFormValidator = new FormValidator(pageSettings, formEdit);
const newPlaceFormValidator = new FormValidator(pageSettings, formPlace);

// Call enableValidation method to enable form validation
profileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

