// функциональность "показать полную картинку"
const popupFullsizeImage = document.querySelector('.popup-fullsize-image');
const popupFullsizeImageFigure = popupFullsizeImage.querySelector('.fullsize-image');
const popupFullsizeImagePicture = popupFullsizeImageFigure.querySelector('.fullsize-image__picture');
const popupFullsizeImageCaption = popupFullsizeImageFigure.querySelector('.fullsize-image__caption');

function hidePopup(event) {
  event.target.closest('.popup').classList.remove('popup_opened');
}

popupFullsizeImage.querySelector('.popup__close-button').addEventListener('click', hidePopup);

function showFullImagePopup(name, link) {
  popupFullsizeImagePicture.src = link;
  popupFullsizeImagePicture.alt = `Изображение места ${name}`;
  popupFullsizeImageCaption.textContent = name;

  popupFullsizeImage.classList.add('popup_opened');
}


//Генерация динамических карточек
const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardContainer = document.querySelector('.elements__card-container')
const cardTemplate = document.querySelector('#card-temlate').content;

function makeCardElement(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = `Изображение места ${name}`;
  cardElement.querySelector('.card__title').textContent = name;

  const cardFullImageButton = cardElement.querySelector('.card__full-image-button');
  cardFullImageButton.addEventListener('click', function () {
    showFullImagePopup(name, link);
  });

  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', function () {
    cardLikeButton.classList.toggle('card__like-button_active');
  });

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    const cardItem = deleteButton.closest('.card');
    cardItem.remove();
  });

  return cardElement;
}

const cardPreparedElements = initialCards.map( (cardContent) => makeCardElement(cardContent['name'], cardContent['link']));
cardContainer.append(...cardPreparedElements);

// функциональность "Изменить профиль"
const popupEditProfileElement = document.querySelector('.popup-edit-profile');
const formEditProfile = popupEditProfileElement.querySelector('.popup__form');
const formEditProfileNameInput = popupEditProfileElement.querySelector('.popup__input_field_title');
const formEditProfileDescriptionInput = popupEditProfileElement.querySelector('.popup__input_field_description');

const profileElement = document.querySelector('.profile');
const titleProfile = profileElement.querySelector('.profile__title');
const descriptionProfile = profileElement.querySelector('.profile__description');

function hidePopupEditProfile() {
  popupEditProfileElement.classList.remove('popup_opened');
}

formEditProfile.addEventListener('submit', function (event) {
  event.preventDefault();

  titleProfile.textContent = formEditProfileNameInput.value;
  descriptionProfile.textContent = formEditProfileDescriptionInput.value;

  hidePopupEditProfile();
});

profileElement.querySelector('.profile__edit-button').addEventListener('click', function () {
    formEditProfileNameInput.value = titleProfile.textContent;
    formEditProfileDescriptionInput.value = descriptionProfile.textContent;
    popupEditProfileElement.classList.add('popup_opened');
});

popupEditProfileElement.querySelector('.popup__close-button').addEventListener('click', hidePopupEditProfile);

// функциональность "Добавить картинку"
const popupAddCardElement = document.querySelector('.popup-add-card');
const formAddCard = popupAddCardElement.querySelector('.popup__form');
const formAddCardPictureNameInput = popupAddCardElement.querySelector('.popup__input_field_picture-name');
const formAddCardPictureLinkInput = popupAddCardElement.querySelector('.popup__input_field_picture-link');

function hidePopupAddCard() {
  popupAddCardElement.classList.remove('popup_opened');
}

profileElement.querySelector('.profile__add-button').addEventListener('click', function () {
  formAddCardPictureNameInput.value = '';
  formAddCardPictureLinkInput.value = '';
  popupAddCardElement.classList.add('popup_opened');
});

formAddCard.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const newCard = makeCardElement(formAddCardPictureNameInput.value, formAddCardPictureLinkInput.value);
  cardContainer.prepend(newCard);

  hidePopupAddCard();
});

popupAddCardElement.querySelector('.popup__close-button').addEventListener('click', hidePopupAddCard);
