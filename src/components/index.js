import '../pages/index.css';
import { editAvatarButton, initialCards, avatarPopup, popupAvatarFormELement, avatarInputElement, avatarSaveButton, forms, processedForms, formSelectors } from './constants.js';
import {
  editPopup, editButton, popupEditFormElement, addButton, addPopup, popupAddFormElement
} from './modal.js';

import {
  nameInput, jobInput, profileName, profileDescription, profileAvatar, placeInput, urlInput, popups, disabledButtonClass, inputListAddPopup, submitButtonAddPopup, config
} from './constants.js';



import { addCard, cardsContainer, Card, cardTemplate } from './cards.js';

import Api from './api.js';
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from './PopupWithForm.js';

// import { enableValidation, toggleButtonState } from './validate.js';

import { setAvatar, setDOMUserData } from './profile.js';
import { renderLoading } from './utils';
import { FormValidator } from './validate';

export let userId


export const api = new Api(config);
export const popupWithImage = new PopupWithImage(".popup_image");
const editPopupForm = new PopupWithForm({
  selector: ".popup_edit",
  submitCalback: ({ name, famed_by}) => {
    api
      .changeUserData(name, famed_by)
      .then((profile) => {
        setDOMUserData(
          profile.name,
          profile.about,
          profile.avatar,
          profileName,
          profileDescription,
          profileAvatar
        );
        editPopupForm.close();
      })
      .catch((error) => console.log(error))
      .finally(() => {
        renderLoading(false, editPopupForm._popup, "Сохранить");
      });
  },
});
editPopupForm.setEventListeners();

// Set edit popup
export function setEditPopup() {
  nameInput.setAttribute("value", profileName.textContent);
  jobInput.setAttribute("value", profileDescription.textContent);
}

//Edit form -> changing profile
// export function handleSubmit(e) {
//   e.preventDefault();
//   api.changeUserData(nameInput.value, jobInput.value)
//     .then((profile) => {
//       setDOMUserData(profile.name, profile.about, profile.avatar, profileName, profileDescription, profileAvatar)
//       closePopup(editPopup);
//     })
//     .catch(error => console.log(error))
//     .finally(() => {
//       renderLoading(e, false, editPopup, "Сохранить")
//     });
// }


// handle add form submit
export function handleSubmitAdding(e) {
  e.preventDefault();
  api.sendNewCardToServer(placeInput.value, urlInput.value)
    .then(card => {
      const cardList = new Section(
        {
          items: [card],
          renderer: (el) => {
            const card = new Card(el, userId, cardTemplate).generate();
            cardList.addItem(card);
          },
        },
        ".cards"
      );
      cardList.renderItems();
      // addCard(cardsContainer, new Card(card, userId, cardTemplate).generate());
      closePopup(addPopup);
      e.target.reset();
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading(e, false, addPopup, "Создать");
    });

}

export function handleSubmitAvatar(e) {
  e.preventDefault();
  api.changeAvatar(avatarInputElement.value)
    .then(user => {
      setAvatar(profileAvatar, user.avatar, user.name);
      closePopup(avatarPopup);
      e.target.reset();
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading(e, false, avatarPopup, "Сохранить");
    });

}

function formingDoc() {
  Promise.all([api.getUserData(), api.getCards()])
    .then(([profile, cards]) => {
      userId = profile._id;
      setDOMUserData(profile.name, profile.about, profile.avatar, profileName, profileDescription, profileAvatar, profile._id)
      const cardList = new Section(
        {
          items: cards,
          renderer: (el) => {
            const card = new Card(el, userId, cardTemplate).generate();
            cardList.addItem(card);
          },
        },
        ".cards"
      );
      cardList.renderItems();

      // cards.forEach(card => {
      //   addCard(cardsContainer, new Card(card, userId, cardTemplate).generate());
      // })
    })
    .catch(error => console.log(error));
}

// Listeners
popups.forEach(popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }
    if (evt.target.classList.contains("popup__close-button")) {
      closePopup(popup);
    }
  });
});

editButton.addEventListener('click', () => {
  setEditPopup();
  editPopupForm.open();
});

addButton.addEventListener('click', () => {
  openPopup(addPopup);
  processedForms[avatarPopup.querySelector(formSelectors.formSelector).name].toggleButtonState();
});
// popupEditFormElement.addEventListener('submit', (e) => {
//   renderLoading(e, true, editPopup);
//   handleSubmit(e);
// });
popupAddFormElement.addEventListener('submit', (e) => {
  renderLoading(e, true, addPopup)
  handleSubmitAdding(e)
});
popupAvatarFormELement.addEventListener('submit', (e) => {
  renderLoading(e, true, avatarPopup);
  handleSubmitAvatar(e);
});
editAvatarButton.addEventListener('click', () => {
  openPopup(avatarPopup);
  processedForms[avatarPopup.querySelector(formSelectors.formSelector).name].toggleButtonState();
}
);





//Document loaded
document.addEventListener("DOMContentLoaded", () => formingDoc(initialCards));

forms.forEach(form => {
  const validatedForm = new FormValidator(formSelectors, form);
  validatedForm.enableValidation();
  processedForms[form.name] = validatedForm;
})

// enableValidation({
//   formSelector: '.popup__data',
//   inputSelector: '.popup__item',
//   submitButtonSelector: '.popup__save',
//   disabledButtonClass: 'popup__save_type_inactive',
//   inputInvalidClass: '.popup__item_type_active',
//   errorActiveClass: '.form__input-error_active',
//   errorClass: 'popup__input-error',
// });
