import './index.css';

import {
  profileElementEditButton,
  profileAddButton,
  profileEditAvatar,
  defaultFormSelectors,
  apiToken,
  apiBaseUrl
} from '../util/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupError from '../components/PopupError.js';

// классы для работы с api
const apiObject = new Api(apiBaseUrl, apiToken);

// Функциональность для обработки ошибок
const popupErrorObject = new PopupError();

// функциональность "передача данных в блок профиля"
const userInfoObject = new UserInfo(
  '.profile__title',
  '.profile__description',
  '.profile__avatar-container',
  apiObject.getUserInfoPromise.bind(apiObject),
  apiObject.updateUserInfoPromise.bind(apiObject),
  apiObject.updateAvatarPromise.bind(apiObject)
);

// функциональность "попап с развёрнутым изображением"
const popupFullSizeImage = new PopupWithImage('.popup-fullsize-image');
popupFullSizeImage.setEventListeners();

// функциональность "изменить профиль"
const submitFormEditProfileCallback = ({ title, description }) => {
  popupEditProfile.setSaveState();
  userInfoObject.setUserInfoPromise(title, description)
    .then(() => {
      popupEditProfile.close();
      return Promise.resolve();
    })
    .catch((err) => { popupErrorObject.show(err); })
    .finally(() => {
      popupEditProfile.finishSaveState();
    });
};

const popupEditProfile = new PopupWithForm('.popup-edit-profile', submitFormEditProfileCallback);
popupEditProfile.setEventListeners();

const initAndShowFormEditProfile = () => {
  const [title, description] = userInfoObject.getUserInfo();
  popupEditProfile.setValues({ title, description });
  popupEditProfile.open();
}

profileElementEditButton.addEventListener('click', initAndShowFormEditProfile);

// функциональность "удалить карточку"
const handleDeleteButton = (cardElement) => {
  popupDeleteCard.open(cardElement);
}

const submitDeleteCardCallback = (card) => {
  apiObject.removeCardPromise(card.getId())
    .then(() => {
      card.deleteCard();
      return Promise.resolve();
    })
    .then(() => {
      popupDeleteCard.close();
      return Promise.resolve();
    })
    .catch((err) => { popupErrorObject.show(err); })
}

const popupDeleteCard = new PopupConfirm('.popup-delete-card', submitDeleteCardCallback);
popupDeleteCard.setEventListeners();

// функциональность "динимические карточки"
function handleLikeButton(isLiked, id) {
  const apiLikeFunction = isLiked ? apiObject.removeLikePromise : apiObject.setLikePromise;
  return apiLikeFunction.bind(apiObject)(id)
    .catch((err) => { popupErrorObject.show(err) });
}

function renderCard(cardItem) {
  const card = new Card(
    cardItem,
    userInfoObject.getUserId(),
    popupFullSizeImage.open.bind(popupFullSizeImage),
    handleDeleteButton,
    handleLikeButton
  );
  cardContainer.addItem(card.createElement());
}

const cardContainer = new Section(
  {
    renderer: renderCard,
  }, '.elements__card-container');

// функциональность "добавить картинку"
function submitFormAddCardCallback(newCardContent) {
  popupAddCard.setSaveState();
  apiObject.addCardPromise(newCardContent)
    .then(() => {
      return apiObject.getCardsPromise();
    })
    .then((cards) => {
      cardContainer.renderItems(cards);
      popupAddCard.close();
      return Promise.resolve();
    })
    .catch((err) => { popupErrorObject.show(err); })
    .finally(() => {
      popupAddCard.finishSaveState();
    });
}

const popupAddCard = new PopupWithForm('.popup-add-card', submitFormAddCardCallback);
popupAddCard.setEventListeners();

profileAddButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));

// функциональность "поменять аватар"
function submitFormEditAvatarCallback({ avatar }) {
  popupEditAvatar.setSaveState();
  userInfoObject.updateAvatarPromise(avatar)
    .then(() => {
      popupEditAvatar.close();
      return Promise.resolve();
    })
    .catch((err) => { popupErrorObject.show(err); })
    .finally(() => {
      popupEditAvatar.finishSaveState();
    });
}

const popupEditAvatar = new PopupWithForm('.popup-edit-avatar', submitFormEditAvatarCallback);
popupEditAvatar.setEventListeners();

profileEditAvatar.addEventListener('click', popupEditAvatar.open.bind(popupEditAvatar));

// инициализация данных из сети
Promise.all([
  userInfoObject.initUserInfoPromise(),
  apiObject.getCardsPromise(),
])
  .then((values) => {
    const [userData, initialCards] = values;
    cardContainer.renderItems(initialCards);
  })
  .then((cards) => {
    return Promise.resolve();
  })
  .catch((err) => { popupErrorObject.show(err); })

// инициализация валидации для всех форм
const formList = Array.from(document.querySelectorAll(defaultFormSelectors.formSelector));

formList.forEach((formElement) => {
  const formValidatorItem = new FormValidator(defaultFormSelectors, formElement);
  formValidatorItem.enableValidation();
});

// инициализация формы попапа "Добавить карточку" и "Редактировать аватар"
// при сбросе формы происходит пересчёт валидации и блокируется кнопка "submit"
popupAddCard.resetForm();
popupEditAvatar.resetForm();
