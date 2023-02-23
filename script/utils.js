import {
  profileModal,
  openEditButton,
  closeButtons,
  galleryButton,
  popupAddCard,
  closeOverlay,
  bigImg,
  nameInput,
  galleryName,
  titleInput,
  galleryTitle,
  formEdit,
} from "./constants.js";
import { FormValidator } from "./FormValidator.js";
import { pageSettings } from "./index.js";
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

function openCardModal() {
  openModal(popupAddCard);
}

function closeCardModal() {
  closeModal(popupAddCard);
}

function resetEditForm() {
  formEdit.reset();
}

galleryButton.addEventListener("click", openCardModal);
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closeModal(popup));
});
export { openModal, closeModal };
