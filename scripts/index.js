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

const cardTemplate = document.querySelector('#card-temlate').content;

cardPreparedElements = initialCards.map(function (cardContent) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardContent['link'];
  cardImage.alt = `Изображение места ${cardContent['name']}`;
  cardElement.querySelector('.card__title').textContent = cardContent['name'];
  return cardElement;
});

const cardContainer = document.querySelector('.elements__card-container');
cardContainer.append(...cardPreparedElements);

// функциональность "Изменить профиль"
const popupEditProfileElement = document.querySelector('.popup-edit-profile');
const formEditProfile = popupEditProfileElement.querySelector('.popup__form');
const formEditProfileNameInput = popupEditProfileElement.querySelector('.popup__input_field_title');
const formEditProfileDescriptionInput = popupEditProfileElement.querySelector('.popup__input_field_description');

const profileElement = document.querySelector('.profile');

const editProfileButtonElement = profileElement.querySelector('.profile__edit-button');
const titleProfile = profileElement.querySelector('.profile__title');
const descriptionProfile = profileElement.querySelector('.profile__description');

function hidePopupEditProfile() {
  popupEditProfileElement.classList.remove('popup_opened');
}

formEditProfile.addEventListener('submit', function (evt) {
  evt.preventDefault();

  titleProfile.textContent = formEditProfileNameInput.value;
  descriptionProfile.textContent = formEditProfileDescriptionInput.value;

  hidePopupEditProfile();
});

editProfileButtonElement.addEventListener('click', function () {
    formEditProfileNameInput.value = titleProfile.textContent;
    formEditProfileDescriptionInput.value = descriptionProfile.textContent;
    popupEditProfileElement.classList.add('popup_opened');
});

popupEditProfileElement.querySelector('.popup__close-button').addEventListener('click', hidePopupEditProfile);

// функциональность "Добавить картинку"
const popupAddCardElement = document.querySelector('.popup-add-card');
const formAddCrad = popupEditProfileElement.querySelector('.popup__form');
const formAddCardPictureNameInput = popupAddCardElement.querySelector('.popup__input_field_picture-name');
const formAddCardPictureLinkInput = popupAddCardElement.querySelector('.ppopup__input_field_picture-link');

function hidePopupAddCard() {
  popupAddCardElement.classList.remove('popup_opened');
}

formAddCrad.addEventListener('submit', function (evt) {
  evt.preventDefault();
  hidePopupAddCard();
});

popupAddCardElement.querySelector('.popup__close-button').addEventListener('click', hidePopupEditProfile);
