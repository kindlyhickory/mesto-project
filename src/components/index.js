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
import UserInfo from './UserInfo.js';

// import { enableValidation, toggleButtonState } from './validate.js';

import { setAvatar, setDOMUserData } from './profile.js';
import { renderLoading } from './utils';
import { FormValidator } from './validate';



export let userId


export const api = new Api(config);
export const popupWithImage = new PopupWithImage(".popup_image");

const userInfo = new UserInfo({nameSelector: '.profile__name', aboutSelector: '.profile__description'})


const editPopupForm = new PopupWithForm({
  selector: ".popup_edit",
  submitCalback: (user) => {
    renderLoading(true, editPopupForm._popup)
    userInfo.setUserInfo(user, api.changeUserData.bind(api))
      .then((user) => {
        editPopupForm.close();
        editPopupForm._form.elements.name.value = user.name;
        editPopupForm._form.elements.famed_by.value = user.about;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        renderLoading(false, editPopupForm._popup, "Сохранить");
      });
  },
});

editPopupForm.setEventListeners();

const avatarPopupForm = new PopupWithForm({
  selector: ".popup_avatar-change",
  submitCalback: ({avatar}) => {
    renderLoading(true, avatarPopupForm._popup)
    api.changeAvatar(avatar)
      .then(user => {
        setAvatar(profileAvatar, user.avatar, user.name);
        avatarPopupForm.close();
      })
      .catch(error => console.log(error))
      .finally(() => {
        renderLoading(false, avatarPopupForm._popup, "Сохранить");
      });
  },
});

avatarPopupForm.setEventListeners();

const addPopupForm = new PopupWithForm({
  selector: ".popup_add",
  submitCalback: ({title, picture}) => {
    renderLoading(true, addPopupForm._popup);
    api.sendNewCardToServer(title, picture)
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
      addPopupForm.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
      renderLoading( false, addPopupForm._popup, "Создать");
    });
  },
});

addPopupForm.setEventListeners();

// Set edit popup
export function setEditPopup() {
  return userInfo.getUserInfo(api.getUserData.bind(api))
    .then(user => {
      nameInput.setAttribute("value", user.name);
      jobInput.setAttribute("value", user.about);
      return Promise.resolve();
    })
    .catch(error => console.log(error));
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
// export function handleSubmitAdding(e) {
//   e.preventDefault();
//   api.sendNewCardToServer(placeInput.value, urlInput.value)
//     .then(card => {
//       const cardList = new Section(
//         {
//           items: [card],
//           renderer: (el) => {
//             const card = new Card(el, userId, cardTemplate).generate();
//             cardList.addItem(card);
//           },
//         },
//         ".cards"
//       );
//       cardList.renderItems();
//       // addCard(cardsContainer, new Card(card, userId, cardTemplate).generate());
//       closePopup(addPopup);
//       e.target.reset();
//     })
//     .catch(error => console.log(error))
//     .finally(() => {
//       renderLoading(e, false, addPopup, "Создать");
//     });

// }

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
  setEditPopup()
    .then(() => editPopupForm.open());
});

addButton.addEventListener('click', () => {
  addPopupForm.open();
  processedForms[avatarPopup.querySelector(formSelectors.formSelector).name].toggleButtonState();
});
// popupEditFormElement.addEventListener('submit', (e) => {
//   renderLoading(e, true, editPopup);
//   handleSubmit(e);
// });
// popupAddFormElement.addEventListener('submit', (e) => {
//   renderLoading(e, true, addPopup)
//   handleSubmitAdding(e)
// });
// popupAvatarFormELement.addEventListener('submit', (e) => {
//   renderLoading(e, true, avatarPopup);
//   handleSubmitAvatar(e);
// });
editAvatarButton.addEventListener('click', () => {
  avatarPopupForm.open()
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
