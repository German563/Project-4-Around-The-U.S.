import { FormValidator } from "./FormValidator.js";
import Card from "./Card.js";
import {
  formEdit,
  formPlace,
  popupAddCard,
  cardTemplate,
  placesList,
  openModulesButtons,
} from "./constants.js";
import { closeModal } from "./utils.js";
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

// Card Template

function resetPlaceForm() {
  formPlace.reset();
}
function closeCardModal() {
  closeModal(popupAddCard);
}

function createCard(name, link, cardTemplate) {
  const newCard = new Card({
    name: name,
    link: link,
    cardTemplate: cardTemplate,
  });
  return newCard.getElement();
}

formPlace.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const typeCardName = document.getElementById("type_card-name").value;
  const typeCardUrl = document.getElementById("type_card-url").value;
  const newCard = createCard(typeCardName, typeCardUrl, cardTemplate);
  placesList.prepend(newCard);

  closeCardModal();
  resetPlaceForm();
  newPlaceFormValidator.resetValidation();
});

openModulesButtons.forEach((openModulesButton) => {
  openModulesButton.addEventListener("click", () => {
    newPlaceFormValidator.resetValidation();
  });
});

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

initialCards.forEach((cardData) => {
  const typeCardName = cardData.name;
  const typeCardUrl = cardData.link;
  const newCard = createCard(typeCardName, typeCardUrl, cardTemplate);
  placesList.append(newCard);
});
