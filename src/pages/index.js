import './index.css';

import {
  profileElementEditButton,
  profileAddButton,
  profileEditAvatar,
  defaultFormSelectors,
} from '../util/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

// классы для работы с api
const apiObject = new Api();

// функциональность "передача данных в блок профиля"
const userInfoObject = new UserInfo('.profile__title', '.profile__description');

// функциональность "попап с развёрнутым изображением"
const popupFullSizeImage = new PopupWithImage('.popup-fullsize-image');
popupFullSizeImage.setEventListeners();

// функциональность "изменить профиль"
const submitFormEditProfileCallback = ({ title, description }) => {
  userInfoObject.setUserInfoPromise(title, description)
    .catch((err) => { console.log(err); })
    .finally(() => { popupEditProfile.close(); });
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

const submitDeleteCardCallback = ({ id, element }) => {
  apiObject.removeCard(id)
    .then(() => {
      element.remove();
    })
    .catch((err) => { console.log(err); })
    .finally(() => { popupDeleteCard.close(); })
}

const popupDeleteCard = new PopupConfirm('.popup-delete-card', submitDeleteCardCallback);
popupDeleteCard.setEventListeners();

// функциональность "динимические карточки"
function renderCard(cardItem) {
  const card = new Card(cardItem, userInfoObject.getUserId(), popupFullSizeImage.open.bind(popupFullSizeImage), handleDeleteButton);
  cardContainer.addItem(card.createElement());
}

const cardContainer = new Section(
  {
    items: [],
    renderer: renderCard,
  }, '.elements__card-container');

// функциональность "добавить картинку"
function submitFormAddCardCallback(newCardContent) {
  apiObject.addCardPromise(newCardContent)
    .then((data) => {
      renderCard(data);
    })
    .catch((err) => { console.log(err); })
    .finally(() => { popupAddCard.close(); });
}

const popupAddCard = new PopupWithForm('.popup-add-card', submitFormAddCardCallback);
popupAddCard.setEventListeners();

profileAddButton.addEventListener('click', popupAddCard.open.bind(popupAddCard));

// функциональность "поменять аватар"
function submitFormEditAvatarCallback({link}) {
  console.log(link);
  // apiObject.addCardPromise(newCardContent)
  //   .then((data) => {
  //     renderCard(data);
  //   })
  //   .catch((err) => { console.log(err); })
  //   .finally(() => { popupAddCard.close(); });
  popupEditAvatar.close();
}

const popupEditAvatar = new PopupWithForm('.popup-edit-avatar', submitFormEditAvatarCallback);
popupEditAvatar.setEventListeners();

profileEditAvatar.addEventListener('click', popupEditAvatar.open.bind(popupEditAvatar));

// инициализация данных из сети
userInfoObject.initUserInfoPromise()
  .then(() => {
    return apiObject.getInitialCardsPromise();
  })
  .then((cards) => {
    cardContainer.setItems(cards);
    cardContainer.renderItems();
    return Promise.resolve();
  })
  .catch((err) => { console.log(err); })

// инициализация валидации для всех форм
const formList = Array.from(document.querySelectorAll(defaultFormSelectors.formSelector));

formList.forEach((formElement) => {
  const formValidatorItem = new FormValidator(defaultFormSelectors, formElement);
  formValidatorItem.enableValidation();
});

// инициализация формы попапа "Добавить карточку"
// при сбросе формы происходит пересчёт валидации и блокируется кнопка "submit"
popupAddCard.resetForm();
