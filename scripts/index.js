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
const popupFullSizeImagePicture = popupFullSizeImageFigure.querySelector('.fullsize-image__picture');
const popupFullSizeImageCaption = popupFullSizeImageFigure.querySelector('.fullsize-image__caption');

// переменные попапа popup-edit-profile
const popupEditProfileElement = document.querySelector('.popup-edit-profile');
const formEditProfile = document.forms.popup_form_editing_profile;

// переменные попапа popup-add-card
const popupAddCardElement = document.querySelector('.popup-add-card');
const formAddCard = document.forms.popup_form_adding_cards;

// переменные для генерации динамических карточек
const cardContainer = document.querySelector('.elements__card-container')
const cardTemplate = document.querySelector('#card-temlate').content;

// общая функциональность для всех попапов
function hidePopupCallback(event) {
  const activePopup = document.querySelector('.popup_opened');
  if (event.key === 'Escape') {
    hidePopup(activePopup);
  }
}

function showPopup(element) {
  element.classList.add('popup_opened');
  document.addEventListener('keydown', hidePopupCallback);
}

function hidePopup(element) {
  element.classList.remove('popup_opened');
  document.removeEventListener('keydown', hidePopupCallback);
}

allPopups.forEach(function (popupElement) {
  popupElement.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('popup__close-button') ||
      event.target.classList.contains('popup__overlay')
    ) {
      hidePopup(popupElement);
    }
  });
});

// функциональность "Изменить профиль"
function initAndShowFormEditProfile() {
  formEditProfile.title.value = titleProfile.textContent;
  formEditProfile.description.value = descriptionProfile.textContent;
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
  const newCard = makeCardElement(newCardContent);
  cardContainer.prepend(newCard);

  hidePopup(popupAddCardElement);
}

profileAddButton.addEventListener('click', initAndShowAddCardPopup);
formAddCard.addEventListener('submit', submitFormAddCard);

// генерация динамических карточек
function showFullSizeImagePopup(data) {
  popupFullSizeImagePicture.src = data.link;
  popupFullSizeImagePicture.alt = `Изображение места ${data.name}`;
  popupFullSizeImageCaption.textContent = data.name;

  showPopup(popupFullSizeImage);
}

function handleLikeButton(event) {
  event.target.classList.toggle('card__like-button_active');
}

function handleDeleteButton(event) {
  const cardItem = event.target.closest('.card');
  cardItem.remove();
}

function makeCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardFullImageButton = cardElement.querySelector('.card__full-image-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardTitle = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = `Изображение места ${data.name}`;
  cardTitle.textContent = data.name;

  cardFullImageButton.addEventListener('click', () => {showFullSizeImagePopup(data);});
  cardLikeButton.addEventListener('click', handleLikeButton);
  deleteButton.addEventListener('click', handleDeleteButton);

  return cardElement;
}

function prepareInitialCards() {
  const cardPreparedElements = initialCards.map((cardContent) => makeCardElement(cardContent));
  cardContainer.append(...cardPreparedElements);
}

// инициализация страницы
prepareInitialCards();

