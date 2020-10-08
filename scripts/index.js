import initialCards from './initial-cards.js';
import { Card } from './Card.js';
import { showPopup, hidePopup } from './popup.js';
import { FormValidator, defaultFormSelectors } from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';

// переменные блока profile
const profileElement = document.querySelector('.profile');
const profileElementEditButton = profileElement.querySelector('.profile__edit-button');
const profileAddButton = profileElement.querySelector('.profile__add-button')

// переменные попапа popup-add-card
const popupAddCardElement = document.querySelector('.popup-add-card');
const formAddCard = document.forms.popup_form_adding_cards;

// функциональность "передача данных в блок профиля"
const userInfoObject = new UserInfo('.profile__title', '.profile__description');

// функциональность "ппап с развёрнутым изображением"
const popupFullSizeImage = new PopupWithImage('.popup-fullsize-image');

// функциональность "Изменить профиль"
const submitFormEditProfileCallback = (event) => {
  event.preventDefault();
  const {title, description} = popupEditProfile._getInputValues();

  userInfoObject.setUserInfo(title, description);
  popupEditProfile.close();
};

const popupEditProfile = new PopupWithForm('.popup-edit-profile', submitFormEditProfileCallback);

const initAndShowFormEditProfile = () => {
  const [title, description] = userInfoObject.getUserInfo();
  popupEditProfile.setValues({title, description});
  popupEditProfile.open();
}

profileElementEditButton.addEventListener('click', initAndShowFormEditProfile);

// динимические карточки
const cardContainer = new Section(
  {
    items: initialCards,
    renderer: (cardItem) => {
      const card = new Card(cardItem, popupFullSizeImage.open.bind(popupFullSizeImage));
      cardContainer.addItem(card.createElement());
    }
  }, '.elements__card-container');


// функциональность "Добавить картинку"
function initAndShowAddCardPopup() {
  formAddCard.reset();
  showPopup(popupAddCardElement);
}

function submitFormAddCard(event) {
  event.preventDefault();
  const newCardContent = {
    name: formAddCard.name.value,
    link: formAddCard.link.value,
  }
  const newCard = new Card(newCardContent, popupFullSizeImage.open.bind(popupFullSizeImage));
  cardContainer.addItem(newCard.createElement());

  hidePopup(popupAddCardElement);
}

profileAddButton.addEventListener('click', initAndShowAddCardPopup);
formAddCard.addEventListener('submit', submitFormAddCard);

//инициализация валидации для всех форм
const formList = Array.from(document.querySelectorAll(defaultFormSelectors.formSelector));

formList.forEach((formElement) => {
  const formValidatorItem = new FormValidator(defaultFormSelectors, formElement);
  formValidatorItem.enableValidation();
});

// генерация динамических карточек
cardContainer.renderItems();
