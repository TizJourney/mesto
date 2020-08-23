const popupElement = document.querySelector('.popup');

const formElement = popupElement.querySelector('.popup__container');
const formCloseButtonElement = formElement.querySelector('.popup__close-button');
const nameInput = formElement.querySelector('.popup__input_field_title');
const descriptionInput = formElement.querySelector('.popup__input_field_description');

const profileElement = document.querySelector('.profile');

const editProfileButtonElement = profileElement.querySelector('.profile__edit-button');
const titleProfile = profileElement.querySelector('.profile__title');
const descriptionProfile = profileElement.querySelector('.profile__description');


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
function showPopup() {

  nameInput.value = titleProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  popupElement.classList.add('popup_opened');
}

function hidePopup() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    titleProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    hidePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

editProfileButtonElement.addEventListener('click', showPopup);
formCloseButtonElement.addEventListener('click', hidePopup);

