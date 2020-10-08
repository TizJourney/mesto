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
const userInfoObject = new UserInfo('.profile__title', '.profile__description');

// переменные попапа popup-fullsize-image
const popupFullSizeImage = new PopupWithImage('.popup-fullsize-image');

// переменные попапа popup-edit-profile
const popupEditProfileElement = document.querySelector('.popup-edit-profile');
const formEditProfile = document.forms.popup_form_editing_profile;

const popupEditProfile = new PopupWithForm('.popup-edit-profile', () => {});

// переменные попапа popup-add-card
const popupAddCardElement = document.querySelector('.popup-add-card');
const formAddCard = document.forms.popup_form_adding_cards;

// функциональность "Изменить профиль"
function initAndShowFormEditProfile() {
  const [title, description] = userInfoObject.getUserInfo();
  popupEditProfile.setValues({title, description});
  popupEditProfile.open();
}

function submitFormEditProfile(event) {
  event.preventDefault();
  userInfoObject.setUserInfo(formEditProfile.title.value, formEditProfile.description.value);
  popupEditProfile.close();
}

profileElementEditButton.addEventListener('click', initAndShowFormEditProfile);
formEditProfile.addEventListener('submit', submitFormEditProfile);

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
