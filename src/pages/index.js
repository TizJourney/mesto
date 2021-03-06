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
  '.profile__avatar-container'
);

// функциональность "попап с развёрнутым изображением"
const popupFullSizeImage = new PopupWithImage('.popup-fullsize-image');
popupFullSizeImage.setEventListeners();

// функциональность "изменить профиль"
const submitFormEditProfileCallback = ({ title, description }) => {
  popupEditProfile.setSaveState();
  apiObject.updateUserInfo({ name: title, about: description })
    .then((info) => {
      userInfoObject.setInfo(info);
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
  const {name, about} = userInfoObject.getUserInfo();
  popupEditProfile.setValues({ title: name, description: about });
  popupEditProfile.open();
}

profileElementEditButton.addEventListener('click', initAndShowFormEditProfile);

// функциональность "поменять аватар"
function submitFormEditAvatarCallback({ avatar }) {
  popupEditAvatar.setSaveState();
  apiObject.updateAvatar({avatar})
    .then((info) => {
      userInfoObject.setInfo(info);
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

// функциональность "удалить карточку"
const handleDeleteButton = (cardElement) => {
  popupDeleteCard.open(cardElement);
}

const submitDeleteCardCallback = (card) => {
  apiObject.removeCard(card.getId())
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
  const apiLikeFunction = isLiked ? apiObject.removeLike : apiObject.setLike;
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
  cardContainer.addItem(card.getView());
}

const cardContainer = new Section(
  {
    renderer: renderCard,
  }, '.elements__card-container');

// функциональность "добавить картинку"
function submitFormAddCardCallback(newCardContent) {
  popupAddCard.setSaveState();
  apiObject.addCard(newCardContent)
    .then(() => {
      return apiObject.getCards();
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

// инициализация данных из сети
Promise.all([
  apiObject.getUserInfo(),
  apiObject.getCards(),
])
  .then((values) => {
    const [userData, initialCards] = values;
    userInfoObject.setInfo(userData);
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
