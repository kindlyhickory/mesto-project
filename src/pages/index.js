import '../index.css';
import {
  editAvatarButton,
  processedForms,
  formSelectors,
  editButton,
  addButton,
  nameInput,
  jobInput,

  config,
  cardTemplate,
  profileNameSelector,
  profileDescriptionSelector,
  editPopupSelector,
  imagePopupSelector,
  avatarChangePopupSelector,
  addPopupSelector,
  profileAvatarSelector
} from "../utils/constants.js";

import { Card } from '../components/Card.js';
import Api from '../components/Api.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from "../components/FormValidator ";


export const api = new Api(config);
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  aboutSelector: profileDescriptionSelector,
  avatarSelector: profileAvatarSelector,
});


function createCard(element) {
  const cardElement = new Card(element, userInfo.getUserInfo().id, cardTemplate, api, popupWithImage).generate();
  return cardElement;
}

const cardList = new Section(
  {
    renderer: createCard
  },
  ".cards"
);

// popups creating
// imagePopup
export const popupWithImage = new PopupWithImage(imagePopupSelector);
popupWithImage.setEventListeners();

// editPopup
const editPopupForm = new PopupWithForm({
  selector: editPopupSelector,
  submitCalback: (user) => {
    editPopupForm.renderLoading(true);
    api.changeUserData(user.input_name,user.famed_by)
      .then((user) => {
        userInfo.setUserInfo(user);
        editPopupForm.close();
        // При использовании метода close происходит reset формы и соответственно возврат в значений инпутов формы в состояние при открытии,
        // Соответственно значение полей меняется в стандартное и при анимации исчезановении попапа видны начальные значения. Для того, чтобы
        // избежать этого, значения инпутов меняем в те, которые приходят после изменения.
        editPopupForm.form.elements.input_name.value = user.name;
        editPopupForm.form.elements.famed_by.value = user.about;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        editPopupForm.renderLoading(false, "Сохранить");
      });
  },
});

editPopupForm.setEventListeners();


// avatarPopup
const avatarPopupForm = new PopupWithForm({
  selector: avatarChangePopupSelector,
  submitCalback: ({ avatar }) => {
    avatarPopupForm.renderLoading(true);
    api.changeAvatar(avatar)
      .then(user => {
        userInfo.setAvatar(user);
        avatarPopupForm.close();
      })
      .catch(error => console.log(error))
      .finally(() => {
        avatarPopupForm.renderLoading(
          false,
          "Сохранить"
        );
      });
  },
});

avatarPopupForm.setEventListeners();


//addPopup
const addPopupForm = new PopupWithForm({
  selector: addPopupSelector,
  submitCalback: ({ title, picture }) => {
    addPopupForm.renderLoading(true);
    api.sendNewCardToServer(title, picture)
      .then(card => {

        cardList.addItem(card);
        addPopupForm.close();
      })
      .catch(error => console.log(error))
      .finally(() => {
        addPopupForm.renderLoading(false, "Создать");
      });
  },
});

addPopupForm.setEventListeners();

export function setEditPopup() {
  const user = userInfo.getUserInfo();
  nameInput.setAttribute("value", user.name);
  jobInput.setAttribute("value", user.about);
}

function formingDoc() {
  Promise.all([api.getUserData(), api.getCards()])
    .then(([profile, cards]) => {
      userInfo.setUserInfo(profile);
      userInfo.setId(profile);
      userInfo.setAvatar(profile);
      cardList.renderItems(cards);
    })
    .catch(error => console.log(error));
}

editButton.addEventListener('click', () => {
  setEditPopup();
  editPopupForm.open();
  processedForms[editPopupForm.form.name].resetValidation();
});

addButton.addEventListener('click', () => {
  addPopupForm.open();
  processedForms[addPopupForm.form.name].resetValidation();
});

editAvatarButton.addEventListener('click', () => {
  avatarPopupForm.open();
  processedForms[avatarPopupForm.form.name].resetValidation();
});

//Document loaded
document.addEventListener("DOMContentLoaded", () => formingDoc());



Array.from(document.forms).forEach((form) => {
  const validatedForm = new FormValidator(formSelectors, form);
  validatedForm.enableValidation();
  processedForms[form.name] = validatedForm;
});

