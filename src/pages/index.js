import '../index.css';
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
import { setAvatar, setDOMUserData } from '../components/profile.js';


export const api = new Api(config);
const userInfo = new UserInfo({
  nameSelector: profileNameSelector,
  aboutSelector: profileDescriptionSelector,
  avatarSelector: profileAvatarSelector,
});
userInfo.getUserInfo(api.getUserData.bind(api));

function createCard(element) {
  const cardElement = new Card(element, userInfo.id, cardTemplate, api, popupWithImage).generate();
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
    userInfo.setUserInfo(user, api.changeUserData.bind(api))
      .then((user) => {
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
        setAvatar(profileAvatar, user.avatar, user.name);
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
  return userInfo.getUserInfo(api.getUserData.bind(api))
    .then(user => {
      nameInput.setAttribute("value", user.name);
      jobInput.setAttribute("value", user.about);
      return Promise.resolve();
    })
}

function formingDoc() {
  Promise.all([userInfo.getUserInfo(api.getUserData.bind(api)), api.getCards()])
    .then(([profile, cards]) => {
      setDOMUserData(profile.name, profile.about, profile.avatar, profileName, profileDescription, profileAvatar, profile._id)
      cards.forEach(card => cardList.addItem(card))
    })
    .catch(error => console.log(error));
}

editButton.addEventListener('click', () => {
  setEditPopup()
    .then(() => {
      editPopupForm.open();
      processedForms[editPopupForm.form.name].resetValidation();
    })
    .catch((error) => console.log(error));
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

