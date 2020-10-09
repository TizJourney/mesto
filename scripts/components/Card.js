import ImageContext from './ImageContext.js';

export class Card {
  constructor(imageData, handleCardClick, cardTemplateSelector = '#card-temlate') {
    this._imageData = imageData;
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._handleCardClick = handleCardClick;
  }

  _handleLikeButton() {
    this.classList.toggle('card__like-button_active');
  }

  _handleDeleteButton(event) {
    const cardItem = event.target.closest('.card');
    cardItem.remove();
  }

  _handleCardClickCallback(event) {
      this._handleCardClick(this._imageData);
  }

  _addEventListeners() {
    const cardFullImageButton = this._cardElement.querySelector('.card__full-image-button');
    const cardLikeButton = this._cardElement.querySelector('.card__like-button');
    const deleteButton = this._cardElement.querySelector('.card__delete-button');

    cardFullImageButton.addEventListener('click', this._handleCardClickCallback.bind(this));
    cardLikeButton.addEventListener('click', this._handleLikeButton.bind(cardLikeButton));
    deleteButton.addEventListener('click', this._handleDeleteButton);
  }

  createElement() {
    if (this._cardElement) {
      return this._cardElement;
    }

    this._cardElement = this._cardTemplate.cloneNode(true);

    this._imageContextObject = new ImageContext(this._cardElement, '.card__image', '.card__title');
    this._imageContextObject.set(this._imageData);

    this._addEventListeners();

    return this._cardElement;
  }
}
