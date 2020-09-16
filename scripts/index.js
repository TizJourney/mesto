import initialCards from './initial-cards.js';
import { Card } from './Card.js';
import { showPopup, hidePopup } from './popup.js';
import { FormValidator, defaultFormSelectors } from './FormValidator.js';
// общие переменные для всех попапов
const allPopups = document.querySelectorAll('.popup');

// переменные блока profile
const profileElement = document.querySelector('.profile');
const titleProfile = profileElement.querySelector('.profile__title');
const descriptionProfile = profileElement.querySelector('.profile__description');
const profileElementEditButton = profileElement.querySelector('.profile__edit-button');
const profileAddButton = profileElement.querySelector('.profile__add-button')

// переменные попапа popup-fullsize-image
const popupFullSizeImage = document.querySelector('.popup-fullsize-image');
const popupFullSizeImageFigure = popupFullSizeImage.querySelector('.fullsize-image');

const popupFullSizeImageData = {
  element: popupFullSizeImage,
  picture: popupFullSizeImageFigure.querySelector('.fullsize-image__picture'),
  caption: popupFullSizeImageFigure.querySelector('.fullsize-image__caption'),
}

// переменные попапа popup-edit-profile
const popupEditProfileElement = document.querySelector('.popup-edit-profile');
const formEditProfile = document.forms.popup_form_editing_profile;

// переменные попапа popup-add-card
const popupAddCardElement = document.querySelector('.popup-add-card');
const formAddCard = document.forms.popup_form_adding_cards;

// переменные для генерации динамических карточек
const cardContainer = document.querySelector('.elements__card-container')

// функциональность "Изменить профиль"
function initAndShowFormEditProfile() {
  formEditProfile.reset();
  const inputEvent = new CustomEvent('input');
  formEditProfile.title.value = titleProfile.textContent;
  formEditProfile.title.dispatchEvent(inputEvent);

  formEditProfile.description.value = descriptionProfile.textContent;
  formEditProfile.description.dispatchEvent(inputEvent);

  showPopup(popupEditProfileElement);
}

function submitFormEditProfile(event) {
  event.preventDefault();

  titleProfile.textContent = formEditProfile.title.value;
  descriptionProfile.textContent = formEditProfile.description.value;

  hidePopup(popupEditProfileElement);
}

profileElementEditButton.addEventListener('click', initAndShowFormEditProfile);
formEditProfile.addEventListener('submit', submitFormEditProfile);

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
  const newCard = new Card(newCardContent, popupFullSizeImageData);
  cardContainer.prepend(newCard.createElement());

  hidePopup(popupAddCardElement);
}

profileAddButton.addEventListener('click', initAndShowAddCardPopup);
formAddCard.addEventListener('submit', submitFormAddCard);

// генерация динамических карточек
function prepareInitialCards() {
  const cardPreparedElements = initialCards.map((cardContent) => {
    const card = new Card(cardContent, popupFullSizeImageData);
    return card.createElement();
  });
  cardContainer.append(...cardPreparedElements);
}

// инициализация страницы
prepareInitialCards();

//инициализация валидации для всех форм
const formList = Array.from(document.querySelectorAll(defaultFormSelectors.formSelector));

formList.forEach((formElement) => {
  const formValidatorItem = new FormValidator(defaultFormSelectors, formElement);
  formValidatorItem.enableValidation();
});
