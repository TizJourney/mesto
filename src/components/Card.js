export default class Card {
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

    const imageElement = this._cardElement.querySelector('.card__image');
    const titleElement = this._cardElement.querySelector('.card__title');
    const cardLikeNumber = this._cardElement.querySelector('.card__like-number');

    imageElement.src = this._imageData.link;
    imageElement.alt = `Изображение места ${this._imageData.name}`;
    titleElement.textContent = this._imageData.name;
    cardLikeNumber.textContent = this._imageData.likes.length;

    this._addEventListeners();

    return this._cardElement;
  }
}
