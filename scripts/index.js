import initialCards from './initial-сards.js';
import { Card } from './card.js';
import { Popup } from './popup.js';

// переменные блока profile
const profileElement = document.querySelector('.profile');
const titleProfile = profileElement.querySelector('.profile__title');
const descriptionProfile = profileElement.querySelector('.profile__description');
const profileElementEditButton = profileElement.querySelector('.profile__edit-button');
const profileAddButton = profileElement.querySelector('.profile__add-button')

// переменные попапа popup-fullsize-image
const popupFullSizeImageElement = document.querySelector('.popup-fullsize-image');
const popupFullSizeImage = new Popup(popupFullSizeImageElement);

const popupFullSizeImageFigure = popupFullSizeImageElement.querySelector('.fullsize-image');
const popupFullSizeImagePicture = popupFullSizeImageFigure.querySelector('.fullsize-image__picture');
const popupFullSizeImageCaption = popupFullSizeImageFigure.querySelector('.fullsize-image__caption');

// переменные попапа popup-edit-profile
const popupEditProfileElement = document.querySelector('.popup-edit-profile');
const popupEditProfile = new Popup(popupEditProfileElement);

const formEditProfile = document.forms.popup_form_editing_profile;

// переменные попапа popup-add-card
const popupAddCardElement = document.querySelector('.popup-add-card');
const popupAddCard = new Popup(popupAddCardElement);

const formAddCard = document.forms.popup_form_adding_cards;

// переменные для генерации динамических карточек
const cardContainer = document.querySelector('.elements__card-container')


// общая функциональность для всех попапов
function hidePopupCallback(event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    hidePopup(activePopup);
  }
}

function handleClosePopupOnClick(event) {
  if (
    event.target.classList.contains('popup__close-button') ||
    event.target.classList.contains('popup__overlay')
  ) {
    const popupElement = event.target.closest('.popup');
    hidePopup(popupElement);
  }
}

function showPopup(element) {
  element.classList.add('popup_opened');
  element.addEventListener('click', handleClosePopupOnClick);
  document.addEventListener('keydown', hidePopupCallback);
}

function hidePopup(element) {
  element.classList.remove('popup_opened');
  element.removeEventListener('click', handleClosePopupOnClick);
  document.removeEventListener('keydown', hidePopupCallback);
}

// функциональность "Изменить профиль"
function initAndShowFormEditProfile() {
  formEditProfile.reset();
  const inputEvent = new CustomEvent('input');
  formEditProfile.title.value = titleProfile.textContent;
  formEditProfile.title.dispatchEvent(inputEvent);

  formEditProfile.description.value = descriptionProfile.textContent;
  formEditProfile.description.dispatchEvent(inputEvent);

  popupEditProfile.show();
}

function submitFormEditProfile(event) {
  event.preventDefault();

  titleProfile.textContent = formEditProfile.title.value;
  descriptionProfile.textContent = formEditProfile.description.value;

  popupEditProfile.hide();
}

profileElementEditButton.addEventListener('click', initAndShowFormEditProfile);
formEditProfile.addEventListener('submit', submitFormEditProfile);

// функциональность "Добавить картинку"
function initAndShowAddCardPopup() {
  formAddCard.reset();
  popupAddCard.show();
}

function submitFormAddCard(event) {
  event.preventDefault();
  const newCardContent = {
    name: formAddCard.name.value,
    link: formAddCard.link.value,
  }
  const newCard = new Card(newCardContent);
  cardContainer.prepend(newCard.createElement());

  popupAddCard.hide();
}

profileAddButton.addEventListener('click', initAndShowAddCardPopup);
formAddCard.addEventListener('submit', submitFormAddCard);

// генерация динамических карточек
function prepareInitialCards() {
  const cardPreparedElements = initialCards.map((cardContent) => {
    const card = new Card(cardContent);
    return card.createElement();
  });
  cardContainer.append(...cardPreparedElements);
}

// инициализация страницы
prepareInitialCards();

