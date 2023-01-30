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

const profileModal = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");
const openEditButton = document.querySelector(".gallery__pencil");
const closeProfileModalButton = profileModal.querySelector(".popup__close");
const saveProfileModal = profileModal.querySelector(".popup__button");
// inputs for person
const nameInput = document.forms.profile.elements.name;
const titleInput = document.forms.profile.elements.title;
// inputs for new card 
const cardLinkTitle = document.querySelector("#nameImg");
const cardLinkInput = document.querySelector("#titleURL");
const galleryName = document.querySelector('.gallery__header');
const galleryTitle = document.querySelector('.gallery__subtext');
const galleryLink = document.querySelector(".popup__input_type_card-link");
const createButton = document.querySelector(".button_active");
const newCardLinkTitle = document.querySelector(".popup__title-foto");
const placesList = document.querySelector(".card__area");
// All forms
const formEdit = document.getElementById('form__edit');
const formPlace = document.getElementById('form__place');
// Close buttons
const deleteBigImg = document.querySelector("#closeButtonFoto");


function fillProfileForm() {
  nameInput.value = galleryName.textContent;
  titleInput.value = galleryTitle.textContent;
}
function openModal(modal) {
  modal.classList.add("popup_opened");

}
function closeModal(modal) {
  modal.classList.remove("popup_opened");
}

function openEdit() {
  fillProfileForm();
  openModal(profileModal);
}
function closeEdit() {
  closeModal(profileModal)
}
// reset form functions
function resetPlaceForm() {
  formPlace.reset()
}
function resetEditForm() {
  formEdit.reset()
}

openEditButton.addEventListener("click", openEdit);
closeProfileModalButton.addEventListener("click", closeEdit);


profileModal.addEventListener("submit", function () {
  galleryName.textContent = nameInput.value;
  galleryTitle.textContent = titleInput.value;
  resetEditForm();
  closeEdit();
});
// add card 

const galleryButton = document.querySelector(".gallery__button");
const closeButtonNewPlace = document.querySelector("#closeButtonNewPlace");


function openCardModal() {
  openModal(popupAddCard)
}
function closeCardModal() {
  closeModal(popupAddCard)
}
galleryButton.addEventListener("click", openCardModal)
closeButtonNewPlace.addEventListener("click", closeCardModal);


//new card creation//
// new place modal

const cardTemplate = document.querySelector("#card-template").content.querySelector(".card__gallery");
const cardElement = cardTemplate.cloneNode(true);
const listContainer = document.querySelector(".card__area");


const createNewCard = (props) => {

  const localName = props.name;
  const localLink = props.link;
  const localCardTemplate = props.cardTemplate;
  const clonedCard = localCardTemplate.cloneNode(true);
  const cardLinkTitle = clonedCard.querySelector(".card__ellipsis");
  const cardLinkInput = clonedCard.querySelector(".card__image");


  cardLinkTitle.textContent = localName;
  cardLinkInput.src = localLink;
  cardLinkInput.alt = "picture";
  clonedCard.querySelector("#heart").addEventListener("click", changeHeart);
  function changeHeart() {
    const chosenHeart = clonedCard.querySelector("#heart")
    if (chosenHeart.getAttribute("src") === "./images/heart.svg") {
      chosenHeart.setAttribute("src", "./images/black-hearth.svg");
    } else {
      chosenHeart.setAttribute("src", "./images/heart.svg");
    }
  }




  clonedCard.querySelector(".card__delete-button").addEventListener("click", (e) => {
    e.target.closest(".card__gallery").remove();
  });

  function openBigImg(e) {
    openModal(bigImg);
    bigImg.style = "background-image: url(" + cardLinkInput.src + " )";
    newCardLinkTitle.textContent = clonedCard.querySelector(".card__ellipsis").textContent;
  }
  cardLinkInput.addEventListener("click", openBigImg);

  return clonedCard;
};
const bigImg = document.querySelector('.popup_type_foto');
function closeBigImg() {
  closeModal(bigImg);
}
deleteBigImg.addEventListener("click", closeBigImg);

// create new card

formPlace.addEventListener("submit", (e) => {
  const cardTemplate = document.querySelector("#card-template").content.querySelector(".card__gallery");
  const clonedCard = createNewCard({
    name: document.getElementById("nameImg").value,
    link: document.getElementById("titleURL").value,
    cardTemplate: cardTemplate
  });
  placesList.prepend(clonedCard);
  closeCardModal(popupAddCard);
  resetPlaceForm();
});



const populateCards = () => {
  initialCards.forEach((item) => {
    const cardPropsObj = {
      name: item.name,
      link: item.link,
      cardTemplate: cardTemplate,
    };
    placesList.append(createNewCard(cardPropsObj));
  });
  fillProfileForm(profileModal)
};
populateCards();
