import './index.css';

import {
  initialCards,
  profileElementEditButton,
  profileAddButton,
  defaultFormSelectors,
} from '../util/constants.js';

import { Card } from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';

// функциональность "передача данных в блок профиля"
const userInfoObject = new UserInfo('.profile__title', '.profile__description');

// функциональность "попап с развёрнутым изображением"
const popupFullSizeImage = new PopupWithImage('.popup-fullsize-image');
popupFullSizeImage.setEventListeners();

// функциональность "изменить профиль"
const submitFormEditProfileCallback = ({ title, description }) => {
  userInfoObject.setUserInfo(title, description);
  popupEditProfile.close();
};

const popupEditProfile = new PopupWithForm('.popup-edit-profile', submitFormEditProfileCallback);
popupEditProfile.setEventListeners();

const initAndShowFormEditProfile = () => {
  const [title, description] = userInfoObject.getUserInfo();
  popupEditProfile.setValues({ title, description });
  popupEditProfile.open();
}

profileElementEditButton.addEventListener('click', initAndShowFormEditProfile);

// функциональность "динимические карточки"
function addNewCard(cardItem) {
  const card = new Card(cardItem, popupFullSizeImage.open.bind(popupFullSizeImage));
  cardContainer.addItem(card.createElement());
}

const cardContainer = new Section(
  {
    items: initialCards,
    renderer: addNewCard,
  }, '.elements__card-container');


// функциональность "добавить картинку"
const submitFormAddCardCallback = (newCardContent) => {
  addNewCard(newCardContent);
  popupAddCard.close();
}

const popupAddCard = new PopupWithForm('.popup-add-card', submitFormAddCardCallback);
popupAddCard.setEventListeners();

profileAddButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));


// инициализация валидации для всех форм
const formList = Array.from(document.querySelectorAll(defaultFormSelectors.formSelector));

formList.forEach((formElement) => {
  const formValidatorItem = new FormValidator(defaultFormSelectors, formElement);
  formValidatorItem.enableValidation();
});

// генерация динамических карточек
cardContainer.renderItems();

// инициализация формы попапа "Добавить карточку"
// при сбросе формы происходит пересчёт валидации и блокируется кнопка "sumbit"
popupAddCard.resetForm();
