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

closeProfileModalButton.addEventListener("click", closeEdit);

function openBigImg(e) {
    openModal(bigImg);
    bigImg.style = "background-image: url(" + cardLinkInput.src + " )";
    newCardLinkTitle.textContent =
      clonedCard.querySelector(".card__ellipsis").textContent;
  }
  cardLinkInput.addEventListener("click", openBigImg);