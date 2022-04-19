import '../pages/index.css';
import {
  editAvatarButton,
  processedForms,
  formSelectors,
  editButton,
  addButton,
  nameInput,
  jobInput,
  profileName,
  profileDescription,
  profileAvatar,
  config,
  cardTemplate,
} from "./constants.js";

import { Card } from './Card.js';
import Api from './Api.js';
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import FormValidator  from "./FormValidator ";
import { setAvatar, setDOMUserData } from './profile.js';
import { renderLoading } from './utils';


export let userId
export const api = new Api(config);
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__description",
});

export const popupWithImage = new PopupWithImage(".popup_image");
popupWithImage.setEventListeners();


const editPopupForm = new PopupWithForm({
  selector: ".popup_edit",
  submitCalback: (user) => {
    renderLoading(true, editPopupForm._popup)
    userInfo.setUserInfo(user, api.changeUserData.bind(api))
      .then((user) => {
        editPopupForm.close();
        editPopupForm.form.elements.input_name.value = user.name;
        editPopupForm.form.elements.famed_by.value = user.about;
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

export function setEditPopup() {
  return userInfo.getUserInfo(api.getUserData.bind(api))
    .then(user => {
      nameInput.setAttribute("value", user.name);
      jobInput.setAttribute("value", user.about);
      return Promise.resolve();
    })
    .catch(error => console.log(error));
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
    })
    .catch(error => console.log(error));
}

editButton.addEventListener('click', () => {
  setEditPopup()
    .then(() => {
      editPopupForm.open();
      processedForms[editPopupForm.form.name].checkForm();
    });
});

addButton.addEventListener('click', () => {
  addPopupForm.open();
  processedForms[addPopupForm.form.name].checkForm();
});

editAvatarButton.addEventListener('click', () => {
  avatarPopupForm.open();
  processedForms[avatarPopupForm.form.name].checkForm();
});

//Document loaded
document.addEventListener("DOMContentLoaded", () => formingDoc());



Array.from(document.forms).forEach((form) => {
  const validatedForm = new FormValidator(formSelectors, form);
  validatedForm.enableValidation();
  processedForms[form.name] = validatedForm;
});

