const modalWindow = document.querySelector(".popup");
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

function toggleModalWindow() {
    modalWindow.classList.toggle("popup_opened");
}
function openEditProfileModal() {
    fillProfileForm();
    toggleModalWindow();
}
openWindiowButton.addEventListener("click", openEditProfileModal);
closeWindowButton.addEventListener("click", toggleModalWindow);


modalWindow.addEventListener("submit", function () {
    galleryName.textContent = nameInput.value;
    galleryTitle.textContent = titleInput.value;
    toggleModalWindow();
});



