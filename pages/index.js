const popupElement = document.querySelector('.popup');
const formElement = popupElement.querySelector('.popup__container');
const formCloseButtonElement = formElement.querySelector('.popup__close-button');
const nameInput = formElement.querySelector('.popup__input_field_title');
const descriptionInput = formElement.querySelector('.popup__input_field_description');

const profileElement = document.querySelector('.profile');
const editProfileButtonElement = profileElement.querySelector('.profile__edit-button');

const titleProfile = profileElement.querySelector('.profile__title');
const descriptionProfile = profileElement.querySelector('.profile__description');

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

