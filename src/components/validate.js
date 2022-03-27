function enableValidation({ formSelector,
  inputSelector,
  submitButtonSelector,
  disabledButtonClass,
  inputInvalidClass,
  errorActiveClass,
  errorClass }) {
  const formList = Array.from(document.querySelectorAll(`${formSelector}`));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (e) => {
      e.preventDefault();
    })
    setEventListeners(formElement, inputSelector, submitButtonSelector, disabledButtonClass, inputInvalidClass,
      errorActiveClass,
      errorClass);
  })
}

function setEventListeners(formElement, inputSelector, submitButtonSelector, disabledButtonClass, inputInvalidClass,
  errorActiveClass,
  errorClass) {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
  const submitButton = formElement.querySelector(`${submitButtonSelector}`);
  toggleButtonState(inputList, submitButton, disabledButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, errorActiveClass, errorClass, inputInvalidClass);
      toggleButtonState(inputList, submitButton, disabledButtonClass);
    });
  });
};

function checkInputValidity(formElement, inputElement, errorActiveClass, errorClass, inputInvalidClass) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorActiveClass, errorClass, inputInvalidClass);
  } else {
    hideInputError(formElement, inputElement, errorActiveClass, errorClass, inputInvalidClass);
  }
};

function showInputError(formElement, inputElement, errorMessage, errorActiveClass, errorClass, inputInvalidClass) {
  const errorElement = formElement.querySelector(`.${errorClass}_${inputElement.id}`);
  inputElement.classList.add(`${inputInvalidClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorActiveClass}`);
};

function hideInputError(formElement, inputElement, errorActiveClass, errorClass, inputInvalidClass) {
  const errorElement = formElement.querySelector(`.${errorClass}_${inputElement.id}`);
  inputElement.classList.remove(`${inputInvalidClass}`);
  errorElement.classList.remove(`${errorActiveClass}`);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, disabledButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(`${disabledButtonClass}`);
    buttonElement.setAttribute("disabled", '');
  } else {
    buttonElement.classList.remove(`${disabledButtonClass}`);
    buttonElement.removeAttribute("disabled");
  }
}

export { enableValidation, toggleButtonState }
