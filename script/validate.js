const hideError = (input) => {
    console.log("input is valid", input);
};
const showError = (input) => {
    console.log("Not valid", input);
    input.classList.add(inactiveButtonClass);
};

const checkValidity = (input) => {
return input.validity.valid;
};
const toggleButton = (props) => {
    const {submitButton, inactiveButtonClass, isDisabled} = props;
    submitButton.disabled = isDisabled;
    if(isDisabled) {
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.classList.remove(inactiveButtonClass);
    }
};
const enableValidation = (settings) => {
 const {
formSelector,
inputSelector,
submitButtonSelector,
inactiveButtonClass,
inputErrorClass,
errorClass,
    } = settings || {};
      if (formSelector) {
    const forms = [...document.querySelectorAll(formSelector)];
    forms.forEach((form) => {
        form.addEventListener("submit", (e) => e.preventDefault());
        const inputs = [...form.querySelectorAll(inputSelector)];
        const submitButton = form.querySelector(submitButtonSelector);
        inputs.forEach((input) => {
            console.log(input);
            input.addEventListener("input", () => {
             const isValid = checkValidity(input);
             if (isValid) {
                hideError();
                toggleButton({
                    submitButton: submitButton,
                    inactiveButtonClass: inactiveButtonClass,
                    isDisabled: false,
                });
              } else {
                showError();
                toggleButton({
                    submitButton,
                    inactiveButtonClass,
                    isDisabled: true,
                });
                }
             
        });
    });
    });
}
else  {
    console.log("No form selector specified");
}
};

enableValidation({
formSelector: ".popup__form",
inputSelector: ".popup__input",
submitButtonSelector: ".popup__button",
inactiveButtonClass: "button__inactive",
inputErrorClass: "popup__input_type_error",
errorClass: "popup__input-error_active",
});