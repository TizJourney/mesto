let popupElement = document.querySelector('.popup');
let formElement = popupElement.querySelector('.popup__container');
let formCloseButtonElement = formElement.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__input_field_title');
let descriptionInput = formElement.querySelector('.popup__input_field_description');

let profileElement = document.querySelector('.profile');
let editProfileButtonElement = profileElement.querySelector('.profile__edit-button');

function showPopup() {
  let titleProfile = profileElement.querySelector('.profile__title');
  let descriptionProfile = profileElement.querySelector('.profile__description');

  nameInput.value = titleProfile.textContent;
  descriptionInput.value = descriptionProfile.textContent;
  popupElement.classList.add('popup_opened');
}

function hidePopup() {
  popupElement.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    let titleProfile = profileElement.querySelector('.profile__title');
    let descriptionProfile = profileElement.querySelector('.profile__description');

    titleProfile.textContent = nameInput.value;
    descriptionProfile.textContent = descriptionInput.value;

    hidePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

editProfileButtonElement.addEventListener('click', showPopup);
formCloseButtonElement.addEventListener('click', hidePopup);

