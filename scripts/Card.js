import imageContext from './imageContext.js';

export class Card {
  constructor(data, handleCardClick, cardTemplateSelector = '#card-temlate') {
    this._data = data;
    this._imageContextObject = new imageContext(data);

    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeButton(event) {
    event.target.classList.toggle('card__like-button_active');
  }

  _handleDeleteButton(event) {
    const cardItem = event.target.closest('.card');
    cardItem.remove();
  }

  _handleCardClickCallback(event) {
      this._handleCardClick(this._data);
  }

  _addEventListeners() {
    const cardFullImageButton = this._cardElement.querySelector('.card__full-image-button');
    const cardLikeButton = this._cardElement.querySelector('.card__like-button');
    const deleteButton = this._cardElement.querySelector('.card__delete-button');

    cardFullImageButton.addEventListener('click', this._handleCardClickCallback.bind(this));
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

    this._imageContextObject.setImageContext(cardImage, cardTitle);
    this._addEventListeners();

    return this._cardElement;
  }
}
