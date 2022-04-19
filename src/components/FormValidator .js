export default class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._form = form;
    this._inputList = Array.from(
      this._form.querySelectorAll(this._selectors.inputSelector)
    );
    this._submitButton = this._form.querySelector(
      this._selectors.submitButtonSelector
    );
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  checkForm() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this.toggleButtonState();
    });
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._selectors.disabledButtonClass);
      this._submitButton.setAttribute("disabled", "");
    } else {
      this._submitButton.classList.remove(this._selectors.disabledButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `.${this._selectors.errorClass}_${inputElement.id}`
    );
    inputElement.classList.add(this._selectors.inputInvalidClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.remove(this._selectors.errorActiveClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(
      `.${this._selectors.errorClass}_${inputElement.id}`
    );
    inputElement.classList.remove(this._selectors.inputInvalidClass);
    errorElement.classList.remove(this._selectors.errorActiveClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}


// function enableValidation({ formSelector,
//   inputSelector,
//   submitButtonSelector,
//   disabledButtonClass,
//   inputInvalidClass,
//   errorActiveClass,
//   errorClass }) {
//   const formList = Array.from(document.querySelectorAll(`${formSelector}`));
//   formList.forEach((formElement) => {
//     formElement.addEventListener('submit', (e) => {
//       e.preventDefault();
//     })
//     setEventListeners(formElement, inputSelector, submitButtonSelector, disabledButtonClass, inputInvalidClass,
//       errorActiveClass,
//       errorClass);
//   })
// }

// function setEventListeners(formElement, inputSelector, submitButtonSelector, disabledButtonClass, inputInvalidClass,
//   errorActiveClass,
//   errorClass) {
//   const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));
//   const submitButton = formElement.querySelector(`${submitButtonSelector}`);
//   toggleButtonState(inputList, submitButton, disabledButtonClass);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener('input', function () {
//       checkInputValidity(formElement, inputElement, errorActiveClass, errorClass, inputInvalidClass);
//       toggleButtonState(inputList, submitButton, disabledButtonClass);
//     });
//   });
// };

// function checkInputValidity(formElement, inputElement, errorActiveClass, errorClass, inputInvalidClass) {
//   if (!inputElement.validity.valid) {
//     showInputError(formElement, inputElement, inputElement.validationMessage, errorActiveClass, errorClass, inputInvalidClass);
//   } else {
//     hideInputError(formElement, inputElement, errorActiveClass, errorClass, inputInvalidClass);
//   }
// };

// function showInputError(formElement, inputElement, errorMessage, errorActiveClass, errorClass, inputInvalidClass) {
//   const errorElement = formElement.querySelector(`.${errorClass}_${inputElement.id}`);
//   inputElement.classList.add(`${inputInvalidClass}`);
//   errorElement.textContent = errorMessage;
//   errorElement.classList.add(`${errorActiveClass}`);
// };

// function hideInputError(formElement, inputElement, errorActiveClass, errorClass, inputInvalidClass) {
//   const errorElement = formElement.querySelector(`.${errorClass}_${inputElement.id}`);
//   inputElement.classList.remove(`${inputInvalidClass}`);
//   errorElement.classList.remove(`${errorActiveClass}`);
//   errorElement.textContent = '';
// };

// function hasInvalidInput(inputList) {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   })
// }

// function toggleButtonState(inputList, buttonElement, disabledButtonClass) {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(`${disabledButtonClass}`);
//     buttonElement.setAttribute("disabled", '');
//   } else {
//     buttonElement.classList.remove(`${disabledButtonClass}`);
//     buttonElement.removeAttribute("disabled");
//   }
// }

// export { enableValidation, toggleButtonState }
