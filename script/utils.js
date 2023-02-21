const profileModal = document.querySelector(".popup_type_edit-profile");
const popupAddCard = document.querySelector(".popup_type_add-card");

const openEditButton = document.querySelector(".gallery__pencil");
const closeProfileModalButton = profileModal.querySelector(".popup__close");
const saveProfileModal = profileModal.querySelector(".popup__button");

const galleryButton = document.querySelector(".gallery__button");

const cardLinkTitle = document.querySelector("#form__place");
const cardLinkInput = document.querySelector("#type_card-url");

const galleryLink = document.querySelector(".popup__input_type_card-link");
const createButton = document.querySelector(".button_active");
const newCardLinkTitle = document.querySelector(".popup__title-foto");

const closeOverlay = document.querySelector(".page__background");
const imageInCard = document.querySelector("#myImage");

const bigImg = document.querySelector(".popup_type_foto");
const nameInput = document.forms.profile.elements.name;
const galleryName = document.querySelector(".gallery__header");
const titleInput = document.forms.profile.elements.title;
const galleryTitle = document.querySelector(".gallery__subtext");
const deleteBigImg = document.querySelector("#closeButtonFoto");
const formEdit = document.getElementById("form__edit");
const formPlace = document.getElementById("form__place");

function fillProfileForm() {
  nameInput.value = galleryName.textContent;
  titleInput.value = galleryTitle.textContent;
}
profileModal.addEventListener("submit", function () {
  galleryName.textContent = nameInput.value;
  galleryTitle.textContent = titleInput.value;
  resetEditForm();
  closeEdit();
});
function openModal(modal) {
  openCloseOverlay();
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", closeModalByEscape);
  closeOverlay.addEventListener("mousedown", closeModalOnRemoteClick);
}
function closeModalOnRemoteClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeOpenedModal();
  }
}
function openCloseOverlay() {
  closeOverlay.classList.add("page__background_opened");
}
function closeCloseOverlay() {
  closeOverlay.classList.remove("page__background_opened");
}
function closeModal(modal) {
  modal.classList.remove("popup_opened");
  closeCloseOverlay();
  document.removeEventListener("keydown", closeModalByEscape);
  closeOverlay.removeEventListener("mousedown", closeModalOnRemoteClick);
}
function closeOpenedModal(event) {
  const openedModal = document.querySelector(".popup_opened");
  closeModal(openedModal);
}

function closeModalByEscape(event) {
  if (event.key === "Escape") {
    closeOpenedModal();
  }
}

function openEdit() {
  fillProfileForm();
  openModal(profileModal);
}
function closeEdit() {
  closeModal(profileModal);
  
}
function closeBigImg() {
  closeModal(bigImg);
}
openEditButton.addEventListener("click", openEdit);
closeProfileModalButton.addEventListener("click", closeEdit);
document
  .querySelector("#closeButtonFoto")
  .addEventListener("click", closeBigImg);

function openCardModal() {
  openModal(popupAddCard);
}

function closeCardModal() {
  closeModal(popupAddCard);
}
function resetPlaceForm() {
  formPlace.reset();
}
function resetEditForm() {
  formEdit.reset();
}
function closeModalImage() {
  bigImg.classList.remove("popup_opened");
}
deleteBigImg.addEventListener("click", closeModalImage());

galleryButton.addEventListener("click", openCardModal);
closeButtonNewPlace.addEventListener("click", closeCardModal);
