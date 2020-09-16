import { showPopup } from './popup.js';

export class Card {
  constructor(data, popupData, cardTemplateSelector = '#card-temlate') {
    this._imageLink = data.link;
    this._name = data.name;
    this._popupData = popupData;

    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
  }

  _fillImageContext(imageElement, titleElement) {
    imageElement.src = this._imageLink;
    imageElement.alt = `Изображение места ${this._imageLink}`;
    titleElement.textContent = this._name;
  }

  _showFullSizeImagePopup(popupData) {
    this._fillImageContext(popupData.picture, popupData.caption);
    showPopup(popupData.element);
  }

  _handleLikeButton(event) {
    event.target.classList.toggle('card__like-button_active');
  }

  _handleDeleteButton(event) {
    const cardItem = event.target.closest('.card');
    cardItem.remove();
  }

  _addEventListeners() {
    const cardFullImageButton = this._cardElement.querySelector('.card__full-image-button');
    const cardLikeButton = this._cardElement.querySelector('.card__like-button');
    const deleteButton = this._cardElement.querySelector('.card__delete-button');

    cardFullImageButton.addEventListener('click', () => { this._showFullSizeImagePopup(this._popupData) });
    cardLikeButton.addEventListener('click', this._handleLikeButton);
    deleteButton.addEventListener('click', this._handleDeleteButton);
  }

  createElement() {
    if (this._cardElement) {
      return this._cardElement;
    }

    this._cardElement = this._cardTemplate.cloneNode(true);

    const cardTitle = this._cardElement.querySelector('.card__title');
    const cardImage = this._cardElement.querySelector('.card__image');

    this._fillImageContext(cardImage, cardTitle);
    this._addEventListeners();

    return this._cardElement;
  }
}
