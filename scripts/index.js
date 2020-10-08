import initialCards from './initial-cards.js';
import { Card } from './Card.js';
import { FormValidator, defaultFormSelectors } from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// переменные блока profile
const profileElement = document.querySelector('.profile');
const profileElementEditButton = profileElement.querySelector('.profile__edit-button');
const profileAddButton = profileElement.querySelector('.profile__add-button')

// функциональность "передача данных в блок профиля"
const userInfoObject = new UserInfo('.profile__title', '.profile__description');

// функциональность "попап с развёрнутым изображением"
const popupFullSizeImage = new PopupWithImage('.popup-fullsize-image');

// функциональность "Изменить профиль"
const submitFormEditProfileCallback = (event) => {
  event.preventDefault();
  const { title, description } = popupEditProfile._getInputValues();

  userInfoObject.setUserInfo(title, description);
  popupEditProfile.close();
};

const popupEditProfile = new PopupWithForm('.popup-edit-profile', submitFormEditProfileCallback);

const initAndShowFormEditProfile = () => {
  const [title, description] = userInfoObject.getUserInfo();
  popupEditProfile.setValues({ title, description });
  popupEditProfile.open();
}

profileElementEditButton.addEventListener('click', initAndShowFormEditProfile);

// функциональность "динимические карточки"
const cardContainer = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, popupFullSizeImage.open.bind(popupFullSizeImage));
      cardContainer.addItem(card.createElement());
    }
  }, '.elements__card-container');


// функциональность "добавить картинку"
const submitFormAddCardCallback = (event) => {
  event.preventDefault();
  const newCardContent = popupAddCard._getInputValues();
  const newCard = new Card(newCardContent, popupFullSizeImage.open.bind(popupFullSizeImage));
  cardContainer.addItem(newCard.createElement());

  popupAddCard.close();
}

const popupAddCard = new PopupWithForm('.popup-add-card', submitFormAddCardCallback);
profileAddButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));

// инициализация валидации для всех форм
const formList = Array.from(document.querySelectorAll(defaultFormSelectors.formSelector));

formList.forEach((formElement) => {
  const formValidatorItem = new FormValidator(defaultFormSelectors, formElement);
  formValidatorItem.enableValidation();
});

// генерация динамических карточек
cardContainer.renderItems();
