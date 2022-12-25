var modalWindow = document.querySelector(".popup");
var openWindiowButton = document.querySelector(".gallery__pencil");
var closeWindowButton = document.querySelector(".popup__close");
var saveModalWindow = document.querySelector(".popup__button");
var saveButton = document.querySelector(".popup__button");
var nameInput = document.forms.profile.elements.name;
var titleInput = document.forms.profile.elements.title;
var galleryName = document.querySelector('.gallery__header');
var galleryTitle = document.querySelector('.gallery__subtext');
var heartButton = document.querySelectorAll("img[src='./images/heart.svg']");

function toggleModalWindow() {
    modalWindow.classList.toggle("popup_opened");
}
openWindiowButton.addEventListener("click", toggleModalWindow);
closeWindowButton.addEventListener("click", toggleModalWindow);


saveButton.addEventListener("click", function () {
    galleryName.textContent = nameInput.value;
    galleryTitle.textContent = titleInput.value;
    toggleModalWindow();
});



