const hideError = (props) => {
    const {inputErrorClass, input, labels, errorClass} = props
    input.classList.remove(inputErrorClass);
    // labels.classList.remove(errorClass);
};
const showError = (props) => {
    const {inputErrorClass, input, labels, errorClass} = props
    input.classList.add(inputErrorClass);
    // labels.classList.add(errorClass);
};

const checkValidity = (input) => {
return input.validity.valid;
};
const toggleButton = (props) => {
    const {submitButton, inactiveButtonClass, isDisabled} = props
    submitButton.disabled = isDisabled;
    if(isDisabled) {
        submitButton.classList.add(inactiveButtonClass);
    } else {
        submitButton.classList.remove(inactiveButtonClass);
    }
};
const toggleLabel = (props) => {
    const {submitButton, errorClass, isDisabled, label} = props
    submitButton.disabled = isDisabled;
    if(isDisabled) {
        label.classList.add(errorClass);
    } else {
        label.classList.remove(errorClass);
    }
};

const enableValidation = (settings) => {
 const {
formSelector,
inputSelector,
submitButtonSelector,
inactiveButtonClass,
inputErrorClass,

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
                hideError({input, inputErrorClass});
                toggleButton({
                    submitButton: submitButton,
                    inactiveButtonClass: inactiveButtonClass,
                    isDisabled: false,
                });
                toggleLabel ();
              } else {
                showError({input, inputErrorClass});
                toggleButton({
                    submitButton: submitButton,
                    inactiveButtonClass: inactiveButtonClass,
                    isDisabled: true,
                });
                toggleLabel ();
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
label: ".popup__label",
});