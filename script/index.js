const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const modalWindow = document.querySelector(".popup_type_edit-profile");
const openWindiowButton = document.querySelector(".gallery__pencil");
const closeWindowButton = document.querySelector(".popup__close");
const saveModalWindow = document.querySelector(".popup__button");
const saveButton = document.querySelector(".popup__button");
const nameInput = document.forms.profile.elements.name;
const titleInput = document.forms.profile.elements.title;
const galleryName = document.querySelector('.gallery__header');
const galleryTitle = document.querySelector('.gallery__subtext');



function fillProfileForm() {
    nameInput.value = galleryName.textContent;
    titleInput.value = galleryTitle.textContent;
}

function openModalWindow() {
    modalWindow.classList.add ("popup_opened");
}
function closeModalWindow() {
    modalWindow.classList.remove ("popup_opened");
}
function openEditProfileModal() {
    fillProfileForm();
    openModalWindow();
}
openWindiowButton.addEventListener("click", openEditProfileModal);
closeWindowButton.addEventListener("click", closeModalWindow);


modalWindow.addEventListener("submit", function () {
    galleryName.textContent = nameInput.value;
    galleryTitle.textContent = titleInput.value;
});
// add card 
const popupAddCard = document.querySelector(".popup_type_add-card");
const galleryButton = document.querySelector(".gallery__button");
const closeButtonNewPlace = document.querySelector("#closeButtonNewPlace");

function openNewWindow() {
  popupAddCard.classList.add ("popup_opened");
}
function closeNewWindow() {
  popupAddCard.classList.remove ("popup_opened");
}
galleryButton.addEventListener("click", function() {openNewWindow(popupAddCard) });
closeButtonNewPlace.addEventListener("click", function() {closeNewWindow(popupAddCard) });



// new place modal

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card__gallery");
const cardElement = cardTemplate.cloneNode(true);
const listContainer = document.querySelector(".card__area");

const createListWrapper = (props) => {
  const className = props.className;
  const newElement = document.createElement("ul");
  newElement.classList.toggle(className);
  return newElement;
}

const creareNewCard = (props) => {
  const localName = props.name;
  const localLink = props.link;
  const localCardTemplate = props.cardTemplate;
  const clonedCard = localCardTemplate.cloneNode(true);
  const cardTitle = clonedCard.querySelector(".card__ellipsis");
  const cardSrc = clonedCard.querySelector(".card__image");


  cardTitle.textContent = localName;
  cardSrc.src = localLink;

  function changeHearth(event) {
    var image = clonedCard.querySelector(".hearthButton");
    var originalSrc = "./images/heart.svg";
  
    if (image.src = originalSrc) {
      image.src = "./images/black-hearth.svg";
    } else {
      image.src = originalSrc;
    }
}

  var imageElement = clonedCard.querySelector(".hearthButton");
  imageElement.addEventListener("click", changeHearth);


  // function changeHearth () {
  //   if (clonedCard.querySelector(".hearthButton").src = "./images/heart.svg") {
  //   clonedCard.querySelector(".hearthButton").src = "./images/black-hearth.svg"
  //     }  else {
  //   clonedCard.querySelector(".hearthButton").src = "./images/heart.svg"
  //     }
  // }
  // clonedCard.querySelector(".hearthButton").addEventListener("click", changeHearth);



  return clonedCard;
};

const cardsPopulation = () => {
  const listContainer = createListWrapper({ className: "card__area"});
  const listPageSection = document.querySelector(".card");
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".card__gallery");
  initialCards.forEach((item)=> {
    const cardPropsObj = {
      name: item.name,
      link: item.link,
      cardTemplate: cardTemplate,
    };
    listContainer.append(creareNewCard(cardPropsObj));
  });
  listPageSection.append(listContainer);
};
cardsPopulation();

// deleting card




