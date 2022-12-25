const modalWindow = document.querySelector(".popup");
const openWindiowButton = document.querySelector(".gallery__pencil");
const closeWindowButton = document.querySelector(".popup__close");
var saveModalWindow = document.querySelector(".popup__button");
var saveButton = document.querySelector(".popup__button")
let nameInput = document.forms.profile.elements.name;
let titleInput = document.forms.profile.elements.title;
let galleryName = document.querySelector('.gallery__header');
let galleryTitle = document.querySelector('.gallery__subtext');
// let heartButton = document.querySelectorAll("img[src='./images/heart.svg']");

function toggleModalWindow() {
modalWindow.classList.toggle("popup_opened");
}
openWindiowButton.addEventListener("click", toggleModalWindow);
closeWindowButton.addEventListener("click", toggleModalWindow);


saveButton.addEventListener ("click", function(){
    galleryName.textContent = nameInput.value;
    galleryTitle.textContent = titleInput.value;
    toggleModalWindow();
});


 
