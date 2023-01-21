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
const popupAddCard = document.querySelector(".popup_type_add-card");
const openWindiowButton = document.querySelector(".gallery__pencil");
const closeWindowButton = document.querySelector(".popup__close");
const saveModalWindow = document.querySelector(".popup__button");
// inputs for person
const nameInput = document.forms.profile.elements.name;
const titleInput = document.forms.profile.elements.title;
// inputs for new card 
const cardTitle = document.querySelector("#nameImg");
const cardSrc = document.querySelector("#titleURL");

const galleryName = document.querySelector('.gallery__header');
const galleryTitle = document.querySelector('.gallery__subtext');
const galleryLink = document.querySelector(".popup__input_type_card-link");
const galleryNewCardName =  document.querySelector(".popup__input_type_card-name");
const createButton = document.querySelector(".create__button");
const newCardTitle = document.querySelector(".popup__title-foto");
const placesList = document.querySelector(".places__list");


function fillProfileForm() {
    nameInput.value = galleryName.textContent;
    titleInput.value = galleryTitle.textContent;
}

function openModalWindow() {
    modalWindow.classList.add ("popup_opened");
}
function closeModalWindow(e) {
  e.target.closest(".popup").classList.remove ("popup_opened");
}
saveModalWindow.addEventListener("click",closeModalWindow)
function openEditProfileModal() {
    fillProfileForm();
    openModalWindow();
}

function openAddNewCard() {
  // fillCardForm();
  openNewWindow();
}
openWindiowButton.addEventListener("click", openEditProfileModal);
closeWindowButton.addEventListener("click", closeModalWindow);


modalWindow.addEventListener("submit", function () {
    galleryName.textContent = nameInput.value;
    galleryTitle.textContent = titleInput.value;
});

galleryNewCardName.addEventListener("submit", function () {
  galleryName.textContent = nameInput.value;
  galleryTitle.textContent = titleInput.value;
});
// add card 

const galleryButton = document.querySelector(".gallery__button");
const closeButtonNewPlace = document.querySelector("#closeButtonNewPlace");

function openNewWindow() {
  popupAddCard.classList.add ("popup_opened");
}
function closeNewWindow() {
  popupAddCard.classList.remove ("popup_opened");
}
galleryButton.addEventListener("click", function() {openAddNewCard(popupAddCard) });
closeButtonNewPlace.addEventListener("click", function() {closeNewWindow(popupAddCard) });
createButton.addEventListener("click", function() {closeNewWindow(popupAddCard) });

//new card creation//
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

  clonedCard.querySelector("#heart").addEventListener("click", hearthChange);
  function hearthChange () {
    console.log(clonedCard.querySelector("#heart").src)
    if (clonedCard.querySelector("#heart").getAttribute("src") === "./images/heart.svg") {
      clonedCard.querySelector("#heart").setAttribute("src", "./images/black-hearth.svg");
  } else {
      clonedCard.querySelector("#heart").setAttribute("src", "./images/heart.svg");
  }
  }

  
  clonedCard.querySelector(".card__delete-button").addEventListener("click", (e) => {
    e.target.closest(".card__gallery").remove();
  });

  // делаем большое изображение + убираем
  const bigImg = document.querySelector('.popup_type_foto');
  function openBigImg (e) {
    bigImg.classList.add ("popup_opened");
    bigImg.style = "background-image: url(" + cardSrc.src + " )";
    newCardTitle.textContent = clonedCard.querySelector(".card__ellipsis").textContent;
  }
  cardSrc.addEventListener("click", openBigImg);
  const deletBigImg = document.querySelector("#closeButtonFoto");
  function closeBigImg () {
    bigImg.classList.remove ("popup_opened");
    
  }
  deletBigImg.addEventListener("click", closeBigImg);
  return clonedCard;
};

submitButton = document.querySelector(".create__button");

// create new card

submitButton.addEventListener("click", (e) => {

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card__gallery");

const clonedCard = cardTemplate.cloneNode(true);
const cardImage = clonedCard.querySelector(".card__image");
const cardTitle = clonedCard.querySelector(".card__ellipsis");

cardImage.src =  document.getElementById("titleURL").value
cardTitle.textContent = document.getElementById("nameImg").value

// like button for new card elements
const bigImg = document.querySelector('.popup_type_foto');
function openBigImg (e) {
  bigImg.classList.add ("popup_opened");
  bigImg.style = "background-image: url(" + cardImage.src + " )";
  newCardTitle.textContent = cardTitle.textContent;


}
cardImg = document.querySelector("#myImage")
cardImg.addEventListener("click", openBigImg);
const deletBigImg = document.querySelector("#closeButtonFoto");
function closeBigImg () {
  bigImg.classList.remove ("popup_opened");
  
}
deletBigImg.addEventListener("click", closeBigImg);

clonedCard.querySelector(".card__delete-button").addEventListener("click", (e) => {
  e.target.closest(".card__gallery").remove();
});



clonedCard.querySelector("#heart").addEventListener("click", hearthChange);

function hearthChange () {
  console.log(clonedCard.querySelector("#heart").src)
  if (clonedCard.querySelector("#heart").getAttribute("src") === "./images/heart.svg") {
    clonedCard.querySelector("#heart").setAttribute("src", "./images/black-hearth.svg");
} else {
    clonedCard.querySelector("#heart").setAttribute("src", "./images/heart.svg");
}
}




// делаем большое изображение + убираем

placesList.append(clonedCard);
function openBigImg () {

  bigImg.classList.add ("popup_opened");
  bigImg.style = "background-image: url(" + clonedCard.querySelector(".card__image").src + " )";
  newCardTitle.textContent = clonedCard.querySelector(".card__ellipsis").textContent;


  console.log("apple")

}
clonedCard.querySelector(".card__image").addEventListener("click", openBigImg);

function closeBigImg () {
  bigImg.classList.remove ("popup_opened"); 
}
deletBigImg.addEventListener("click", closeBigImg);
});


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
    placesList.append(creareNewCard(cardPropsObj));
  });
  listPageSection.append(listContainer);
  
};
cardsPopulation();




